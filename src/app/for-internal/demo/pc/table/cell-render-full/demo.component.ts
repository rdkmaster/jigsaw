import { Component } from "@angular/core";
import {
    AdditionalColumnDefine,
    ColumnDefine,
    DefaultCellRenderer,
    TableCellAutoCompleteEditorRenderer,
    TableCellNumericEditorRenderer,
    TableCellPasswordRenderer,
    TableCellSelectRenderer, TableCellSwitchRenderer,
    TableCellTextEditorRenderer,
    TableData, TableDataChangeEvent, TableDragReplaceRow
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
                ["Tiger1", "123456", "一Edinburgh", "2011/01/25", "Developer1", "1000", false],
                ["Garrett2", "123456", "二Tokyo", "2011/02/25", "System Architect2", "2000", true],
                ["Tiger3", "123456", "三Edinburgh", "2011/03/25", "Test Engineer3", "3000", false],
                ["Garrett4", "123456", "四Tokyo", "2011/04/25", "Developer4", "4000", true],
                ["Garrett5", "123456", "五Edinburgh", "", "System Architect5", "5000", false],
                ["Garrett6", "123456", "六Tokyo", "2011/06/25", "Test Engineer6", "6000", true],
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
            // group: true,
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

    public additionalColumnDefines: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: "80px",
            header: {
                text: "拖拽换行",
            },
            cell: {
                renderer: TableDragReplaceRow,
                alignment: "center"
            }
        }
    ];
    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
