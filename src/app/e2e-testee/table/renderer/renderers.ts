import {Component, OnDestroy, OnInit} from "@angular/core";
import {TableCellRendererBase} from "jigsaw/component/table/table-renderer";
import {LocalPageableTableData, TableData} from "../../../../jigsaw/core/data/table-data";

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

export class OfficeRendererBase extends TableCellRendererBase {
    officeList = [
        {label: 'Online Prod I'}, {label: 'Online Prod II'},
        {label: 'Offline Prod I'}, {label: 'Offline Prod II'},
        {label: 'Platform I'}, {label: 'Platform II'}, {label: 'Platform III'}
    ];
}

@Component({
    template: `
        <jigsaw-select [value]="selected" (valueChange)="dispatchChangeEvent($event.label)"
                       [data]="officeList" width="100%" height="25">
        </jigsaw-select>
    `
})
export class OfficeEditor extends OfficeRendererBase {
    selected: any;

    onDataRefresh() {
        this.selected = {label: this.cellData};
    }
}

@Component({
    template: `
        <j-combo-select [placeholder]="cellData" width="100%" height="30" (openChange)="onChange($event)">
            <ng-template>
                <div style="width: 120px; background-color: #fff;">
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
export class OfficeHeader extends OfficeRendererBase {
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
        <span class="fa fa-edit"></span> {{cellData}}
    `
})
export class OfficeRenderer extends TableCellRendererBase {
}

@Component({
    template: `
        <jigsaw-select placeholder="{{cellData}}" (valueChange)="onChange($event)"
                       [data]="listItems" width="80%" height="25">
        </jigsaw-select>
    `
})
export class PositionHeaderSelect extends TableCellRendererBase {
    listItems = [{label: 'All Positions'}, {label: 'Developer'}, {label: 'System Architect'}, {label: 'Test Engineer'}];

    onChange(selected) {
        const positionFilter = selected.label == 'All Positions' ? '' : selected.label;
        filterData(this.tableData, {position: positionFilter});
    }
}

/*
 * 操作列
 * */
@Component({
    template: '<a (click)="payRaise()">加薪</a> <a (click)="fire()">辞退</a>',
    styles: [`a{color: #ffaa00} a:hover{text-decoration: underline}`]
})
export class TableCellOperation extends TableCellRendererBase {
    constructor() {
        super();
    }

    payRaise() {
        this.tableData.data[this.row][3] = Number(this.tableData.data[this.row][3]) + 2000;
        // 这一步非常重要，我们直接修改了tableData的值，Jigsaw无法知道发生了啥变化，需要通过调用`refresh()`来通知Jigsaw
        this.tableData.refresh();
    }

    fire() {
        const lptd = <LocalPageableTableData>this.tableData;
        lptd.originalData.splice(this.row, 1);
        lptd.data.splice(this.row, 1);
        // 记住，但凡手工对Jigsaw的各种data做修改，都需要调用refresh()方法
        // 但是这里 changePage() 会自动调用 refresh() 方法，因此这里不需要再调用了
        lptd.changePage(lptd.pagingInfo.currentPage);
    }
}
