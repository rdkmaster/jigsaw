import {Component} from "@angular/core";
import {PageableTableData, TableData} from "../../../../../core/data/table-data";
import {Http} from "@angular/http";
import {PageableArray} from "../../../../../core/data/array-collection";

@Component({
  templateUrl: 'demo.html'
})
export class TablePageableDemoComponent {
    tableData:PageableTableData;
    constructor(http:Http) {
        this.tableData = new PageableTableData(http, {
            url: 'http://localhost:4200/mock-data/array-collection/paging-data.json',
            params: {aa: 11, bb: 22}, method:'get'
        });
        this.tableData.onAjaxComplete(() => {
            console.log(this.tableData.data);
        });
        this.tableData.fromAjax();
    }
}

