import {AfterContentInit, AfterViewInit, Component, TemplateRef, ViewChild} from "@angular/core";
import {TableData} from "../../../../rdk/core/data/table-data";
import {ColumnDefine, TableCellRenderer} from "../../../../rdk/component/table/table-api";
import {Http} from "@angular/http";
/*
 * 自定义表头渲染组件
 * */


@Component({
    templateUrl: 'setCellRender.html'
})
export class TableSetCellRenderDemoComponent implements AfterContentInit {

    @ViewChild("jobCellRender") jobCellRender: TemplateRef<any>;

    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

     _columns: ColumnDefine[];

    ngAfterContentInit() {
        //请不要在ngAfterViewInit里面赋值，会报变更检查错误
        this._columns = [
            {
                target: 'position',
                cell: {
                    renderer: this.jobCellRender //通过ViewChild获取的TemplateRef,必须在AfterViewInit之后才能拿到
                }
            }
        ];
    }
}



