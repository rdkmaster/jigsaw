import {Component} from "@angular/core";
import {TableCellRendererBase} from "jigsaw/component/table/table-renderer";

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
        {label: 'data-1'}, {label: 'data-2'},
        {label: 'data-3'}, {label: 'data-4'},
        {label: 'data-5'}, {label: 'data-6'},
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
