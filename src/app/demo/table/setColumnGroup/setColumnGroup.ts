import {Component} from "@angular/core";
import {TableData} from "../../../../rdk/core/data/table-data";
import {ColumnDefine} from "../../../../rdk/component/table/table-api";
import {Http} from "@angular/http";

@Component({
  templateUrl: 'setColumnGroup.html'
})
export class TableColumnGroupDemoComponent {
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

     _columns: ColumnDefine[] = [
        {
            target: "position",
            group: true
        },{
            target: "start_date",
            group: true
        }];
}

