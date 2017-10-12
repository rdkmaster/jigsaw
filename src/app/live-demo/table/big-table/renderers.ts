import {Component, OnDestroy, OnInit} from "@angular/core";
import {TableCellRendererBase} from "jigsaw/component/table/table-renderer";
import {LocalPageableTableData, TableData} from "../../../../jigsaw/core/data/table-data";

@Component({
    template: `
        <j-combo-select [placeholder]="cellData" width="100%" height="30">
            <ng-template>
                <div style="width: 182px; background-color: #fff;">
                    <div style="padding: 7px; border: 1px solid #ddd; border-radius: 2px">
                        <j-button width="30" preSize="small" (click)="selectAll()">全选</j-button>
                        <j-button width="30" preSize="small" (click)="selectReverse()">反选</j-button>
                    </div>
                    <j-list [(selectedItems)]="selectedOffices" [multipleSelect]="true" width="100%">
                        <j-list-option #listOption *ngFor="let office of officeList" [value]="office">
                            <j-checkbox [checked]="listOption.selected">{{office.label}}</j-checkbox>
                        </j-list-option>
                    </j-list>
                </div>
            </ng-template>
        </j-combo-select>
    `
})
export class OfficeHeaderRenderer extends TableCellRendererBase {
    officeList = [
        {label: 'Online Prod I'}, {label: 'Online Prod II'},
        {label: 'Offline Prod I'}, {label: 'Offline Prod II'},
        {label: 'Platform I'}, {label: 'Platform II'}, {label: 'Platform III'}
    ];
    selectedOffices = this.officeList.concat();

    selectAll() {
        this.selectedOffices = this.officeList.concat();
    }

    selectReverse() {
        //拷贝...
        const selected = this.selectedOffices.concat();
        this.selectedOffices = this.officeList.filter(office => selected.indexOf(office) == -1);
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
        <jigsaw-select placeholder="{{cellData}}" [data]="listItems" width="80%" height="25">
        </jigsaw-select>
    `
})
export class PositionHeaderRenderer extends TableCellRendererBase {
    listItems = [{label: 'All Positions'}, {label: 'Developer'}, {label: 'System Architect'}, {label: 'Test Engineer'}];
}
