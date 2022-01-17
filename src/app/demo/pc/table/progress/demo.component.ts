import { Component, ElementRef, Renderer2, ViewEncapsulation } from "@angular/core";
import { TableData, AdditionalColumnDefine, TableDragReplaceRow, ColumnDefine, TableCellProgressRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: "demo.component.html",
    styles: [`
        .demo-container p {
            margin-top: 8px
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class TableProgressDemoComponent {
    public tableData: TableData;

    public columns: ColumnDefine[]= [{
        target: "progress",
        cell: {
            renderer : TableCellProgressRenderer
        }
    }]

    public constructor(public renderer: Renderer2, public elementRef: ElementRef) {
        this.tableData = new TableData(
            [
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", { data: 23, animate: true, status: 'processing', labelPosition: 'left' }],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", { data: 42, animate: false, status: 'processing', labelPosition: 'none' }],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", { data: 36, animate: false, status: 'block', labelPosition: 'none' }],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", { data: 65, animate: false, status: 'block', labelPosition: 'left' }],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", { data: 71, animate: false, status: 'error', labelPosition: 'top' }],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", { data: 56, animate: false, status: 'error', labelPosition: 'top' }],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", { data: 17, animate: true, status: 'processing', labelPosition: 'top' }],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", { data: 38, animate: false, status: 'processing', labelPosition: 'right' }],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", { data: 9, animate: false, status: 'processing', labelPosition: 'none' }],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", { data: 100, animate: false, status: 'success', labelPosition: 'top' }],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", { data: 11, animate: true, status: 'processing', labelPosition: 'left' }],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", { data: 82, animate: true, status: 'processing', labelPosition: 'top' }]
            ],
            ["name", "position", "salary", "enroll-date", "office", "progress"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "工作进度"]
        );
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
