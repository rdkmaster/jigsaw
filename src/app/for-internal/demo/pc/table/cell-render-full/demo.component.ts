import { Component } from "@angular/core";
import {
    ColumnDefine,
    DefaultCellRenderer,
    TableCellAutoCompleteEditorRenderer,
    TableCellNumericEditorRenderer,
    TableCellPasswordRenderer,
    TableCellSelectRenderer, TableCellSwitchRenderer,
    TableCellTextEditorRenderer,
    TableData, TableDataChangeEvent
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
                ["Garrett", "123456", "Tokyo", "", "System Architect", "8000", false],
                ["Tiger", "123456", "Edinburgh", "2011/04/25", "Developer", "5000", true],
                ["Garrett", "123456", "Tokyo", "2011/07/25", "System Architect", "8000", true],
                ["Garrett", "123456", "Edinburgh", "", "Developer", "5000", false],
                ["Garrett", "123456", "Tokyo", "2011/07/25", "System Architect", "8000", true],
            ],
            [
                "DefaultCellRenderer", "TableCellPasswordRenderer", "TableCellTextEditorRenderer", "TableCellSelectRenderer",
                "TableCellAutoCompleteEditorRenderer", "TableCellNumericEditorRenderer", "TableCellSwitchRenderer"
            ],
            [
                "DefaultCellRenderer", "TableCellPasswordRenderer", "TableCellTextEditorRenderer", "TableCellSelectRenderer",
                "TableCellAutoCompleteEditorRenderer", "TableCellNumericEditorRenderer", "TableCellSwitchRenderer"
            ]
        );
    }

    public updateColumnDefines() {
        // 提示：现在的版本无法很好支持alwaysShowEditor属性的动态化。
        localStorage.setItem('alwaysShowEditor', String(this.alwaysShowEditor));
        setTimeout(() => location.reload(), 300);
    }

    public onEdit(data: TableDataChangeEvent) {
        console.log('on table cell edit, data:', data);
    }

    dates: any[];
    columns: ColumnDefine[] = [
        {
            target: "DefaultCell",
            width: "10%",
            cell: {
                renderer: DefaultCellRenderer
            }
        },
        {
            target: "TableCellPasswordRenderer",
            width: "200",
            cell: {
                renderer: TableCellPasswordRenderer,
                editable: true,
                alwaysShowEditor: this.alwaysShowEditor,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    placeholder: "Type to edit...",
                    password: true,
                    disabled: (td, row) => row % 2,
                    valid: (td, row, col) => td.data[row][col] != ''
                }
            }
        },
        {
            target: "TableCellTextEditorRenderer",
            width: "180",
            cell: {
                editable: true,
                alwaysShowEditor: this.alwaysShowEditor,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    clearable: true,
                    disabled: (td, row) => row % 2,
                    valid: (td, row, col) => td.data[row][col] != ''
                }
            }
        },
        {
            target: "TableCellSelectRenderer",
            width: "170",
            cell: {
                editorRenderer: TableCellSelectRenderer,
                editorRendererInitData: {
                    initData:(td, row, col) => {
                        if (!this.dates) {
                            this.dates = TableCellSelectRenderer.defaultInitDataGenerator(td, row, col);
                        }
                        return this.dates;
                    },
                    disabled: (td, row) => row % 2,
                    valid: (td, row, col) => td.data[row][col] != ''
                },
                editable: true,
                alwaysShowEditor: this.alwaysShowEditor
            }
        },
        {
            target: "TableCellAutoCompleteEditorRenderer",
            width: "250",
            cell: {
                editable: true,
                alwaysShowEditor: this.alwaysShowEditor,
                editorRenderer: TableCellAutoCompleteEditorRenderer,
                editorRendererInitData: (td, row, col) => {
                    return {
                        data: ["Developer", "System Architect", "Test Engineer"],
                        placeholder: "Try to edit...",
                        disabled: row % 2,
                        valid: td.data[row][col] != '',
                        clearable: row % 3,
                    };
                }
            }
        },
        {
            target: "TableCellNumericEditorRenderer",
            width: "220",
            group: true,
            cell: {
                editable: true,
                alwaysShowEditor: this.alwaysShowEditor,
                editorRenderer: TableCellNumericEditorRenderer,
                editorRendererInitData: {
                    placeholder: "Type to edit...",
                    min: 0,
                    step: 1000,
                    disabled: (td, row) => row % 2,
                    valid: (td, row, col) => td.data[row][col] > 0
                }
            }
        },
        {
            target: 'TableCellSwitchRenderer',
            width: "170",
            cell: {
                editable: false,
                renderer: TableCellSwitchRenderer,
                rendererInitData: {
                    disabled: (td, row) => row % 2,
                    valid: (td, row, col) => td.data[row][col]
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
