import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {Http} from "@angular/http";


@Component({
  templateUrl: 'dataFromAjax.html'
})

export class TableDataFromAjaxDemoComponent {
    constructor(http: Http) {
        const tableData = new TableData();
        tableData.http = http;
        tableData.fromAjax('mock-data/table/data.json');
    }
}

