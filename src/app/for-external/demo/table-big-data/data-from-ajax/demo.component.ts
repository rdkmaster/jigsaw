import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/public_api";
import {TableBigDataTextService} from "../doc.service";

@Component({
    selector: 'table-data-from-ajax',
    templateUrl: './demo.component.html'
})
export class TableDataFromAjaxDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient, public doc: TableBigDataTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
