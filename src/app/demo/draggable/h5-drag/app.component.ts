import {AfterViewInit, Component, QueryList, ViewChildren} from "@angular/core";
import {DragEventType, JigsawH5Draggable} from "../../../../jigsaw/component/draggable/draggable-h5";
@Component({
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class H5DragDemoComponent implements AfterViewInit{
    @ViewChildren(JigsawH5Draggable) draggables: QueryList<JigsawH5Draggable>;
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
                }else if(event.eventType === DragEventType.dragenter){
                    console.log('drag enter');
                }else if (event.eventType === DragEventType.dragover){
                    console.log('drag over');
                }else if(event.eventType === DragEventType.drop){
                    console.log('drop');
                    this._replacedEl = draggableEl.innerHTML;
                    draggableEl.innerHTML = event.dataTransfer.getData('text');
                }
            })
        })
    }
}
