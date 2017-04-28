import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {AdditionalColumnDefine} from "../../../../../component/table/table-api";
import {TableHeadNum, TableCellNum} from "../../../../../component/table/table-renderer";
import {Http} from "@angular/http";



@Component({
  templateUrl: 'addIDColumn.html'
})
export class TableAddIDColumnDemoComponent {
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }



    private _additionalColumns: AdditionalColumnDefine[] = [{
            pos : 0,
            header: {
                renderer: TableHeadNum,
            },
            cell: {
                renderer: TableCellNum
            }
        }]
}



