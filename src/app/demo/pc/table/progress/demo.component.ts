import {Component, ElementRef, Renderer2, ViewEncapsulation} from "@angular/core";
import {ColumnDefine, InternalUtils, TableCellProgressRenderer, TableData} from "jigsaw/public_api";

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
            renderer: TableCellProgressRenderer,
            rendererInitData: {
                animate: true,
                status: 'processing',
                labelPosition: 'left',
                statusConfig: {
                    'success': {text: '搞定了', icon: 'iconfont iconfont-ea39'},
                    'warning': {text: '好像有问题', icon: 'iconfont iconfont-ea50'},
                    'error': {text: '出错啦', icon: 'iconfont iconfont-e8e3'},
                }
            }
        }
    }];

    public constructor(public renderer: Renderer2, public elementRef: ElementRef) {
        this.tableData = new TableData(
            [
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 'success'],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 'warning'],
                ["Easton", "Coder", "$17636", "2017/4/24", "Marketing I", 'error'],
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

    private _interval: any;

    public startProcessing() {
        clearInterval(this._interval);
        this._interval = setInterval(() => {
            this.tableData.data.forEach((row, idx) => {
                const statuses = ['success', 'warning', 'error', 'finish', 'disabled'];
                if (idx < 3) {
                    row[5] = statuses[InternalUtils.randomNumber(0, statuses.length - 1)];
                } else if (idx < 5) {
                    if (InternalUtils.randomNumber(1, 2) == 1) {
                        // 一半概率显示状态图标
                        row[5] = statuses[InternalUtils.randomNumber(0, statuses.length - 1)];
                    } else {
                        row[5] = InternalUtils.randomNumber(9, 99);
                    }
                } else {
                    const value = InternalUtils.randomNumber(10, 20);
                    row[5] = (row[5] + value) % 100;
                }
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
