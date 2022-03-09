import { Component, ViewChild } from "@angular/core";
import {TableData, ColumnDefine, JigsawTable, RowExpandInfo} from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableExpandDemoComponent {
    tableData: TableData;
    @ViewChild('tableCmp') tableCmp: JigsawTable;

    constructor() {
        this.tableData = new TableData(
            [
                ["Emily", "可以展开", "$15128", "2017/4/21", "HR II", 23],
                ["Shirley", "不允许展开", "$11845", "2017/4/25", "R&D Dept II", 42],
                ["Easton", "可以展开", "$17636", "2017/4/24", "Marketing I", 36],
                ["Emily", "可以展开", "$15128", "2017/4/21", "HR II", 65],
                ["Shirley", "不允许展开", "$11845", "2017/4/25", "R&D Dept II", 71],
                ["Easton", "可以展开", "$17636", "2017/4/24", "Marketing I", 56],
                ["Emily", "可以展开", "$15128", "2017/4/21", "HR II", 17],
                ["Shirley", "不允许展开", "$11845", "2017/4/25", "R&D Dept II", 38],
                ["Easton", "可以展开", "$17636", "2017/4/24", "Marketing I", 9],
                ["Emily", "可以展开", "$15128", "2017/4/21", "HR II", 100],
                ["Shirley", "不允许展开", "$11845", "2017/4/25", "R&D Dept II", 11],
                ["Easton", "可以展开", "$17636", "2017/4/24", "Marketing I", 82]
            ],
            ["name", "expandable", "salary", "enroll-date", "office", "progress"],
            ["姓名", "是否可以展开", "薪资", "入职日期", "部门", "工作进度"]
        );
    }

    columns: ColumnDefine[] = [
        {
            target: "salary",
            width: "20%"
        }
    ];

    rowClick(rowInfo: RowExpandInfo) {
        if (rowInfo.data[1] !== '可以展开') {
            return;
        }
        const name = rowInfo.data[0];
        const salary = rowInfo.data[2];
        const html = `
            <style>
                .uid-expand-ul {
                    display:flex;
                    flex-direction: column;
                    width:200px;
                }

                .uid-expand-ul li:hover {
                    background: var(--bg-hover);
                    cursor: pointer;
                }

                .uid-expand-ul li i:hover {
                    color: var(--primary-default)
                }
            </style>
            <div>详细信息：</div>
            <ul class="uid-expand-ul">
                <li onclick="hello('${name}')">
                    <i class="iconfont iconfont-e748"></i>
                    <span>姓名：</span>
                    <span>${name}</span>
                </li>
                <li>
                    <span>薪资：</span>
                    <span>${salary}</span>
                </li>
            </ul>
        `;
        this.tableCmp.expand(rowInfo.rowIndex, html, this);
    }

    hello(who) {
        alert('Hello' + who)
    }

    refreshData() {
        this.tableData.fromObject({
            data: [
                ["Emily", "可以展开", "$15128", "2017/4/21", "HR II", 23],
                ["Shirley", "不允许展开", "$11845", "2017/4/25", "R&D Dept II", 42],
                ["Easton", "可以展开", "$17636", "2017/4/24", "Marketing I", 36],
                ["Emily", "可以展开", "$15128", "2017/4/21", "HR II", 65],
                ["Shirley", "不允许展开", "$11845", "2017/4/25", "R&D Dept II", 71],
            ],
            field: ["name", "expandable", "salary", "enroll-date", "office", "progress"],
            header: ["姓名", "是否可以展开", "薪资", "入职日期", "部门", "工作进度"]
        })
    }

    resetData() {
        this.tableData.fromObject({
            data: [
                ["Emily", "可以展开", "$15128", "2017/4/21", "HR II", 23],
                ["Shirley", "不允许展开", "$11845", "2017/4/25", "R&D Dept II", 42],
                ["Easton", "可以展开", "$17636", "2017/4/24", "Marketing I", 36],
                ["Emily", "可以展开", "$15128", "2017/4/21", "HR II", 65],
                ["Shirley", "不允许展开", "$11845", "2017/4/25", "R&D Dept II", 71],
                ["Easton", "可以展开", "$17636", "2017/4/24", "Marketing I", 56],
                ["Emily", "可以展开", "$15128", "2017/4/21", "HR II", 17],
                ["Shirley", "不允许展开", "$11845", "2017/4/25", "R&D Dept II", 38],
                ["Easton", "可以展开", "$17636", "2017/4/24", "Marketing I", 9],
                ["Emily", "可以展开", "$15128", "2017/4/21", "HR II", 100],
                ["Shirley", "不允许展开", "$11845", "2017/4/25", "R&D Dept II", 11],
                ["Easton", "可以展开", "$17636", "2017/4/24", "Marketing I", 82]
            ],
            field: ["name", "expandable", "salary", "enroll-date", "office", "progress"],
            header: ["姓名", "是否可以展开", "薪资", "入职日期", "部门", "工作进度"]
        })
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
