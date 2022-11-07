import { Component } from "@angular/core";
import {
    ColumnDefine,
    DefaultCellRenderer,
    TableCellAutoCompleteEditorRenderer,
    TableCellNumericEditorRenderer,
    TableCellPasswordRenderer,
    TableCellSelectRenderer, TableCellSwitchRenderer,
    TableCellTextEditorRenderer,
    TableData
} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html"
})
export class TableCellRenderFullComponent {
    tableData: TableData;
    alwaysShowEditor: boolean = localStorage.getItem('alwaysShowEditor') == 'true';

    constructor() {
        this.tableData = new TableData(
            [
                ["Tiger", "123456", "Edinburgh", "2011/04/25", "Developer", "5000", false],
                ["Garrett", "123456", "Tokyo", "2011/07/25", "System Architect", "8000", false],
                ["Tiger", "123456", "Edinburgh", "2011/04/25", "Developer", "5000", true],
                ["Garrett", "123456", "Tokyo", "2011/07/25", "System Architect", "8000", true],
                ["Garrett", "123456", "Edinburgh", "", "Developer", "5000", false]
            ],
            ["name", "password", "office", "enroll-date", "position", "salary", "senior"],
            ["DefaultCell", "Password", "TextEditor", "Select", "AutoCompleteEditor", "NumericEditor", "CheckboxEditor"]
        );
    }

    public updateColumnDefines() {
        // 提示：现在的版本无法很好支持alwaysShowEditor属性的动态化。
        localStorage.setItem('alwaysShowEditor', String(this.alwaysShowEditor));
        setTimeout(() => location.reload(), 300);
    }

    dates: any[];
    columns: ColumnDefine[] = [
        {
            target: "name",
            width: "10%",
            cell: {
                renderer: DefaultCellRenderer
            }
        },
        {
            target: "password",
            width: "10%",
            cell: {
                renderer: TableCellPasswordRenderer,
                editable: true,
                alwaysShowEditor: this.alwaysShowEditor,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    placeholder: "Type to edit...",
                    password: true,
                    disabled: (td, row, col) => row % 2,
                    valid: (td, row, col) => td.data[row][col] != ''
                }
            }
        },
        {
            target: "office",
            width: "10%",
            cell: {
                editable: true,
                alwaysShowEditor: this.alwaysShowEditor,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    clearable: true
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
                editable: true,
                alwaysShowEditor: this.alwaysShowEditor
            }
        },
        {
            target: "position",
            width: "10%",
            cell: {
                editable: true,
                alwaysShowEditor: this.alwaysShowEditor,
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
                alwaysShowEditor: this.alwaysShowEditor,
                editorRenderer: TableCellNumericEditorRenderer,
                editorRendererInitData: {
                    placeholder: "Type to edit...",
                    min: 0,
                    step: 1000
                }
            }
        },
        {
            target: 'senior',
            width: "10%",
            cell: {
                editable: false,
                // alwaysShowEditor: this.alwaysShowEditor,
                renderer: TableCellSwitchRenderer,
                rendererInitData: {
                    disabled: (td, row, col) => row % 2,
                    valid: (td, row, col) => td.data[row][0] == 'Tiger' && !td.data[row][col]
                }
            }
        }
    ];
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
