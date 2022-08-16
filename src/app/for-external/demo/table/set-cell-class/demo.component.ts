import {Component, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine} from "jigsaw/public_api";
import {TableTextService} from "../text.service";

@Component({
    selector: 'set-cell-class-table',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    //TO NOTE
    encapsulation: ViewEncapsulation.None
})
export class TableSetCellClassDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient, public text: TableTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[] = [
        {
            target: 'name',
            cell: {
                clazz: 'red-text'
            }
        }
    ];
}
