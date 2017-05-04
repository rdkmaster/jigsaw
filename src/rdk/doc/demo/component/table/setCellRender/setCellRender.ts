import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {ColumnDefine, TableCellRenderer} from "../../../../../component/table/table-api";
import {Http} from "@angular/http";
/*
 * 自定义表头渲染组件
 * */
@Component({
    template: `
        <div [ngSwitch]="cellData" style="font-size: 16px;">
            <span *ngSwitchCase="'Accountant'" class="fa fa-money"></span>
            <span *ngSwitchCase="'System Architect'" class="fa fa-universal-access"></span>
            <span *ngSwitchCase="'Coder'" class="fa fa-file-code-o"></span>
        </div>
    `
})
export class JobRenderer extends TableCellRenderer {
}


@Component({
  templateUrl: 'setCellRender.html'
})
export class TableSetCellRenderDemoComponent {
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    private _columns: ColumnDefine[] = [
        {
            target: 'position',
            cell: {
                renderer:JobRenderer
            }
        }];
}



