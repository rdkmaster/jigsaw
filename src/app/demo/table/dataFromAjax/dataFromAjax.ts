import {Component} from "@angular/core";
import {TableData} from "../../../../rdk/core/data/table-data";
import {Http} from "@angular/http";


@Component({
  templateUrl: 'dataFromAjax.html'
})

export class TableDataFromAjaxDemoComponent {
    tableData: TableData;
    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }
}

