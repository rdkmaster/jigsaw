import { Component } from "@angular/core";
import { TableData, ColumnDefine, TableCellTextEditorRenderer, TableCellAutoCompleteEditorRenderer, TableCellNumericEditorRenderer, ArrayCollection, TreeTableData, TreeTableCellRenderer, LocalPageableTableData } from "jigsaw/public_api";
import {TableActionsTextService} from "../doc.service";

@Component({
    selector: 'table-auto-fill-up',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TableAutoFillUpDemoComponent {
    checked: boolean = true;

    tableData: TableData;

    columnsCommonRender: ColumnDefine[] = [
        {
            target: "name",
            width: "40%",
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
            width: "40%",
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
            width: "20%",
            cell: {
                editable: true,
                editorRenderer: TableCellNumericEditorRenderer,
                editorRendererInitData: {
                    placeholder: "Type to edit...",
                    min: 0,
                    step: 1000
                }
            }
        }
    ]

    constructor(public text: TableActionsTextService) {
        this.tableData = new TableData(
            [
                ["Tiger Nixon1", "System Architect", "8000"],
                ["Garrett Winters1", "Accountant", "9000"],
                ["Tiger Nixon2", "System Architect", "8000"],
                ["Garrett Winters2", "Accountant", "9000"],
                ["Tiger Nixon3", "System Architect", "8000"],
                ["Garrett Winters3", "Accountant", "9000"]
            ],
            ["name", "position", "salary"],
            ["姓名", "职位", "薪资"]
        );
    }
}
