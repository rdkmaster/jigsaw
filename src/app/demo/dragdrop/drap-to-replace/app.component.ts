import {AfterViewInit, Component, QueryList, ViewChildren} from "@angular/core";
import {JigsawH5Draggable} from "jigsaw/component/dragdrop/draggable-h5";
import {JigsawH5Droppable} from "jigsaw/component/dragdrop/droppable-h5";
import {DragEventType, DropEventType} from "jigsaw/component/dragdrop";
@Component({
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class DragToReplaceDemoComponent implements AfterViewInit{
    @ViewChildren(JigsawH5Draggable) draggables: QueryList<JigsawH5Draggable>;
    @ViewChildren(JigsawH5Droppable) droppables: QueryList<JigsawH5Droppable>;
    private _replacedEl: string;

    ngAfterViewInit(){
        this.draggables.forEach(draggable => {
            const draggableEl = draggable.elementRef.nativeElement;
            draggable.drapEvent.subscribe(event => {
                if(event.eventType === DragEventType.dragstart){
                    console.log('drag start');
                    event.dataTransfer.setData('text', event.target.innerHTML);
                }else if(event.eventType === DragEventType.drag){
                    console.log('drag');
                }else if(event.eventType === DragEventType.dragend){
                    console.log('drag end');
                    if(this._replacedEl){
                        draggableEl.innerHTML = this._replacedEl;
                    }
                    this._replacedEl = null;
                }
            })
        });

        this.droppables.forEach(droppable => {
            const droppableEl = droppable.elementRef.nativeElement;
            droppable.dropEvent.subscribe(event => {
                if(event.eventType === DropEventType.dragenter){
                    console.log('drag enter');
                }else if (event.eventType === DropEventType.dragover){
                    console.log('drag over');
                }else if(event.eventType === DropEventType.drop){
                    console.log('drop');
                    this._replacedEl = droppableEl.innerHTML;
                    droppableEl.innerHTML = event.dataTransfer.getData('text');
                }
            })
        })
    }
}
