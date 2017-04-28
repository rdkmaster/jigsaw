import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {ColumnDefine} from "../../../../../component/table/table-api";
import {TableCellDefault} from "../../../../../component/table/table-renderer";
import {Http} from "@angular/http";

@Component({
  templateUrl: 'dataChange.html'
})
export class TableDataChangeDemoComponent {
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    columns: ColumnDefine[] = [
        {
            target: 'name',
            width: '15%',
            cell: {
                renderer: TableCellDefault,
            }
        },
    ];

    dataChange(){
        this.tableData = new TableData(this.tableData.data.slice(0,3),this.tableData.field,this.tableData.header);
        console.log(this.tableData.data)
    }

    columnsChange(){
        this.columns = [
            {
                target: 'position',
                width: '50%',
                cell: {
                    renderer: TableCellDefault,
                }
            },
        ];

        //暂不支持修改数组
        /*this.columnDefines.push({
            target: 'position',
            width: '20%',
            cell: {
                renderer: TableCellDefault,
            }
        },)*/
    }
}

