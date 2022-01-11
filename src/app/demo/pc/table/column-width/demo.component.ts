import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    TableData, AdditionalColumnDefine, AdditionalTableData, TableCellCheckboxRenderer,
    TableHeadCheckboxRenderer, ColumnDefine
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableColumnWidthDemoComponent {
    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.dataReviser = (result => {
            result.header[0] = '很长的姓名很长的姓名很长的姓名很长的姓名很长的姓名。。。。。';
            return result;
        });
        this.tableData.fromAjax('mock-data/hr-list');

        this.tableData.onAjaxComplete(() => {
            setTimeout(() => {
                if(this.additionalData) console.log(this.additionalData.data);
            }, 1000)
        })
    }

    tableData: TableData;
    additionalData: AdditionalTableData;

    columnDefines: ColumnDefine[] = [
        {
            target: 0,
            width: 'byContent'
        },
        {
            target: 1,
            width: 100
        }
    ];

    additionalColumns: AdditionalColumnDefine[] = [{
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
    summary: string = '演示了设置表格列宽的效果，下表第一列固定50px，第二列按内容撑开，第三列固定100px，其他列由表格分配';
    description: string = '';
}
