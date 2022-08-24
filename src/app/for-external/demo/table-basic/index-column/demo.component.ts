import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TableData, AdditionalColumnDefine, TableValueGenerators } from "jigsaw/public_api";
import { TableBasicTextService } from "../doc.service";

@Component({
    selector: 'table-basic-index-column',
    templateUrl: './demo.component.html'
})
export class TableBasicAddIDColumnDemoComponent {
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

    constructor(http: HttpClient, public doc: TableBasicTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }
}
