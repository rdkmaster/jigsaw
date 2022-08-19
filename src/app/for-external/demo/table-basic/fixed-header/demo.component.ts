import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/public_api";
import {TableBasicTextService} from "../doc.service";

@Component({
    selector: 'table-basic-fixed-header',
    templateUrl: './demo.component.html'
})
export class TableBasicFixedHeadDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient, public doc: TableBasicTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
