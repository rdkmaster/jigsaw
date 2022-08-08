import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, AdditionalColumnDefine, TableValueGenerators} from "jigsaw/public_api";
import {TableTextService} from "../text.service";

@Component({
    selector: 'index-column-table',
    templateUrl: './demo.component.html'
})
export class TableAddIDColumnDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient, public text: TableTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            text: '#'
        },
        cell: {
            data: TableValueGenerators.rowIndexGenerator
        }
    }];
}
