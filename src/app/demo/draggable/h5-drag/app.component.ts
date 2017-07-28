import {AfterViewInit, Component, QueryList, ViewChildren} from "@angular/core";
import {JigsawH5Draggable} from "../../../../jigsaw/component/draggable/draggable-h5";
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
                if(event.type === 'dragstart'){
                    console.log('drag start');
                    event.dataTransfer.setData('text', event.target.innerHTML);
                }else if(event.type === 'drag'){
                    console.log('drag');
                }else if(event.type === 'dragend'){
                    console.log('drag end');
                    draggableEl.innerHTML = this._replacedEl;
                }else if(event.type === 'dragenter'){
                    console.log('drag enter');
                }else if (event.type === 'dragover'){
                    console.log('drag over');
                }else if(event.type === 'drop'){
                    console.log('drop');
                    this._replacedEl = draggableEl.innerHTML;
                    draggableEl.innerHTML = event.dataTransfer.getData('text');
                }
            })
        })
    }
}
