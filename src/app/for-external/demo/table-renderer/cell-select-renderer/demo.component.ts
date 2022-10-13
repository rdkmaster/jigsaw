import {Component, ElementRef, TemplateRef, ViewChild} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {TableData, ColumnDefine, TableCellSelectRenderer} from "jigsaw/public_api";
import {AjaxInterceptor} from "../../../../libs/app.interceptor";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-cell-select-renderer',
    templateUrl: './demo.component.html'
})
export class TableCellSelectRenderDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-renderer/cell-select-renderer";


    @ViewChild("jobCellRender") jobCellRender: TemplateRef<any>;

    tableData: TableData;

    constructor(private http: HttpClient, el: ElementRef) {
        super(http, el);
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list-short');
    }

    offices: any[];
    columnsWithDefaultGenerator: ColumnDefine[] = [
        {
            target: 'office', width: '180',
            cell: {
                editorRenderer: TableCellSelectRenderer,
                editorRendererInitData: (td, row, col) => {
                    if (!this.offices) {
                        this.offices = TableCellSelectRenderer.defaultInitDataGenerator(td, row, col);
                    }
                    return this.offices
                },
                editable: true
            }
        }
    ];

    columnsWithUserDefinedGenerator: ColumnDefine[] = [
        {
            target: 'office', width: '180',
            cell: {
                editorRenderer: TableCellSelectRenderer,
                editorRendererInitData: (td, row, col) => {
                    return [{label: 'item1'}, {label: 'item2'}, {label: 'item3'}];
                },
                editable: true
            }
        }
    ];

    columnsWithAsyncGenerator: ColumnDefine[] = [
        {
            target: 'office', width: '180',
            cell: {
                editorRenderer: TableCellSelectRenderer,
                editorRendererInitData: (td, row, col) => {
                    return this.http.get('/mock-data/async/select/data', {params: {office: td.header[col]}});
                },
                editable: true
            }
        }
    ];
}

/* 模拟请求代码 start */

AjaxInterceptor.registerProcessor('/mock-data/async/select/data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>): any {
    const p = req.params.get('office');
    return [{label: p + ' I'}, {label: p + ' II'}, {label: p + ' III'}];
}

/* 模拟请求代码 end */
