import { Component, ViewEncapsulation, TemplateRef } from "@angular/core";
import {
    TableData,
    ColumnDefine,
    TableCellNumericEditorRenderer,
    TableCellAutoCompleteEditorRenderer,
    TableCellTextEditorRenderer,
    PopupService,
    PopupInfo
} from "jigsaw/public_api";

@Component({
    templateUrl: "./demo.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TableAutoSaveDemoComponent {
    tableData: TableData;

    constructor(private popupService: PopupService) {
        this.tableData = new TableData(
            [
                ["Tiger Nixon1", "System Architect", 7000, "Edinburgh", "一些描述信息"],
                ["Garrett Winflters1", "Accountant", 8000, "Tokyo", "一些描述信息"]
            ],
            ["name", "position", "salary", "office", "extn"],
            ["姓名", "职位", "薪资", "部门", "其他"]
        );
    }

    columns: ColumnDefine[] = [
        {
            target: "salary",
            width: "20%",
            group: true,
            cell: {
                editable: true,
                editorRenderer: TableCellNumericEditorRenderer,
                editorRendererInitData: {
                    placeholder: "Type to edit...",
                    min: 0,
                    step: 100
                }
            }
        },
        {
            target: "position",
            width: "20%",
            group: true,
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
            target: ["name", "extn"],
            width: "20%",
            cell: {
                editable: true,
                editorRenderer: TableCellTextEditorRenderer,
                editorRendererInitData: {
                    clearable: true
                }
            }
        }
    ];

    changeMsg: string;

    onCellChange(value) {
        this.changeMsg = `field: '${value.field}', row: ${value.row}, column: ${value.column}, cellData: ${value.cellData}, oldCellData: ${value.oldCellData}`;
        let rows = value.row instanceof Array ? value.row : [value.row];
        for (let row of rows) {
            console.log(this.tableData.data[row][value.column]);
        }
    }

    editConfirm() {
        this.dialogInfo.dispose();
        console.log(this.tableData.data);
    }

    cancelClick() {
        this.dialogInfo.dispose();
        console.log(this.tableData.data);
    }

    dialogInfo: PopupInfo;

    popupDialog1(ele: TemplateRef<any>) {
        this.dialogInfo = this.popupService.popup(ele);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
