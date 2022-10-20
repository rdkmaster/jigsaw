import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, ColumnDefine } from "jigsaw/public_api"
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-column-group',
    templateUrl: './demo.component.html'
})
export class TableColumnGroupDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-column-defines/column-group";

    public tableData: TableData;

    public columns: ColumnDefine[] = [
        {
            target: "position",
            group: true
        }, {
            target: "enroll-date",
            group: true
        }
    ];

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
