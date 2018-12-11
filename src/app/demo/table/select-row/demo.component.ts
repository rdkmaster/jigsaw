import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {JigsawTable} from "../../../../jigsaw/component/table/table";

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
    private _table1:  JigsawTable;

    getSelectedRow() {
        console.log(this._table1.selectedRow);
    }

    getCurrentRow(rowIndex: number){
        console.log(`row number ${rowIndex + 1} was selected`);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'JigsawTable.selectedRow'
    ];
}

