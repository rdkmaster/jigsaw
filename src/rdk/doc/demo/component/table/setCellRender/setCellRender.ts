import {Component, TemplateRef, ViewChild} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {ColumnDefine, TableCellRenderer} from "../../../../../component/table/table-api";
import {Http} from "@angular/http";
/*
 * 自定义表头渲染组件
 * */


@Component({
  templateUrl: 'setCellRender.html'
})
export class TableSetCellRenderDemoComponent {

    @ViewChild("jobCellRender") jobCellRender :TemplateRef<any>;

    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    private _columns: ColumnDefine[] = [
        {
            target: 'position',
            cell: {
                renderer:this.jobCellRender
            }
        }];
}



