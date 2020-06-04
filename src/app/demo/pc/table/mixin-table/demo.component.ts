import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine, TableCellRendererBase} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableMixinTableDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    offices: any[];
    columns: ColumnDefine[] = [
        {
            target: 'salary',
            width: '500',
            cell: {
                renderer: MixinTable
            }
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}

@Component({
    template: `
        <j-table [data]="tableData1"></j-table>
    `
})
export class MixinTable extends TableCellRendererBase{
    tableData1: TableData;

    constructor() {
        super();
        this.tableData1 = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "System Architect",
                    "$320,00",
                    "2011/04/25",
                    "Edinburgh",
                    "542"
                ],
                [
                    "Garrett Winflters1",
                    "Accountant",
                    "$170,7",
                    "2011/07/25",
                    "Tokyo",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Arcfhitect",
                    "$320,8000",
                    "2011/04/25",
                    "Edinburgh",
                    "5421"
                ],
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]);
    }
}
