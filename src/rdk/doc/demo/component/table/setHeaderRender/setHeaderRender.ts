import {Component} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {ColumnDefine, TableCellRenderer} from "../../../../../component/table/table-api";
import {Http} from "@angular/http";
/*
 * 自定义表头渲染组件
 * */
@Component({
    template: '<span class="fa fa-map-signs"></span>{{cellData}}'
})
export class TableHeadRender extends TableCellRenderer {
}


@Component({
  templateUrl: 'setHeaderRender.html'
})
export class TableSetHeaderRenderDemoComponent {
    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }



    private _columns: ColumnDefine[] = [
        {
            target: 'name',
            header: {
                renderer:TableHeadRender
            }
        }];
}



