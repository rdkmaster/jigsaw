import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableDataFromAjaxDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
