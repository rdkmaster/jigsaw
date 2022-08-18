import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine} from "jigsaw/public_api"
import {TableColumnDefinesTextService} from "../doc.service";

@Component({
    selector: 'table-column-group',
    templateUrl: './demo.component.html'
})
export class TableColumnGroupDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient, public text: TableColumnDefinesTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[] = [
        {
            target: "position",
            group: true
        }, {
            target: "enroll-date",
            group: true
        }
    ];
}