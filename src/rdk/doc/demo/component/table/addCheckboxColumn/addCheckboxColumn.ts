import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {AdditionalColumnDefine} from "../../../../../component/table/table-api";
import {TableHeadCheckbox, TableCellCheckbox} from "../../../../../component/table/table-renderer";
import {Http} from "@angular/http";


@Component({
  templateUrl: 'addCheckboxColumn.html'
})
export class TableAddCheckboxColumnDemoComponent {
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    private _additionalColumns: AdditionalColumnDefine[] = [{
            pos : 0,
            header: {
                renderer: TableHeadCheckbox,
            },
            cell: {
                renderer: TableCellCheckbox
            }
        }]

    public onCellChange(value) {
        this._changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, rawColumn: ${value.rawColumn}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for(let row of rows){
            console.log(this.tableData.data[row][value.rawColumn]);
        }
    }

    private _changeMsg: string;
}



