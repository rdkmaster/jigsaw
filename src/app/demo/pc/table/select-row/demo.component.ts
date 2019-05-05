import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {JigsawTable} from "../../../../../jigsaw/pc-components/table/table";

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

