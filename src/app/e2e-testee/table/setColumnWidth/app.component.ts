import {Component, Renderer2, ViewChild, ViewContainerRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";
import {JigsawTable} from "jigsaw/component/table/table";

@Component({
  templateUrl: './app.component.html'
})
export class TableColumnSetWidthDemoComponent {
    tableData: TableData;
    @ViewChild('table') table: JigsawTable;

    changeWidth(value) {
        this._columns[0].width = value;
        this.table.update();
    }

    changeEditable(value) {
        this._columns[1].cell.editable = value;
        this.table.update();
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
            width: '100',
        },{
            target: 'position', width: '130px',
             cell: { editable: false }
        },{
            target: ['salary','enroll-date'],
            width: '150px'
        },{
            target: [4,5,6],
            width: '200px',
        },{
            target : 1,
            width: '50px',
        }];
}

