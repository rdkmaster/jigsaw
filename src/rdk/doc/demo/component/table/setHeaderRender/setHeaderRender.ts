import {AfterViewInit, Component, TemplateRef, ViewChild} from "@angular/core";
import {TableData} from "../../../../../core/data/table-data";
import {ColumnDefine, TableCellRenderer} from "../../../../../component/table/table-api";
import {Http} from "@angular/http";


@Component({
    templateUrl: 'setHeaderRender.html'
})
export class TableSetHeaderRenderDemoComponent implements AfterViewInit {

    @ViewChild("headerRender") headerRender: TemplateRef<any>;

    tableData: TableData;

    constructor(http: Http) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/table/data.json');
    }

    private _columns: ColumnDefine[];

    ngAfterViewInit() {
        this._columns = [
            {
                target: ['name', 'position'],
                header: {
                    renderer: this.headerRender //通过ViewChild获取的TemplateRef,必须在AfterViewInit中才能拿到
                }
            }
        ];
    }


}



