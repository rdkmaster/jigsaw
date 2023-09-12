import { Component } from "@angular/core";
import { ColumnDefine, TableCellAutoCompleteEditorRenderer, TableCellPasswordRenderer, TableCellSelectRenderer, TableCellSwitchRenderer, TableCellTextEditorRenderer, TableData } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./../../assets/demo.common.css']
})
export class TableOverflowDemoComponent {
    tableData: TableData;

    constructor() {
        this.tableData = new TableData(
            [
                [
                    "TigerNixonTigerNixonTigerNixonTigerNixonTigerNixonTiger",
                    "System Architect",
                    "$320,00",
                    "lightblue",
                    "text1",
                    "542"
                ],
                [
                    "GarrettWintersGarrettWintersGarrettWintersGarrettWintersGarrettWintersGarrettWintersGarrettWinters",
                    "Accountant",
                    "$170,7",
                    "lightgreen",
                    "text2",
                    "8422"
                ],
                [
                    "Tiger Nixon2",
                    "System Architect",
                    "$320,8000",
                    "cyan",
                    "text3",
                    "5421"
                ]
            ],
            ["name", "position", "salary", "date", "office", "extn"],
            ["超长文本", "自动输入框", "html原生下拉框", "入职日期", "下拉", "开关"]);
    }

    hiddenOverflow: boolean = false;

    columnDefines: ColumnDefine[] = [
        {
            target: "name",
            cell: {
                noPadding: true,
                hiddenOverflow: this.hiddenOverflow
            }
        },
        {
            target: "office",
            cell: {
                editorRenderer: TableCellSelectRenderer,
                editorRendererInitData: {
                    initData: (td, row, col) => {
                        return ['text1', 'text2', 'text3', 'text4', 'text5', 'text6'];
                    }
                },
                editable: true,
                hiddenOverflow: this.hiddenOverflow
            }
        },
        {
            target: "position",
            cell: {
                editable: true,
                editorRenderer: TableCellAutoCompleteEditorRenderer,
                editorRendererInitData: (td, row, col) => {
                    return {
                        data: ["Developer", "System Architect", "Test Engineer"],
                        placeholder: "Try to edit...",
                        clearable: true,
                    };
                },
                hiddenOverflow: this.hiddenOverflow
            }
        },
        {
            target: 'extn',
            width: '180px',
            cell: {
                editable: false,
                renderer: TableCellSwitchRenderer,
                hiddenOverflow: this.hiddenOverflow
            }
        },
        {
            target: 'salary',
            cell: {
                renderer: 'html',
                data: (data, col) => `
                    <select style="padding: 4px 8px;
                                    margin-left: 4px;
                                    font-size: 12px;
                                    background: transparent;
                                    -webkit-appearance: none;
                                    border-radius: 4px;">
                        <option value="￥">￥</option>
                        <option value="$">$</option>
                    </select>`,
                innerHtmlContext: this,
                hiddenOverflow: this.hiddenOverflow
            }
        },
        {
            target: 'date',
            cell: {
                renderer: 'html',
                data: (data, row, col) => `
                <div style="position:relative;width:100%;height:32px">
                    <div style="position:absolute;width:120%;height:120%;background:${data.data[row][col]}">这里是绝对定位元素</div>
                </div>`,
                innerHtmlContext: this,
                noPadding: true,
                hiddenOverflow: this.hiddenOverflow
            }
        }
    ];

    checkedChange() {
        this.columnDefines.forEach(item => {
            item.cell.hiddenOverflow = this.hiddenOverflow;
        })
        setTimeout(() => {
            this.tableData.refresh();
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
