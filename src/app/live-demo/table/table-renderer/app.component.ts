import {Component} from "@angular/core";
import {TableData} from "../../../../jigsaw/core/data/table-data";
import {Http} from "@angular/http";

@Component({
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class TableRendererLiveDemo{
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }
}
