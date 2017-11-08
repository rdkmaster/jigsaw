import {Component, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {AdditionalColumnDefine} from "jigsaw/component/table/table-typings";
import {TableCellCheckboxRenderer, TableHeadCheckboxRenderer} from "jigsaw/component/table/table-renderer";
import {JigsawTable} from "jigsaw/component/table/table";


@Component({
    templateUrl: './app.component.html'
})
export class TableAddCheckboxColumnDemoComponent {
    tableData: TableData;

    changeMsg: string;

    selectedRows: string;

    @ViewChild('myTable') myTable: JigsawTable;

    constructor(http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    additionalColumns: AdditionalColumnDefine[] = [{
        pos: 0,
        header: {
            renderer: TableHeadCheckboxRenderer,
        },
        cell: {
            renderer: TableCellCheckboxRenderer
        }
    }];

    onCellChange(value) {
        this.changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.column]);
        }

        this.selectedRows = "";
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}



