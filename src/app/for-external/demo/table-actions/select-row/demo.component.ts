import {Component, ElementRef, ViewChild} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, JigsawTable } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-actions-select-row',
    templateUrl: './demo.component.html'
})
export class TableSelectRowDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-actions/select-row";

    @ViewChild('Table1')
    private _table: JigsawTable;

    public tableData: TableData;
    public selectedRow: number = 5;

    public getCurrentRow() {
        console.log(`row number ${this._table.selectedRow} was selected`);
    }

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
