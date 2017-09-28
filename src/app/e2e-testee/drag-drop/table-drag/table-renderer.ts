import {AfterViewInit, Component, ElementRef, Renderer2} from "@angular/core";
import {TableCellRenderer} from "jigsaw/component/table/table-api";
import {DragDropInfo} from "jigsaw/directive/dragdrop/types";
import {CommonUtils} from "jigsaw/core/utils/common-utils";

/*
 * 换行
 * */
@Component({
    template: `
        <div class="option-box"
             jigsaw-draggable jigsaw-droppable
             (jigsawDragStart)="dragStartHandle($event)"
             (jigsawDragEnd)="dragEndHandle($event)"
             (jigsawDragEnter)="dragEnterHandle($event)"
             (jigsawDragOver)="dragOverHandle($event)"
             (jigsawDragLeave)="dragLeaveHandle($event)"
             (jigsawDrop)="dropHandle($event)">
            <span class="fa fa-arrows-alt"></span>
        </div>`,
    styles: [`.option-box {
        color: #108ee9;
        cursor: move
    }`]
})
export class TableDragReplaceRow extends TableCellRenderer implements AfterViewInit {

    private allRows: any;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        super();
    }

    resetSelectedRow() {
        for (let i = 0; i < this.allRows.length; ++i) {
            this._renderer.setStyle(this.allRows[i], 'border-top', '1px solid #d9d9d9')
        }
    }

    dragStartHandle(dragInfo: DragDropInfo) {
        console.log('drag start');
        dragInfo.dragDropData = this.row;
        dragInfo.event.dataTransfer.effectAllowed = 'link';
        dragInfo.event.dataTransfer.setDragImage(CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr'), 50, 10);
    }

    dragEndHandle(dragInfo: DragDropInfo) {
        console.log('drag end');
        this.resetSelectedRow();
    }

    dragEnterHandle(dragInfo: DragDropInfo) {
        console.log('drag enter');
        dragInfo.event.dataTransfer.dropEffect = 'link';
        this.resetSelectedRow();
        if (dragInfo.event.dataTransfer.effectAllowed == 'link') {
            this._renderer.setStyle(CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr'),
                'border-top', '2px solid #108ee9')
        }
    }

    dragOverHandle(dragInfo: DragDropInfo) {
        dragInfo.event.dataTransfer.dropEffect = 'link';
        if (dragInfo.event.dataTransfer.effectAllowed == 'link') {
            this._renderer.setStyle(CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr'),
                'border-top', '2px solid #108ee9')
        }
    }

    dragLeaveHandle(dragInfo: DragDropInfo) {
        console.log('drag leave');
        this.resetSelectedRow();
    }

    dropHandle(dragInfo: DragDropInfo) {
        console.log('drop');
        const insertRowIndex = dragInfo.dragDropData;
        if (insertRowIndex >= 0 && this.row != insertRowIndex) {
            const thisRow = this.tableData.data[this.row];
            const insertRow = this.tableData.data.splice(insertRowIndex, 1)[0];
            const thisRowIndex = this.tableData.data.indexOf(thisRow);
            this.tableData.data.splice(thisRowIndex, 0, insertRow);
            this.tableData.refresh();
        }
    }

    ngAfterViewInit() {
        this.allRows = CommonUtils
            .getParentNodeBySelector(this._elementRef.nativeElement, 'table')
            .querySelectorAll('tr');
    }
}

/*
 * 删除
 * */
@Component({
    template: `
        <div class="option-box"
             jigsaw-draggable
             (jigsawDragStart)="dragStartHandle($event)">
            <span class="fa fa-trash"></span>
        </div>`,
    styles: [`.option-box {
        color: #108ee9;
        cursor: move
    }`]
})
export class TableDragDeleteRow extends TableCellRenderer {
    dragStartHandle(dragInfo: DragDropInfo) {
        console.log('drag start');
        dragInfo.dragDropData = this.row;
        dragInfo.event.dataTransfer.effectAllowed = 'copy';
        dragInfo.event.dataTransfer.setDragImage(CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr'), 600, 10);
    }
}
