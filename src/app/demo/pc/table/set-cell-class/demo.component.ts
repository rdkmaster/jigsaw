import {Component, ViewEncapsulation} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/common/core/data/table-data";
import {ColumnDefine} from "jigsaw/pc-components/table/table-typings";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css'],
    //TO NOTE
    encapsulation: ViewEncapsulation.None
})
export class TableSetCellClassDemoComponent {
    tableData: TableData;

    constructor(http: HttpClient) {
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}



