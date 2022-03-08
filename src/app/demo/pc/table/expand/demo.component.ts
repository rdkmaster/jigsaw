import { Component, ViewChild } from "@angular/core";
import { TableData, ColumnDefine, JigsawTable } from "jigsaw/public_api";

@Component({
    templateUrl: './demo.component.html'
})
export class TableExpandDemoComponent {
    tableData: TableData;
    @ViewChild('tableCmp') tableCmp: JigsawTable;

    constructor() {
        this.tableData = new TableData(
            [
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 23],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 42],
                ["Easton", "Coder", "$17636", "2017/4/24", "Marketing I", 36],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 65],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 71],
                ["Easton", "Coder", "$17636", "2017/4/24", "Marketing I", 56],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 17],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 38],
                ["Easton", "Coder", "$17636", "2017/4/24", "Marketing I", 9],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 100],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 11],
                ["Easton", "Coder", "$17636", "2017/4/24", "Marketing I", 82]
            ],
            ["name", "position", "salary", "enroll-date", "office", "progress"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "工作进度"]
        );
    }

    columns: ColumnDefine[] = [
        {
            target: "salary",
            width: "20%"
        }
    ];

    rowClick($event) {
        if ($event.data[1] === 'Coder') {
            const name = $event.data[0];
            const salary = $event.data[2];
            const html = `
            <div>详细信息：</div>
            <style>
                .uid-expand-ul {
                    background: red;
                }
            </style>
            <ul class="uid-expand-ul" style="display:flex; flex-direction: column; width:200px;">
                <li onclick="hello('${name}')">
                    <i class="iconfont iconfont-e748"></i>
                    <span>姓名：</span>
                    <span>${name}</span>
                </li>
                <li ondblclick="whoIsThis()">
                    <span>薪资：</span>
                    <span>${salary}</span>
                </li>
            </ul> 
            `;

            const context = `
            this.context = {
                hello: who => {
                    alert('Hello' + who)
                },
                whoIsThis: $event => {
                    console.log(this)
                }
            }
            `;
            this.tableCmp.expand($event, html, context);
        }
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
