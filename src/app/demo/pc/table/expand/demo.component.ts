import { Component, ViewChild } from "@angular/core";
import { TableData, ColumnDefine, JigsawTable } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.css']
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
        },
        {
            target: "progress",
            visible: false
        }
    ];

    rowClick(rowIndex: number) {
        const html = this.getExpansionHtml(rowIndex);
        if (!html) {
            return;
        }
        this.tableCmp.expand(rowIndex, html, this);
    }

    getExpansionHtml(rowIndex: number) {
        const data = this.tableData.data[rowIndex]
        if (data[1] !== '可以展开') {
            return '';
        }
        const items = this.tableData.header.map((header, idx) =>
            `<li onclick="showValue('${data[idx]}')">
                <i class="iconfont iconfont-e748"></i>
                <span>${header}：</span>
                <span>${data[idx]}</span>
            </li>`).join('');
        return `
            <style>
                .uid-expand-title {
                    width: 148px;
                }
                .uid-expand-ul {
                    display:flex;
                    flex-direction: column;
                    width:200px;
                    align-items: start;
                    margin-left: 56px;
                }
                .uid-expand-ul li:hover {
                    background: var(--bg-hover);
                    cursor: pointer;
                }
                .uid-expand-ul li i:hover {
                    color: var(--primary-default)
                }
            </style>
            <p class="uid-expand-title">详细信息：</p>
            <ul class="uid-expand-ul">${items}</ul>
        `;
    }

    showValue(value: string) {
        alert('The value is ' + value);
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

    expandRow(rowIndex: number) {
        this.tableCmp.expand(rowIndex, this.getExpansionHtml(2), this);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
