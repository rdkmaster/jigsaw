import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-api";
import {SortAs, SortOrder} from "jigsaw/core/data/component-data";



@Component({
  templateUrl: 'setHeaderSort.html'
})
export class TableSetHeaderSortDemoComponent {
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }



     _columns: ColumnDefine[] = [
        {
            target: 'salary',
            header: {
                sortable:true,
                sortAs: SortAs.number,
                defaultSortOrder: SortOrder.asc,
            }
        },{
            target: 'name',
            header: {
                sortable:true,
                sortAs: SortAs.string,
                defaultSortOrder: SortOrder.des,
            }
        }];
}



