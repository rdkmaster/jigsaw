import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine, JigsawTable} from "jigsaw/public_api";
import {TableColumnDefinesTextService} from "../doc.service";

@Component({
    selector: 'table-updata-column-define',
    templateUrl: './demo.component.html'
})
export class TableColumnSetWidthDemoComponent {
    tableData: TableData;
    @ViewChild('table') table: JigsawTable;

    changeWidth(value) {
        this.columns[0].width = value;
        this.table.update();
    }

    changeEditable(value) {
        this.columns[1].cell.editable = value;
        this.table.update();
    }

    constructor(http: HttpClient, public doc: TableColumnDefinesTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[] = [
        {
            target: 'name',
            width: '100',
        }, {
            target: 'position', width: '130px',
            cell: {editable: false}
        }, {
            target: ['salary', 'enroll-date'],
            width: '150px'
        }, {
            target: [4, 5, 6],
            width: '200px',
        }, {
            target: 1,
            width: '50px',
        }
    ];
}
