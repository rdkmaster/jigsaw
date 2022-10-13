import {Component, ElementRef} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, AdditionalColumnDefine, TableValueGenerators } from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-basic-index-column',
    templateUrl: './demo.component.html'
})
export class TableBasicAddIDColumnDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-basic/index-column";

    public tableData: TableData;
    public additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            text: '#'
        },
        cell: {
            data: TableValueGenerators.rowIndexGenerator
        }
    }];

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
