import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-api";

@Component({
  templateUrl: 'setColumnVisible.html'
})
export class TableColumnSetVisibleDemoComponent {
    tableData: TableData;

    click(){
        this._columns = [
            {target: 'name',
            visible: true}]
    }

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

     _columns: ColumnDefine[] = [
        {
            target: 'name',
            visible: false
        }];

}

