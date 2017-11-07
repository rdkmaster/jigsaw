import {
    AfterContentInit, Component, TemplateRef, ViewChild,
    Renderer2, ViewContainerRef
} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";


@Component({
    templateUrl: './app.component.html'
})
export class TableSetHeaderRenderDemoComponent implements AfterContentInit {

    @ViewChild("headerRender") headerRender: TemplateRef<any>;

    tableData: TableData;

    constructor(public viewContainerRef: ViewContainerRef,
                public renderer: Renderer2, http: HttpClient) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
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



