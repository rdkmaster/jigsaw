import {AfterContentInit, Component, TemplateRef, ViewChild} from "@angular/core";
import {Http} from "@angular/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-api";


@Component({
    templateUrl: 'setHeaderRender.html'
})
export class TableSetHeaderRenderDemoComponent implements AfterContentInit {

    @ViewChild("headerRender") headerRender: TemplateRef<any>;

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
                target: ['name', 'position'],
                header: {
                    renderer: this.headerRender //通过ViewChild获取的TemplateRef,必须在AfterViewInit之后才能拿到
                }
            }
        ];
    }

}



