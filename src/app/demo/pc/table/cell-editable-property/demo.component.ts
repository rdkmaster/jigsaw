import {Component} from "@angular/core";
import {
    TableData, ColumnDefine, TableCellTextEditorRenderer, TableCellPasswordRenderer,
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
                    "123456",
                    "2011/04/25",
                    ""
                ],
                [
                    "Garrett Winflters1",
                    "dfrt567",
                    "2011/07/25",
                    ""
                ],
                [
                    "Tiger Nixon2",
                    "rtyre456",
                    "2011/04/25",
                    ""
                ],
                [
                    "Garrett Winslters1",
                    "bnhy6785",
                    "2011/07/25",
                    ""
                ],
                [
                    "Tiger Nixon2",
                    "gtyu543",
                    "2011/04/25",
                    ""
                ],
                [
                    "Garrett Winflters1",
                    "ghuyio78989",
                    "2011/07/25",
                    ""
                ],
                [
                    "Tiger Nixon2",
                    "deew345",
                    "2011/04/25",
                    ""
                ],
                [
                    "Garrett Winflters1",
                    "weq2345",
                    "2011/07/25",
                    ""
                ],
                [
                    "Tiger Nixon2",
                    "cdse456",
                    "2011/04/25",
                    ""
                ],
                [
                    "Garrett Wintsers2",
                    "jklo9876",
                    "2011/07/25",
                    ""
                ],
                [
                    "Tigser Nixon3",
                    "hjkiu78996",
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
                renderer: TableCellPasswordRenderer,
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

    changeMsg='';
    onCellChange(value) {
        this.changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.column]);
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '这个Demo主要演示了文本框编辑器的属性初始值如何配置，请点击任何列进入编辑态';
    description: string = '';
}
