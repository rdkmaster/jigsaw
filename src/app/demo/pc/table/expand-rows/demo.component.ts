import { Component, ViewChild } from "@angular/core";
import { TableData, JigsawTable, TableCellSwitchRenderer, TableCellCheckboxRenderer } from "jigsaw/public_api";

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

    row: number;

    constructor() {
        this.resetData();
    }

    rowData = [
        ["cell-1", { data: false, renderer: TableCellSwitchRenderer }, {
            data: `<a onclick="onClick()">点击</a>`,
            renderer: 'html'
        }, "cell-4", "cell-5", "cell-6", { data: true, renderer: TableCellCheckboxRenderer }],
        ["cell-1", { data: true, renderer: TableCellSwitchRenderer }, {
            data: `<i class="iconfont iconfont-e8e3"></i>`,
            renderer: 'html'
        }, "cell-4", "cell-5", "cell-6", { data: false, renderer: TableCellCheckboxRenderer }],
        ["cell-1", { data: false, renderer: TableCellSwitchRenderer, rendererInitData: { valid: false } }, {
            data: `<i class="iconfont iconfont-ea50"></i> 图标`,
            renderer: 'html'
        }, "cell-4", "cell-5", "cell-6", { data: false, renderer: TableCellCheckboxRenderer, rendererInitData: { valid: false } }],
        ["cell-1", { data: true, renderer: TableCellSwitchRenderer, rendererInitData: { disabled: true } }, , {
            data: `<span>文本</span><i class="iconfont iconfont-e9b6"></i>`,
            renderer: 'html'
        }, "cell-4", "cell-5", "cell-6", { data: true, renderer: TableCellCheckboxRenderer, rendererInitData: { disabled: true } }]
    ]

    onClick() {
        alert("按钮被点击了");
    }

    rowClick(rowIndex: number) {
        this.tableCmp.expand(rowIndex, this.rowData, this, {
            remainOpenAfterDataChanges: this.remainOpen, action: <any>this.action[0]
        });
    };

    updateData() {
        this.tableData.fromObject({
            data: [
                ["Emily", "", "$15128", "2017/4/21", "HR II", 23, ""],
                ["Shirley", "", "$11845", "2017/4/25", "R&D Dept II", 42, ""],
                ["Easton", "", "$17636", "2017/4/24", "Marketing I", 36, ""],
                ["Emily", "", "$15128", "2017/4/21", "HR II", 65, ""],
                ["Shirley", "", "$11845", "2017/4/25", "R&D Dept II", 71, ""],
            ],
            field: ["name", "switch", "salary", "enroll-date", "office", "progress", "checkbox"],
            header: ["姓名", "开关组件", "薪资", "入职日期", "部门", "工作进度", "多选框"]
        })
    }

    resetData() {
        this.tableData = new TableData();
        this.tableData.fromObject({
            data: [
                ["Emily", "", "$15128", "2017/4/21", "HR II", 23, ""],
                ["Shirley", "", "$11845", "2017/4/25", "R&D Dept II", 42, ""],
                ["Easton", "", "$17636", "2017/4/24", "Marketing I", 36, ""],
                ["Emily", "", "$15128", "2017/4/21", "HR II", 65, ""],
                ["Shirley", "", "$11845", "2017/4/25", "R&D Dept II", 71, ""],
                ["Easton", "", "$17636", "2017/4/24", "Marketing I", 56, ""],
                ["Emily", "", "$15128", "2017/4/21", "HR II", 17, ""],
                ["Shirley", "", "$11845", "2017/4/25", "R&D Dept II", 38, ""],
                ["Easton", "", "$17636", "2017/4/24", "Marketing I", 9, ""],
                ["Emily", "", "$15128", "2017/4/21", "HR II", 100, ""],
                ["Shirley", "", "$11845", "2017/4/25", "R&D Dept II", 11, ""],
                ["Easton", "", "$17636", "2017/4/24", "Marketing I", 82, ""]
            ],
            field: ["name", "switch", "salary", "enroll-date", "office", "progress", "checkbox"],
            header: ["姓名", "开关组件", "薪资", "入职日期", "部门", "工作进度", "多选框"]
        })
    }

    expandRow(rowIndex: number) {
        this.tableCmp.expand(rowIndex, this.rowData, this, {
            remainOpenAfterDataChanges: this.remainOpen, action: <any>this.action[0]
        });
    }

    rowExpandDataChange($event) {
        this.row = $event.row;
    }




    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
