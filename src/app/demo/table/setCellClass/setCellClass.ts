import {Component, ViewEncapsulation} from "@angular/core";
import {Http} from "@angular/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-api";



@Component({
  templateUrl: 'setCellClass.html',
    styleUrls: ['style.scss'],
    //TO NOTE
    encapsulation: ViewEncapsulation.None
})
export class TableSetCellClassDemoComponent {
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }



     _columns: ColumnDefine[] = [
        {
            target: 'name',
            cell: {
                class:'red-text'
            }
        }];
}



