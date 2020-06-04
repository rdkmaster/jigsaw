import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, JigsawTable} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableSelectRowDemoComponent {
    tableData: TableData;
    selectedRow: number = 5;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    @ViewChild('Table1')
    private _table: JigsawTable;

    getCurrentRow() {
        console.log(`row number ${this._table.selectedRow} was selected`);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
