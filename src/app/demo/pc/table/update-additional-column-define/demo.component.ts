import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, AdditionalColumnDefine, TableCellCheckboxRenderer, JigsawTable, TableHeadCheckboxRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableUpdateAdditionalColumnDefineDemoComponent {
    tableData: TableData;
    inputValue: string = "单选框";

    @ViewChild('table') table: JigsawTable;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    updateAdditionalColumnDefine() {
        this.additionalColumns[0].header.text = this.inputValue;
        this.table.update();
    }

    updateHeaderCheckboxValue(selectAll: boolean) {
        this.additionalColumns[1].cell.data = (td, row, col) => {
            return selectAll;
        };
        this.tableData.refresh();
    }

    additionalColumns: AdditionalColumnDefine[] = [
        {
            pos: 0,
            header: {
                text: '单选框'
            },
            cell: {
                renderer: TableCellCheckboxRenderer
            }
        },
        {
            pos: 0,
            header: {
                renderer: TableHeadCheckboxRenderer,
            },
            cell: {
                renderer: TableCellCheckboxRenderer
            }
        }];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
