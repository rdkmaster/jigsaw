import { Component, ElementRef, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData } from "jigsaw/public_api";
import { AsyncDescription } from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-actions-column-resizable',
    templateUrl: './demo.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TableColumnResizableDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-actions/column-resizable";

    public tableData: TableData;

    constructor(http: HttpClient, public elementRef: ElementRef) {
        super(http, elementRef);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
