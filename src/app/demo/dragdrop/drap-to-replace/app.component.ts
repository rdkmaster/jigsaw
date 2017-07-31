import {AfterViewInit, Component, QueryList, ViewChildren} from "@angular/core";
import {JigsawH5Draggable} from "jigsaw/component/dragdrop/draggable-h5";
import {JigsawH5Droppable} from "jigsaw/component/dragdrop/droppable-h5";

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

            draggable.dragStart.subscribe(event => {
                console.log('drag start');
                event.dataTransfer.setData('text', event.target.innerHTML);
            });

            draggable.dragging.subscribe(event => {
                console.log('drag');
            });

            draggable.dragEnd.subscribe(event => {
                console.log('drag end');
                if(this._replacedEl){
                    draggableEl.innerHTML = this._replacedEl;
                }
                this._replacedEl = null;
            })

        });

        this.droppables.forEach(droppable => {
            const droppableEl = droppable.elementRef.nativeElement;

            droppable.dragEnter.subscribe(event => {
                console.log('drag enter');
            });

            droppable.dragOver.subscribe(event => {
                console.log('drag over');
            });

            droppable.dropped.subscribe(event => {
                console.log('drop');
                this._replacedEl = droppableEl.innerHTML;
                droppableEl.innerHTML = event.dataTransfer.getData('text');
            })
        })
    }
}
