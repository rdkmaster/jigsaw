import {Component, ElementRef, Renderer2, ViewEncapsulation} from "@angular/core";
import {TableData, AdditionalColumnDefine, DragDropInfo} from "jigsaw/public_api";
import {TableDragDeleteRow, TableDragReplaceRow} from "./table-renderer";
import {DragDropTextService} from "../doc.service";

@Component({
    selector: 'dragdrop-simple-table',
    templateUrl: 'demo.component.html',
    styles: [`
        .demo-container p {
            margin-top: 8px
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class TableDragDemoComponent {
    public tableData: TableData;
    public selectedRow: number = -1;
    public rendererInitData = {
        icon: 'iconfont iconfont-e515', title: '拖拽换行', label: ''
    };

    public constructor(public renderer: Renderer2, public elementRef: ElementRef, public text: DragDropTextService) {
        this.tableData = new TableData(
            [
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 1],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 2],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 3],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 4],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 5],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 6],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 7],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 8],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 9],
                ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 10],
                ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 11],
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 12]
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]
        );
    }

    public additionalColumns: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: "40px",
            header: {
                text: "拖拽换行",
            },
            cell: {
                renderer: TableDragReplaceRow,
                rendererInitData: this.rendererInitData
            }
        }
    ];

}
