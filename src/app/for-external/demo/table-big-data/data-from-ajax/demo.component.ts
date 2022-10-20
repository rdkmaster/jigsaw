import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-data-from-ajax',
    templateUrl: './demo.component.html'
})
export class TableDataFromAjaxDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-big-data/data-from-ajax";

    public tableData: TableData;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
