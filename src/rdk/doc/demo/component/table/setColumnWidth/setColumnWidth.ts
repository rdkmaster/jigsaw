import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {ColumnDefine} from "../../../../../component/table/table-api";
import {Http} from "@angular/http";

@Component({
  templateUrl: 'setColumnWidth.html'
})
export class TableColumnSetWidthDemoComponent {
    tableData: TableData;

    click(){
        this._columns=[{
            target: 'name',
            width: '40%',
        }];
    }

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    private _columns: ColumnDefine[] = [
        {
            target: 'name',
            width: '15%',
        },{
            target: 1,
            width: '100px',
        },{
            target: ['salary','start_date'],
            width: '150px',
        },{
            target: [4,5],
            width: '200px',
        },{
            target : (field, index) => {
                 return index > 5
            },
            width: '0px',
        }];
}

