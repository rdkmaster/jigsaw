import {Component} from "@angular/core";
import {DragDropInfo} from "jigsaw/directive/dragdrop/types";

@Component({
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class DragToReplaceDemoComponent {

    private _replacedEl: string;

    dragStartHandle(dragInfo: DragDropInfo) {
        console.log('drag start');
        dragInfo.dragDropData = dragInfo.element.innerHTML;
    }

    dragEndHandle(dragInfo: DragDropInfo) {
        console.log('drag end');
        if (this._replacedEl) {
            dragInfo.element.innerHTML = this._replacedEl;
        }
        this._replacedEl = null;
    }

    dragEnterHandle(dragInfo: DragDropInfo) {
        console.log('drag enter');
        if (parseInt(dragInfo.element.querySelector('span').innerText) > 333) {
            //判断禁止拖放行为
            dragInfo.event.dataTransfer.dropEffect = 'none';
        }
    }

    dragOverHandle(dragInfo: DragDropInfo) {
        console.log('drag over');
        if (parseInt(dragInfo.element.querySelector('span').innerText) > 333) {
            //判断禁止拖放行为
            dragInfo.event.dataTransfer.dropEffect = 'none';
        }
    }

    dropHandle(dragInfo: DragDropInfo) {
        console.log('drop');
        this._replacedEl = dragInfo.element.innerHTML;
        dragInfo.element.innerHTML = dragInfo.dragDropData;
    }

    // ====================================================================
    // ignore the following lines, they are not important to this demo
    // ====================================================================
    summary: string = '';
    description: string = '';
}
