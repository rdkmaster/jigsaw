import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {AdditionalColumnDefine} from "../../../../../component/table/table-api";
import {TableHeadNum, TableCellNum} from "../../../../../component/table/table-renderer";
import {Http} from "@angular/http";

@Component({
    templateUrl: 'scrollAmount.html'
})
export class TableScrollAmountDemoComponent {
    tableData: TableData;
    scrollAmount: number;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    additionalColumns: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: '60px',
            header: {
                renderer: TableHeadNum,
            },
            cell: {
                renderer: TableCellNum
            }
        }
    ];

    setScrollAmount(num){
        this.scrollAmount = num;
    }

}
