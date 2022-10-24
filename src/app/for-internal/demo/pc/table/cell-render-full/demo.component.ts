import { Component } from "@angular/core";
import {
    ColumnDefine,
    DefaultCellRenderer,
    TableCellAutoCompleteEditorRenderer,
    TableCellNumericEditorRenderer,
    TableCellPasswordRenderer,
    TableCellSelectRenderer,
    TableCellTextEditorRenderer,
    TableData
} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class TableCellRenderFullComponent {
    tableData: TableData;

    constructor() {
        this.tableData = new TableData(
            [
                ["Tiger", "123456", "Edinburgh", "", "", "5000"],
                ["Garrett", "123456", "Tokyo", "2011/07/25", "System Architect", "8000"],
                ["Tiger", "123456", "Edinburgh", "2011/04/25", "Developer", "5000"],
                ["Garrett", "123456", "Tokyo", "2011/07/25", "System Architect", "8000"]
            ],
            ["name", "password", "office", "enroll-date", "position", "salary"],
            ["DefaultCell", "Password", "TextEditor", "Select", "AutoCompleteEditor", "NumericEditor"]
        );
    }

    dates: any[];
    columns: ColumnDefine[] = [
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
                    if (!this.dates) {
                        this.dates = TableCellSelectRenderer.defaultInitDataGenerator(td, row, col);
                    }
                    return this.dates;
                },
                editable: true
            }
        }
    ];
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
