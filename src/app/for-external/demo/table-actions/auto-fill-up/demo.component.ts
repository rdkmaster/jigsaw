import {Component, ElementRef} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {
    ColumnDefine,
    TableCellAutoCompleteEditorRenderer,
    TableCellNumericEditorRenderer,
    TableCellTextEditorRenderer,
    TableData
} from "jigsaw/public_api";
import {AsyncDescription} from "../../../demo-template/demo-template";

@Component({
    selector: 'table-auto-fill-up',
    templateUrl: "./demo.component.html",
    styleUrls: ["./demo.component.css"]
})
export class TableAutoFillUpDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-actions/auto-fill-up";

    public checked: boolean = true;

    public tableData: TableData;

    public columnsCommonRender: ColumnDefine[] = [
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

    constructor(http: HttpClient, el: ElementRef) {
        super(http, el);
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
