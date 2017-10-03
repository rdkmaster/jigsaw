import {Component, Renderer2, ViewContainerRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";

@Component({
  templateUrl: './app.component.html'
})
export class TableColumnSetWidthDemoComponent {
    tableData: TableData;

    click(){
        this._columns=[{
            target: 'name',
            width: '40%',
        }];
    }

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

     _columns: ColumnDefine[] = [
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
            target : 6,
            width: '200px',
        }];
}

