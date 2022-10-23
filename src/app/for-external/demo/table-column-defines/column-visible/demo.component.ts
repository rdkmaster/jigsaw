import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, ColumnDefine } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-column-defines-column-visible',
    templateUrl: './demo.component.html'
})
export class TableColumnSetVisibleDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-column-defines/column-visible";

    public tableData: TableData;

    public click() {
        this.columns[0].visible = !this.columns[0].visible;
        this.tableData.refresh();
    }

    public columns: ColumnDefine[] = [
        {
            target: 'name',
            visible: false
        }
    ];

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
