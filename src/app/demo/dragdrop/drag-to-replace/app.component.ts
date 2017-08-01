import {Component} from "@angular/core";
import {DragInfo} from "jigsaw/directive/dragdrop/draggable";

@Component({
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class DragToReplaceDemoComponent{

    private _replacedEl: string;

    dragStartHandle(dragInfo: DragInfo){
        console.log('drag start');
        dragInfo.event.dataTransfer.setData('text', dragInfo.element.innerHTML);
    }

    dragEndHandle(dragInfo: DragInfo){
        console.log('drag end');
        if (this._replacedEl) {
            dragInfo.element.innerHTML = this._replacedEl;
        }
        this._replacedEl = null;
    }

    dragEnterHandle(dragInfo: DragInfo){
        console.log('drag enter');
        if (parseInt(dragInfo.element.querySelector('span').innerText) > 333) {
            //判断禁止拖放行为
            dragInfo.event.dataTransfer.dropEffect = 'none';
        }
    }

    dragOverHandle(dragInfo: DragInfo){
        console.log('drag over');
        if (parseInt(dragInfo.element.querySelector('span').innerText) > 333) {
            //判断禁止拖放行为
            dragInfo.event.dataTransfer.dropEffect = 'none';
        }
    }

    droppedHandle(dragInfo: DragInfo){
        console.log('drop');
        this._replacedEl = dragInfo.element.innerHTML;
        dragInfo.element.innerHTML = dragInfo.event.dataTransfer.getData('text');
    }

}
