import { Component } from "@angular/core";
import { DragDropInfo } from "jigsaw/public_api";
import {AsyncDescription} from "../../../template/demo-template/demo-template";

@Component({
    selector: 'drag-to-replace',
    templateUrl: 'demo.component.html',
    styleUrls: ['./demo.component.css']
})
export class DragToReplaceDemoComponent extends AsyncDescription {
    public demoPath = "demo/drag-drop/drag-to-replace";

    private _replacedEl: string;

    public dragStartHandle(dragInfo: DragDropInfo) {
        console.log('drag start');
        dragInfo.dragDropData = dragInfo.element.innerHTML;
    }

    public dragEndHandle(dragInfo: DragDropInfo) {
        console.log('drag end');
        if (this._replacedEl) {
            dragInfo.element.innerHTML = this._replacedEl;
        }
        this._replacedEl = null;
    }

    public dragEnterHandle(dragInfo: DragDropInfo) {
        console.log('drag enter');
        if (parseInt(dragInfo.element.querySelector('span').innerText) > 333) {
            //判断禁止拖放行为
            dragInfo.event.dataTransfer.dropEffect = 'none';
        }
    }

    public dragOverHandle(dragInfo: DragDropInfo) {
        console.log('drag over');
        if (parseInt(dragInfo.element.querySelector('span').innerText) > 333) {
            //判断禁止拖放行为
            dragInfo.event.dataTransfer.dropEffect = 'none';
        }
    }

    public dropHandle(dragInfo: DragDropInfo) {
        console.log('drop');
        this._replacedEl = dragInfo.element.innerHTML;
        dragInfo.element.innerHTML = dragInfo.dragDropData;
    }
}
