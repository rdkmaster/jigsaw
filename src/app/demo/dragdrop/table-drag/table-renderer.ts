import {AfterViewInit, Component, Renderer2, ViewChild} from "@angular/core";
import {TableCellRenderer} from "jigsaw/component/table/table-api";
import {JigsawDraggable} from "jigsaw/directive/dragdrop/draggable";
import {CommonUtils} from "jigsaw/core/utils/common-utils";
import {JigsawDroppable} from "jigsaw/directive/dragdrop/droppable";

/*
 * 换行
 * */
@Component({
    template: '<div class="option-box" jigsaw-draggable jigsaw-droppable><span class="fa fa-arrows-alt"></span></div>',
    styles: [`.option-box{color: #108ee9; cursor: move}`]
})
export class TableReplaceRow extends TableCellRenderer implements AfterViewInit {
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
            event.dataTransfer.effectAllowed = 'link';
            event.dataTransfer.setDragImage(CommonUtils.getParentNodeBySelector(draggableEl, 'tr'), 600, 10);
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
            event.dataTransfer.dropEffect = 'link';
            for (var i = 0; i < allRows.length; ++i) {
                this._renderer.setStyle(allRows[i], 'border-top', '1px solid #d9d9d9')
            }

            this._renderer.setStyle(thisRow, 'border-top', '4px solid #d9d9d9')
        });

        this.droppable.dragOver.subscribe(event => {
            event.dataTransfer.dropEffect = 'link';
        });

        this.droppable.dragLeave.subscribe(event => {
            console.log('drag leave');
            for (var i = 0; i < allRows.length; ++i) {
                this._renderer.setStyle(allRows[i], 'border-top', '1px solid #d9d9d9')
            }
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

/*
 * 删除
 * */
@Component({
    template: '<div class="option-box" jigsaw-draggable><span class="fa fa-trash"></span></div>',
    styles: [`.option-box{color: #108ee9; cursor: move}`]
})
export class TableDelRow extends TableCellRenderer implements AfterViewInit {
    @ViewChild(JigsawDraggable) draggable: JigsawDraggable;

    ngAfterViewInit() {
        //拖拽对象
        const draggableEl = this.draggable.elementRef.nativeElement;
        this.draggable.dragStart.subscribe(event => {
            console.log('drag start');
            event.dataTransfer.setData('text', this.row);
            event.dataTransfer.effectAllowed = 'copy';
            event.dataTransfer.setDragImage(CommonUtils.getParentNodeBySelector(draggableEl, 'tr'), 600, 10);
        });

        this.draggable.dragEnd.subscribe(event => {

        });

    }
}
