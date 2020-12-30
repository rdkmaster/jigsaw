import { Component, ElementRef, Renderer2, ViewEncapsulation } from "@angular/core";
import { TableData, AdditionalColumnDefine, TableDragReplaceRow } from "jigsaw/public_api";

@Component({
    templateUrl: "demo.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TableDraggableDemoComponent {
    public tableData: TableData;

    public additionalColumns: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: "5%",
            header: {
                text: "拖拽换行",
                clazz: "red-text"
            },
            cell: {
                renderer: TableDragReplaceRow
            }
        }
    ];

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    public summary = "拖拽表格Demo";
    public description = "1";
    public constructor(public renderer: Renderer2, public elementRef: ElementRef) {
        this.tableData = new TableData(
            [
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 316],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 711],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 796],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 316],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 711],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 796]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]
        );
    }
}
