import {Component, TemplateRef, ViewChild} from "@angular/core";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {TableData} from "jigsaw/core/data/table-data";
import {ColumnDefine} from "jigsaw/component/table/table-typings";
import {TableCellSelectRenderer} from "jigsaw/component/table/table-renderer";
import {AjaxInterceptor} from "../../../app.interceptor";

@Component({
    templateUrl: './demo.component.html'
})
export class TableCellSelectRenderDemoComponent {

    @ViewChild("jobCellRender") jobCellRender: TemplateRef<any>;

    tableData: TableData;

    constructor(private http: HttpClient) {
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

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '本demo演示了表格内置select渲染器的各种用法';
    description: string = '';
}

/* 模拟请求代码 start */

AjaxInterceptor.registerProcessor('/mock-data/async/select/data', dealAreaRequest);

function dealAreaRequest(req: HttpRequest<any>): any {
    const p = req.params.get('office');
    return [{label: p + ' I'}, {label: p + ' II'}, {label: p + ' III'}];
}

/* 模拟请求代码 end */



