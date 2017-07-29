import {Directive, ElementRef, Output, EventEmitter} from "@angular/core";

export enum DropEventType {
    dragover, dragenter, dragleave, drop
}

@Directive({
    selector: '[jigsaw-droppable-h5]',
    host:{
        '(dragenter)': '_dragEnterHandle($event)',
        '(dragleave)': '_dragLeaveHandle($event)',
        '(dragover)': '_dragOverHandle($event)',
        '(drop)': '_dropHandle($event)'
    }
})
export class JigsawH5Droppable{

    constructor(public elementRef: ElementRef){
    }

    @Output()
    dropEvent: EventEmitter<Event> = new EventEmitter<Event>();

    private _dragEnterHandle(event){
        /*拖拽元素进入目标元素头上的时候*/
        event.eventType = DropEventType.dragenter;
        this.dropEvent.emit(event);
        return true;
    }

    private _dragLeaveHandle(event){
        /*拖拽元素离开目标元素头上的时候*/
        event.eventType = DropEventType.dragleave;
        this.dropEvent.emit(event);
        return true;
    }

    private _dragOverHandle(event){
        /*拖拽元素在目标元素头上移动的时候*/
        event.preventDefault();
        event.eventType = DropEventType.dragover;
        this.dropEvent.emit(event);
        return true;
    }

    private _dropHandle(event){
        /*拖拽元素进入目标元素头上，同时鼠标松开的时候*/
        event.eventType = DropEventType.drop;
        this.dropEvent.emit(event);
        return false;
    }
}


