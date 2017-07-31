import {AfterViewInit, Component, QueryList, ViewChildren} from "@angular/core";
import {JigsawDraggable} from "jigsaw/component/dragdrop/draggable";
import {JigsawDroppable} from "jigsaw/component/dragdrop/droppable";

@Component({
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class DragToReplaceDemoComponent implements AfterViewInit {
    @ViewChildren(JigsawDraggable) draggables: QueryList<JigsawDraggable>;
    @ViewChildren(JigsawDroppable) droppables: QueryList<JigsawDroppable>;
    private _replacedEl: string;

    ngAfterViewInit() {
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
                if (this._replacedEl) {
                    draggableEl.innerHTML = this._replacedEl;
                }
                this._replacedEl = null;
            })

        });

        this.droppables.forEach(droppable => {
            const droppableEl = droppable.elementRef.nativeElement;

            droppable.dragEnter.subscribe(event => {
                console.log('drag enter');
                if (parseInt(droppableEl.querySelector('span').innerText) > 333) {
                    //判断禁止拖放行为
                    event.dataTransfer.dropEffect = 'none';
                }
            });

            droppable.dragOver.subscribe(event => {
                console.log('drag over');
                if (parseInt(droppableEl.querySelector('span').innerText) > 333) {
                    //判断禁止拖放行为
                    event.dataTransfer.dropEffect = 'none';
                }
            });

            droppable.dropped.subscribe(event => {
                console.log('drop');
                this._replacedEl = droppableEl.innerHTML;
                droppableEl.innerHTML = event.dataTransfer.getData('text');
            })
        })
    }
}
