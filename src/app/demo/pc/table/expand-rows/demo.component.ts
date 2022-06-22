import { Component, ViewChild } from "@angular/core";
import { TableData, JigsawTable, TableCellSwitchRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class TableExpandTableDemoComponent {
    action = ['toggle'];
    tableData: TableData;
    remainOpen: boolean = false;

    @ViewChild('tableCmp')
    tableCmp: JigsawTable;

    constructor() {
        this.resetData();
    }

    rowClick(rowIndex: number) {
        const rowData = [["cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6"], ["cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6"]]
        // this.tableCmp.expand(rowIndex, rowData, this, {
        //     remainOpenAfterDataChanges: this.remainOpen, action: <any>this.action[0]
        // });
    };

    updateData() {
        this.tableData.fromObject({
            data: [
                ["Emily", "可以", "$15128", "2017/4/21", "HR II", 23],
                ["Shirley", "不可以", "$11845", "2017/4/25", "R&D Dept II", 42],
                ["Easton", "可以", "$17636", "2017/4/24", "Marketing I", 36],
                ["Emily", "可以", "$15128", "2017/4/21", "HR II", 65],
                ["Shirley", "可以", "$11845", "2017/4/25", "R&D Dept II", 71],
            ],
            field: ["name", "expandable", "salary", "enroll-date", "office", "progress"],
            header: ["姓名", "是否可以展开", "薪资", "入职日期", "部门", "工作进度"]
        })
    }

    resetData() {
        this.tableData = new TableData();
        this.tableData.fromObject({
            data: [
                ["Emily", "可以", "$15128", "2017/4/21", "HR II", 23],
                ["Shirley", "不可以", "$11845", "2017/4/25", "R&D Dept II", 42],
                ["Easton", "可以", "$17636", "2017/4/24", "Marketing I", 36],
                ["Emily", "可以", "$15128", "2017/4/21", "HR II", 65],
                ["Shirley", "可以", "$11845", "2017/4/25", "R&D Dept II", 71],
                ["Easton", "不可以", "$17636", "2017/4/24", "Marketing I", 56],
                ["Emily", "可以", "$15128", "2017/4/21", "HR II", 17],
                ["Shirley", "不可以", "$11845", "2017/4/25", "R&D Dept II", 38],
                ["Easton", "可以", "$17636", "2017/4/24", "Marketing I", 9],
                ["Emily", "可以", "$15128", "2017/4/21", "HR II", 100],
                ["Shirley", "不可以", "$11845", "2017/4/25", "R&D Dept II", 11],
                ["Easton", "可以", "$17636", "2017/4/24", "Marketing I", 82]
            ],
            field: ["name", "expandable", "salary", "enroll-date", "office", "progress"],
            header: ["姓名", "是否可以展开", "薪资", "入职日期", "部门", "工作进度"]
        })
    }

    expandRow(rowIndex: number) {
        // this.tableCmp.expand(rowIndex, this.getExpansionHtml(2), this, {
        //     remainOpenAfterDataChanges: this.remainOpen, action: <any>this.action[0]
        // });
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
