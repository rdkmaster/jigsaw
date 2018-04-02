import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";
import {JigsawTable} from "jigsaw/component/table/table";

@Component({
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

    constructor(http: HttpClient) {
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
    tags: string[] = [
        'TableCell.editable',
        'ColumnDefine.width',
        'JigsawTable.columnDefines',
        'JigsawTable.update'
    ];
}

