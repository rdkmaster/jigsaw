import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableColumnSetVisibleDemoComponent {
    tableData: TableData;

    click() {
        this.columns[0].visible = !this.columns[0].visible;
        this.tableData.refresh();
    }

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[] = [
        {
            target: 'name',
            visible: false
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
