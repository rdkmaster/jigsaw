import {Directive, ElementRef, Output, EventEmitter} from "@angular/core";

export enum DragEventType {
    dragstart, drag, dragend
}

@Directive({
    selector: '[jigsaw-draggable-h5]',
    host:{
        '[attr.draggable]': 'true',
        '(selectstart)': '_selectStartHandle($event)',
        '(dragstart)': '_dragStartHandle($event)',
        '(dragend)': '_dragEndHandle($event)',
        '(drag)': '_dragHandle($event)'
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

    private _dragHandle(event){
        /*拖拽元素的时候*/
        event.eventType = DragEventType.drag;
        this.drapEvent.emit(event);
    }

}

