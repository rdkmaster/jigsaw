import {AfterViewInit, Component, ElementRef, Renderer2} from "@angular/core";
import {TableCellRendererBase} from "jigsaw/pc-components/table/table-renderer";
import {DragDropInfo} from "jigsaw/common/directive/dragdrop/types";
import {CommonUtils} from "jigsaw/common/core/utils/common-utils";

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
        cursor: move;
        width: 100%;
    }`]
})
export class TableDragReplaceRow extends TableCellRendererBase implements AfterViewInit {

    private allRows: any;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        super();
    }

    resetSelectedRow() {
        for (let i = 0; i < this.allRows.length; ++i) {
            this._renderer.setStyle(this.allRows[i], 'background-color', i % 2 == 0 ? '#fff': '#f8f8f8')
        }
    }

    dragStartHandle(dragInfo: DragDropInfo) {
        console.log('drag start');
        dragInfo.dragDropData = this.row;
        dragInfo.event.dataTransfer.effectAllowed = 'link';
        if (!CommonUtils.isIE()) {
            const img = CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr');
            dragInfo.event.dataTransfer.setDragImage(img, 50, 10);
        }
    }

    dragEndHandle(dragInfo: DragDropInfo) {
        console.log('drag end');
    }

    dragEnterHandle(dragInfo: DragDropInfo) {
        console.log('drag enter');
        dragInfo.event.dataTransfer.dropEffect = 'link';
        this.resetSelectedRow();
        if (dragInfo.event.dataTransfer.effectAllowed == 'link') {
            this._renderer.setStyle(CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr'),
                'background-color', '#ffd54b')
        }
    }

    dragOverHandle(dragInfo: DragDropInfo) {
        dragInfo.event.dataTransfer.dropEffect = 'link';
        if (dragInfo.event.dataTransfer.effectAllowed == 'link') {
            this._renderer.setStyle(CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr'),
                'background-color', 'ffbf13')
        }
    }

    dragLeaveHandle(dragInfo: DragDropInfo) {
        console.log('drag leave');
        this.resetSelectedRow();
    }

    dropHandle(dragInfo: DragDropInfo) {
        console.log('drop');
        const draggingRowIndex = +dragInfo.dragDropData;
        if (this.row == draggingRowIndex) {
            return;
        }

        const draggingRow = this.tableData.data[draggingRowIndex];
        if (!draggingRow) {
            return;
        }
        // exchange position...
        const thisRow = this.tableData.data[this.row];
        this.tableData.data[this.row] = draggingRow;
        this.tableData.data[draggingRowIndex] = thisRow;
        // inform jigsaw-table to update view
        this.tableData.refresh();

        this.resetSelectedRow();
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
export class TableDragDeleteRow extends TableCellRendererBase {
    dragStartHandle(dragInfo: DragDropInfo) {
        console.log('drag start');
        dragInfo.dragDropData = this.row;
        dragInfo.event.dataTransfer.effectAllowed = 'copy';
        if (!CommonUtils.isIE()) {
            dragInfo.event.dataTransfer.setDragImage(CommonUtils.getParentNodeBySelector(dragInfo.element, 'tr'), 600, 10);
        }
    }
}
