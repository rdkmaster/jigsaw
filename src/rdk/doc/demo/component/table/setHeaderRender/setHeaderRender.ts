import {Component, TemplateRef, ViewChild} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {ColumnDefine, TableCellRenderer} from "../../../../../component/table/table-api";
import {Http} from "@angular/http";


@Component({
  templateUrl: 'setHeaderRender.html'
})
export class TableSetHeaderRenderDemoComponent {

    @ViewChild("headerRender") headerRender : TemplateRef<any>;

    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }



    private _columns: ColumnDefine[] = [
        {
            target: ['name','position'],
            header: {
                renderer:this.headerRender
            }
        }];
}



