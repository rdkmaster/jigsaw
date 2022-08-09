import {Component, TemplateRef, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TableData, ColumnDefine, TableCellSelectRenderer} from "jigsaw/public_api";
import {OfficeHeaderRenderer} from "./renderers";
import {TableTextService} from "../text.service";

@Component({
    selector: 'cell-render-table',
    templateUrl: './demo.component.html'
})
export class TableSetCellRenderDemoComponent {

    @ViewChild("jobCellRender") jobCellRender: TemplateRef<any>;

    tableData: TableData;

    constructor(http: HttpClient, public text: TableTextService
    ) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');
    }

    offices: any[];
    columns: ColumnDefine[] = [
        {
            target: 'position',
            cell: {
                // 通过ViewChild获取的TemplateRef,在AfterViewInit之后才能拿到,这边必须采用异步获取。
                renderer: () => this.jobCellRender
            }
        },
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
            },
            header: {
                renderer: OfficeHeaderRenderer
            }
        }
    ];
}
