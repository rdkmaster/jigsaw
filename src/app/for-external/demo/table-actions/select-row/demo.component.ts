import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, JigsawTable} from "jigsaw/public_api";
import {TableActionsTextService} from "../doc.service";

@Component({
    selector: 'table-select-row',
    templateUrl: './demo.component.html'
})
export class TableSelectRowDemoComponent {
    tableData: TableData;
    selectedRow: number = 5;

    constructor(http: HttpClient, public text: TableActionsTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    @ViewChild('Table1')
    private _table: JigsawTable;

    getCurrentRow() {
        console.log(`row number ${this._table.selectedRow} was selected`);
    }
}
