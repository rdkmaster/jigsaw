import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, AdditionalColumnDefine, TableValueGenerators} from "jigsaw/public_api";
import {TableBasicTextService} from "../doc.service";

@Component({
    selector: 'table-basic-index-column',
    templateUrl: './demo.component.html'
})
export class TableBasicAddIDColumnDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient, public text: TableBasicTextService) {
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
