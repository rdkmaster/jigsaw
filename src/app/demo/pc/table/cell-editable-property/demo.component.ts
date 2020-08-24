import {Component} from "@angular/core";
import {
    TableData, ColumnDefine, TableCellTextEditorRenderer,
} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
})
export class TableCellEditablePropertyDemoComponent {
    tableData: TableData;

    constructor() {
        this.tableData = new TableData(
            [
                [
                    "Tiger Nixon1",
                    "......",
                    "2011/04/25",
                    ""
                ],
                [
                    "Garrett Winflters1",
                    "......",
                    "2011/07/25",
                    ""
                ],
                [
                    "Tiger Nixon2",
                    "......",
                    "2011/04/25",
                    ""
                ],
                [
                    "Garrett Winslters1",
                    ".......",
                    "2011/07/25",
                    ""
                ],
                [
                    "Tiger Nixon2",
                    "......",
                    "2011/04/25",
                    ""
                ],
                [
                    "Garrett Winflters1",
                    "........",
                    "2011/07/25",
                    ""
                ],
                [
                    "Tiger Nixon2",
                    "...",
                    "2011/04/25",
                    ""
                ],
                [
                    "Garrett Winflters1",
                    ".....",
                    "2011/07/25",
                    ""
                ],
                [
                    "Tiger Nixon2",
                    ".......",
                    "2011/04/25",
                    ""
                ],
                [
                    "Garrett Wintsers2",
                    "......",
                    "2011/07/25",
                    ""
                ],
                [
                    "Tigser Nixon3",
                    "",
                    "2011/04/25",
                    ""
                ]
            ],
            ["user", "password", "time", "desc"],
            ["用户", "密码", "入网时间", "备注"]);
    }

    columns: ColumnDefine[] = [
        {
            target: ["user", "desc", "time"],
            width: '10%',
            cell: {
                editable: true,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    placeholder: "Type to edit...",
                    clearable: true,
                    icon: "fa fa-edit",
                    preIcon: "fa fa-save"
                }
            }
        },
        {
            target: 'password',
            cell: {
                editable: true,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData:
                    {
                        placeholder: "Type to edit...",
                        password: true
                    }
            }
        }
    ];


    onCellChange(value) {
        if (value.field == "password") {
            console.log("new password: ",value.cellData);
            this.tableData.data[value.row[0]][value.column] = value.cellData.replace(/./g, '.');
            this.tableData.refresh();
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个Demo主要演示了文本框编辑器的属性初始值如何配置，请点击任何列进入编辑态';
    description: string = '';
}
