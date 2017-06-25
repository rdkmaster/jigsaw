import {Component} from "@angular/core";
import {TableData} from "../../../../rdk/core/data/table-data";
import {AdditionalColumnDefine} from "../../../../rdk/component/table/table-api";
import {TableCellNum} from "../../../../rdk/component/table/table-renderer";
import {Http} from "@angular/http";

@Component({
    templateUrl: 'scrollAmount.html'
})
export class TableScrollAmountDemoComponent {
    tableData: TableData;

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
                text: '#'
            },
            cell: {
                renderer: TableCellNum
            }
        }
    ];

}
