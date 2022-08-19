import {Component, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine} from "jigsaw/public_api";
import {TableColumnDefinesTextService} from "../doc.service";

@Component({
    selector: 'table-header-class',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TableSetHeaderClassDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient, public doc: TableColumnDefinesTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[] = [
        {
            target: 'name',
            header: {
                clazz: 'red-text'
            }
        }
    ];
}
