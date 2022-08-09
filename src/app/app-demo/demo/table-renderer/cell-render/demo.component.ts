import {Component, TemplateRef, ViewChild} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    TableData,
    ColumnDefine,
    TableCellSelectRenderer,
    TableCellPasswordRenderer,
    TableCellTextEditorRenderer,
    DefaultCellRenderer, TableCellAutoCompleteEditorRenderer, TableCellNumericEditorRenderer
} from "jigsaw/public_api";
import {CellRendererOfficeHeaderRenderer} from "./renderers";
import {TableRendererTextService} from "../doc.service";

@Component({
    selector: 'table-cell-render',
    templateUrl: './demo.component.html'
})
export class TableSetCellRenderDemoComponent {

    @ViewChild("jobCellRender") jobCellRender: TemplateRef<any>;

    tableData: TableData;
    tableData2: TableData;

    constructor(http: HttpClient, public text: TableRendererTextService) {
        this.tableData = new TableData();
        this.tableData.http = http;
        this.tableData.fromAjax('mock-data/hr-list');

        this.tableData2 = new TableData(
            [
                ["Tiger", "123456", "Edinburgh", "2011/04/25", "Developer", "5000"],
                ["Garrett", "123456", "Tokyo", "2011/07/25", "System Architect", "8000"],
                ["Tiger", "123456", "Edinburgh", "2011/04/25", "Developer", "5000"],
                ["Garrett", "123456", "Tokyo", "2011/07/25", "System Architect", "8000"]
            ],
            ["name", "password", "office", "enroll-date", "position", "salary"],
            ["DefaultCell", "Password", "TextEditor", "Select", "AutoCompleteEditor", "NumericEditor"]
        );
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
                renderer: CellRendererOfficeHeaderRenderer
            }
        }
    ];

    dates2: any[];
    columns2: ColumnDefine[] = [
        {
            target: "password",
            width: "10%",
            cell: {
                renderer: TableCellPasswordRenderer,
                editable: true,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    placeholder: "Type to edit...",
                    password: true
                }
            }
        },
        {
            target: "name",
            width: "10%",
            cell: {
                renderer: DefaultCellRenderer
            }
        },
        {
            target: "office",
            width: "10%",
            cell: {
                editable: true,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    clearable: true
                }
            }
        },
        {
            target: "position",
            width: "10%",
            cell: {
                editable: true,
                editorRenderer: TableCellAutoCompleteEditorRenderer,
                editorRendererInitData: () => {
                    return {
                        placeholder: "Try to edit...",
                        data: ["Developer", "System Architect", "Test Engineer"]
                    };
                }
            }
        },
        {
            target: "salary",
            width: "10%",
            group: true,
            cell: {
                editable: true,
                editorRenderer: TableCellNumericEditorRenderer,
                editorRendererInitData: {
                    placeholder: "Type to edit...",
                    min: 0,
                    step: 1000
                }
            }
        },
        {
            target: "enroll-date",
            width: "10%",
            cell: {
                editorRenderer: TableCellSelectRenderer,
                editorRendererInitData: (td, row, col) => {
                    if (!this.dates2) {
                        this.dates2 = TableCellSelectRenderer.defaultInitDataGenerator(td, row, col);
                    }
                    return this.dates2;
                },
                editable: true
            }
        }
    ];
}
