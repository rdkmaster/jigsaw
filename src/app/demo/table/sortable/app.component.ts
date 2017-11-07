import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";
import {SortAs, SortOrder} from "jigsaw/core/data/component-data";



@Component({
  templateUrl: './app.component.html'
})
export class TableSetHeaderSortDemoComponent {
    tableData: TableData;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

     _columns: ColumnDefine[] = [
        {
            target: 'salary',
            header: {
                sortable:true,
                sortAs: SortAs.string,
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



