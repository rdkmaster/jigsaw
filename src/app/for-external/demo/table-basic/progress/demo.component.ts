import {Component, ElementRef, Renderer2, ViewEncapsulation} from "@angular/core";
import {ColumnDefine, InternalUtils, TableCellProgressRenderer, TableData} from "jigsaw/public_api";
import {TableBasicTextService} from "../doc.service";

@Component({
    selector: 'table-basic-progress',
    templateUrl: "demo.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TableBasicProgressDemoComponent {
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

    public constructor(public renderer: Renderer2, public elementRef: ElementRef, public doc: TableBasicTextService) {
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
}
