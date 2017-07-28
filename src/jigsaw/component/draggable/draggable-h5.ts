import {Directive, ElementRef, NgModule, Output, EventEmitter} from "@angular/core";

export enum DragEventType {
    dragstart, dragend, dragover, dragenter, drag, drop
}

@Directive({
    selector: '[jigsaw-draggable-h5]',
    host:{
        '[attr.draggable]': 'true',
        '(selectstart)': '_selectStartHandle($event)',
        '(dragstart)': '_dragStartHandle($event)',
        '(dragend)': '_dragEndHandle($event)',
        '(dragover)': '_dragOverHandle($event)',
        '(dragenter)': '_dragEnterHandle($event)',
        '(drag)': '_dragHandle($event)',
        '(drop)': '_dropHandle($event)'
    }
})
export class JigsawH5Draggable{

    constructor(public elementRef: ElementRef){
    }

    @Output()
    drapEvent: EventEmitter<Event> = new EventEmitter<Event>();

    private _selectStartHandle(event){
        return false;
    }

    private _dragStartHandle(event){
        /*拖拽开始*/
        //拖拽效果
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setDragImage(event.target, 0, 0);
        event.eventType = DragEventType.dragstart;
        this.drapEvent.emit(event);
        return true;
    }

    private _dragEndHandle(event){
        /*拖拽结束*/
        //event.dataTransfer.clearData("text");
        event.eventType = DragEventType.dragend;
        this.drapEvent.emit(event);
        return false
    }

    private _dragOverHandle(event){
        /*拖拽元素在目标元素头上移动的时候*/
        event.preventDefault();
        event.eventType = DragEventType.dragover;
        this.drapEvent.emit(event);
        return true;
    }

    private _dragEnterHandle(event){
        /*拖拽元素进入目标元素头上的时候*/
        event.eventType = DragEventType.dragenter;
        this.drapEvent.emit(event);
        return true;
    }

    private _dragHandle(event){
        /*拖拽元素的时候*/
        event.eventType = DragEventType.drag;
        this.drapEvent.emit(event);
    }

    private _dropHandle(event){
        /*拖拽元素进入目标元素头上，同时鼠标松开的时候*/
        event.eventType = DragEventType.drop;
        this.drapEvent.emit(event);
        return false;
    }
}

@NgModule({
    imports: [],
    declarations: [JigsawH5Draggable],
    exports: [JigsawH5Draggable]
})
export class JigsawH5DraggableModule {
}

