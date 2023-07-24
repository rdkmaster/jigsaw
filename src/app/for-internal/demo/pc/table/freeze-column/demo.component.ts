import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { AdditionalColumnDefine, ColumnDefine, TableCellCheckboxRenderer, TableData, TableHeadCheckboxRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableFreezeColumnDemoComponent {
    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.dataReviser = (result => {
            result.header[0] = '很长的姓名很长的姓名很长的姓名很长的姓名很长的姓名。。。。。';
            return result;
        });
        this.tableData.fromAjax('mock-data/hr-list');
    }

    public tableData: TableData;

    public columnDefines: ColumnDefine[] = [
        {
            target: 0,
            width: 'byContent'
        },
        {
            target: 1,
            width: 100
        }
    ];

    public additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        width: 50,
        header: {
            renderer: TableHeadCheckboxRenderer,
        },
        cell: {
            renderer: TableCellCheckboxRenderer,
        }
    }];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
