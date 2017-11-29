import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {TableCellRendererBase} from "jigsaw/component/table/table-renderer";
import {TableData} from "jigsaw/core/data/table-data";
import {DropDownTrigger} from "../../../../jigsaw/component/combo-select/combo-select";
import {Subscriber} from "rxjs/Subscriber";

export class OfficeRendererBase extends TableCellRendererBase {
    officeList = [
        {label: 'Online Prod I'}, {label: 'Online Prod II'},
        {label: 'Offline Prod I'}, {label: 'Offline Prod II'},
        {label: 'Platform I'}, {label: 'Platform II'}, {label: 'Platform III'}
    ];
}

@Component({
    template: `
        <j-combo-select [placeholder]="cellData" width="100%" height="30"
                        [openTrigger]="openTrigger" [closeTrigger]="closeTrigger" (openChange)="onChange($event)">
            <ng-template>
                <div style="width: 182px; background-color: #fff;">
                    <div style="padding: 7px; border: 1px solid #ddd; border-radius: 2px">
                        <j-button width="30" preSize="small" (click)="selectAll()">全选</j-button>
                        <j-button width="30" preSize="small" (click)="selectReverse()">反选</j-button>
                    </div>
                    <j-list [(selectedItems)]="selectedOffices" [multipleSelect]="true"
                            (selectedItemsChange)="onChange($event)" width="100%">
                        <j-list-option #listOption *ngFor="let office of officeList" [value]="office">
                            <j-checkbox [checked]="listOption.selected">{{office.label}}</j-checkbox>
                        </j-list-option>
                    </j-list>
                </div>
            </ng-template>
        </j-combo-select>
    `
})
export class OfficeHeaderRenderer extends OfficeRendererBase {
    openTrigger = DropDownTrigger.click;
    closeTrigger = DropDownTrigger.click;

    selectedOffices = this.officeList.concat();

    selectAll() {
        this.selectedOffices = this.officeList.concat();
    }

    selectReverse() {
        //拷贝...
        const selected = this.selectedOffices.concat();
        this.selectedOffices = this.officeList.filter(office => selected.indexOf(office) == -1);
    }

    onChange(open) {
        if (open) {
            // 我们在选择部门的下拉列表关闭之后才开始查询，因此无视下拉打开的事件
            return;
        }
        filterData(this.tableData, {office: this.selectedOffices});
    }
}

@Component({
    template: `
        <jigsaw-select [value]="selected" (valueChange)="dispatchChangeEvent($event.label)"
                       [data]="officeList" width="100%" height="25">
        </jigsaw-select>
    `
})
export class OfficeCellEditorRenderer extends OfficeRendererBase implements OnInit, OnDestroy {
    selected: any;

    private _cellData: any;

    @Input()
    get cellData(): any {
        return this._cellData;
    }

    set cellData(value: any) {
        this._cellData = value;
        this.selected = {label: this.cellData};
    }

    subscriber: Subscriber<any>;

    ngOnInit() {
        super.ngOnInit();
        // ***使用此方法使其他单元格退出编辑状态***
        this.tableData.emit(this);
        this.subscriber = this.tableData.subscribe(renderer => {
            if (this != renderer) {
                this.dispatchChangeEvent(this.cellData);
            }
        })
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.subscriber) {
            this.subscriber.unsubscribe();
            this.subscriber = null;
        }
    }
}

@Component({
    template: `
        <span class="fa fa-edit"></span> {{cellData}}
    `
})
export class OfficeCellRenderer extends TableCellRendererBase {
}

@Component({
    template: `
        <jigsaw-select placeholder="{{cellData}}" (valueChange)="onChange($event)"
                       [data]="listItems" width="80%" height="25">
        </jigsaw-select>
    `
})
export class PositionHeaderRenderer extends TableCellRendererBase {
    listItems = [{label: 'All Positions'}, {label: 'Developer'}, {label: 'System Architect'}, {label: 'Test Engineer'}];

    onChange(selected) {
        const positionFilter = selected.label == 'All Positions' ? '' : selected.label;
        filterData(this.tableData, {position: positionFilter});
    }
}

/**
 * 这些过滤的代码写的非常不优雅，但是我们不用过于关注他们，因为实际开发中，这些逻辑往往都是在服务端进行的
 * 这些逻辑在这里仅仅是为了协助我们完成这个demo而已
 */
let filtersInfo = {position: '', office: [], allFields: ''};

export function filterData(tableData: TableData, filters: any) {
    if (filters.hasOwnProperty('position')) filtersInfo.position = filters.position;
    if (filters.hasOwnProperty('office')) filtersInfo.office = filters.office;
    if (filters.hasOwnProperty('allFields')) filtersInfo.allFields = filters.allFields;

    const positionFilter = filtersInfo.position;
    const officeFilter = filtersInfo.office;
    const allFieldFilter = filtersInfo.allFields;

    tableData.filter(positionFilter, ['position']);
    tableData.filter(row => {
        const officeString = row[5];
        const officeMatch = officeFilter.length > 0 ? officeFilter.find(office => office.label === officeString) : true;

        const positionString = row[2] + '';
        const positionMatch = positionString.indexOf(positionFilter) != -1;

        const allFieldMatch = row.join('_%%_').indexOf(allFieldFilter) != -1;

        return positionMatch && officeMatch && allFieldMatch;
    });
}
