import { Component, ElementRef, Renderer2, ViewEncapsulation } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { TableData, AdditionalColumnDefine, TableDragReplaceRow } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'table-actions-draggable-table',
    templateUrl: "demo.component.html",
    encapsulation: ViewEncapsulation.None
})
export class TableDraggableDemoComponent extends AsyncDescription {
    public demoPath = "demo/table-actions/draggable-table";

    public tableData: TableData;
    public selectedRow: number = -1;
    public rendererInitData = {
        icon: 'iconfont iconfont-e515', title: '拖拽换行', label: ''
    };

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

    public constructor(public renderer: Renderer2, public elementRef: ElementRef, http: HttpClient, el: ElementRef) {
        super(http, el);
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
}
