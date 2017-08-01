import {AfterContentInit, AfterViewInit, Component, QueryList, Renderer2, ViewChild, ViewChildren} from "@angular/core";
import {JigsawDraggable} from "jigsaw/component/dragdrop/draggable";
import {JigsawDroppable} from "jigsaw/component/dragdrop/droppable";
import {TableData} from "../../../../jigsaw/core/data/table-data";
import {AdditionalColumnDefine, TableCellRenderer} from "../../../../jigsaw/component/table/table-api";
import {CommonUtils} from "../../../../jigsaw/core/utils/common-utils";

/*
 * 操作列
 * */
@Component({
    template: '<div class="option-box" jigsaw-draggable jigsaw-droppable><a href="javascript:;">换行</a> <a href="javascript:;">删除</a></div>',
    styles: [`.option-box {
        width: 100%;
        height: 100%
    }

    a {
        color: #ffaa00
    }

    a:hover {
        text-decoration: underline
    }`]
})
export class TableCellOption extends TableCellRenderer implements AfterViewInit {
    @ViewChild(JigsawDraggable) draggable: JigsawDraggable;
    @ViewChild(JigsawDroppable) droppable: JigsawDroppable;

    constructor(private _renderer: Renderer2){
        super()
    }

    ngAfterViewInit() {
        //拖拽对象
        const draggableEl = this.draggable.elementRef.nativeElement;
        const allRows = CommonUtils.getParentNodeBySelector(draggableEl, 'table').querySelectorAll('tr');
        this.draggable.dragStart.subscribe(event => {
            console.log('drag start');
            event.dataTransfer.setData('text', this.row);
            event.dataTransfer.setDragImage(CommonUtils.getParentNodeBySelector(draggableEl, 'tr'), 600, 10);
        });

        this.draggable.dragging.subscribe(event => {
            console.log('drag');
        });

        this.draggable.dragEnd.subscribe(event => {
            console.log('drag end');
            for (var i = 0; i < allRows.length; ++i) {
                this._renderer.setStyle(allRows[i], 'border-top', '1px solid #d9d9d9')
            }
        });

        //拖放对象
        const droppableEl = this.droppable.elementRef.nativeElement;
        const thisRow = CommonUtils.getParentNodeBySelector(droppableEl, 'tr');
        this.droppable.dragEnter.subscribe(event => {
            console.log('drag enter');
            for (var i = 0; i < allRows.length; ++i) {
                this._renderer.setStyle(allRows[i], 'border-top', '1px solid #d9d9d9')
            }

            this._renderer.setStyle(thisRow, 'border-top', '4px solid #d9d9d9')
        });

        this.droppable.dragOver.subscribe(event => {
            console.log('drag over');
        });

        this.droppable.dragLeave.subscribe(event => {
            console.log('drag leave');
        });

        this.droppable.dropped.subscribe(event => {
            console.log('drop');
            const insertRowIndex = parseInt(event.dataTransfer.getData('text'));
            if (insertRowIndex >= 0 && this.row != insertRowIndex) {
                this.tableData.data.splice(this.row - 1, 0, this.tableData.data.splice(insertRowIndex, 1)[0]);
                this.tableData.refresh();
            }
        })
    }
}

@Component({
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class TableDragDemoComponent {

    tableData: TableData;

    constructor() {
        this.tableData = new TableData([
            ["Emily", "Coder", "$15128", "2017/4/21", "HR II", 316],
            ["Shirley", "Accountant", "$11845", "2017/4/25", "R&D Dept II", 711],
            ["Eason", "Coder", "$17636", "2017/4/24", "Marketing I", 796],
            ["Andy", "Coder", "$17149", "2017/4/26", "R&D Dept I", 65],
            ["Vivian", "Accountant", "$18272", "2017/4/22", "R&D Dept II", 892],
            ["Wendy", "Coder", "$17257", "2017/4/26", "HR I", 394],
            ["Joyce", "System Architect", "$12106", "2017/4/27", "R&D Dept III", 93],
            ["Tracy", "System Architect", "$10531", "2017/4/23", "HR II", 580],
            ["Nancy", "Coder", "$13585", "2017/4/26", "Marketing II", 900],
            ["Johnny", "Accountant", "$16346", "2017/4/26", "R&D Dept III", 403]
        ], [
            "name",
            "position",
            "salary",
            "start_date",
            "office",
            "extn"
        ], [
            "姓名",
            "职位",
            "薪资",
            "入职日期",
            "部门",
            "其他"
        ]);
    }

    additionalColumns: AdditionalColumnDefine[] = [
        {
            width: '10%',
            header: {
                text: '操作',
                class: 'red-text'
            },
            cell: {
                renderer: TableCellOption
            }
        }
    ];


}
