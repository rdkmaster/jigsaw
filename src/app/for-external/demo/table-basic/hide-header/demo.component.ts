import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-basic-hide-header',
    templateUrl: './demo.component.html'
})
export class TableBasicHideHeadDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-basic/hide-header";

    public tableData: TableData;

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

}
