import { Component, ElementRef, Renderer2, ViewEncapsulation } from "@angular/core";
import {TableData, ColumnDefine, TableCellProgressRenderer, InternalUtils} from "jigsaw/public_api";

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
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 23],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 42],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 36],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 65],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 71],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 56],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 17],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 38],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 9],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 100],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 11],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 82]
            ],
            ["name", "position", "salary", "enroll-date", "office", "progress"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "工作进度"]
        );
        setInterval(() => {
            this.tableData.data.forEach(row => {
                const value = InternalUtils.randomNumber(10, 20);
                row[5] = (row[5] + value) % 100;
            });
            this.tableData.refresh();
        }, 1000);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "";
    description: string = "";
}
