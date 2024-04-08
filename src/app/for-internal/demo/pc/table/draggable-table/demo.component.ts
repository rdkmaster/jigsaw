import { Component, ElementRef, Renderer2, ViewEncapsulation } from "@angular/core";
import { TableData, AdditionalColumnDefine, TableDragReplaceRow, TableHeadCheckboxRenderer, TableCellCheckboxRenderer, ColumnDefine, TableCellSelectRenderer } from "jigsaw/public_api";

@Component({
    templateUrl: "demo.component.html",
    styleUrls: ['./../../assets/demo.common.css'],
    encapsulation: ViewEncapsulation.None
})
export class TableDraggableDemoComponent {
    public tableData: TableData;
    public selectedRow: number = -1;
    public rendererInitData = {
        icon: 'iconfont iconfont-e515', title: '拖拽换行', label: ''
    };

    public constructor(public renderer: Renderer2, public elementRef: ElementRef) {
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
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 12],
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
                ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 12],
            ],
            ["name", "position", "salary", "enroll-date", "office", "extn"],
            ["姓名", "职位", "薪资", "入职日期", "部门", "其他"]
        );
    }

    public additionalColumns: AdditionalColumnDefine[] = [
        {
            pos: 0,
            width: "80px",
            header: {
                text: "拖拽换行",
            },
            cell: {
                renderer: TableDragReplaceRow,
                rendererInitData: this.rendererInitData,
                alignment: "center"
            }
        }
    ];

    public additionalColumnDefines: AdditionalColumnDefine[] = [{
        pos: 0,
        width: 30,
        header: {
            renderer: TableHeadCheckboxRenderer
        },
        cell: {
            renderer: TableCellCheckboxRenderer
        }
    },
    {
        pos: 4,
        width: "100px",
        header: {
            text: "拖拽换行",
        },
        cell: {
            renderer: TableDragReplaceRow,
            rendererInitData: this.rendererInitData,
            alignment: "center"
        }
    }
    ];

    public columnDefines: ColumnDefine[] = [
        {
            target: 'office', width: '180',
            cell: {
                editorRenderer: TableCellSelectRenderer,
                editorRendererInitData: {
                    initData: (td, row, col) => {
                        return TableCellSelectRenderer.defaultInitDataGenerator(td, row, col);
                    },
                    searchable: true
                },
                editable: true,
                alwaysShowEditor: true
            }
        }
    ];

    public cellStatusChange($event) {
        console.log($event);
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = "将可拖动的单元格拖到另一行中间时松开鼠标可实现两行交换，在某一行的上方或者下方松开鼠标可实现两行间所有行的整体移动；" +
        "如果表格中存在纵向滚动条，可以自动向上或者向下滚动。";
    description: string = "";
}
