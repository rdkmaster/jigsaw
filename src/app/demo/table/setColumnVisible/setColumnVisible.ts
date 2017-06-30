import {Component} from "@angular/core";
import {TableData} from "../../../../rdk/core/data/table-data";
import {ColumnDefine} from "../../../../rdk/component/table/table-api";
import {Http} from "@angular/http";

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

