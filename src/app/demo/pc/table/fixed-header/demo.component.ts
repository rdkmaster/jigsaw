import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/public_api";
import {TableTextService} from "../text.service";

@Component({
    selector: 'fixed-header-table',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableFixedHeadDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient, public text: TableTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
