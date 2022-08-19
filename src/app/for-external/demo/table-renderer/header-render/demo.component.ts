import {Component, TemplateRef, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine} from "jigsaw/public_api";
import {TableRendererTextService} from "../doc.service";

@Component({
    selector: 'table-header-render',
    templateUrl: './demo.component.html'
})
export class TableSetHeaderRenderDemoComponent {

    @ViewChild("headerRender") headerRender: TemplateRef<any>;

    tableData: TableData;

    constructor(http: HttpClient, public doc: TableRendererTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    columns: ColumnDefine[] = [
        {
            target: ['name', 'position'],
            header: {
                // 通过ViewChild获取的TemplateRef,在AfterViewInit之后才能拿到,这边必须采用异步获取。
                renderer: () => this.headerRender
            }
        }
    ];
}
