import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine} from "jigsaw/public_api";
import {TableColumnDefinesTextService} from "../doc.service";

@Component({
    selector: 'table-culumn-visible',
    templateUrl: './demo.component.html'
})
export class TableColumnSetVisibleDemoComponent {
    tableData: TableData;

    click() {
        this.columns[0].visible = !this.columns[0].visible;
        this.tableData.refresh();
    }

    constructor(http: HttpClient, public text: TableColumnDefinesTextService) {
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
}
