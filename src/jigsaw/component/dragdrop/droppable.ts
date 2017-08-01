import {Directive, ElementRef, Output, EventEmitter, NgZone} from "@angular/core";

@Directive({
    selector: '[jigsaw-droppable], [jigsawDroppable]',
    host:{
        '(dragenter)': '_dragEnterHandle($event)',
        '(dragleave)': '_dragLeaveHandle($event)',
        '(dragover)': '_dragOverHandle($event)',
        '(drop)': '_dropHandle($event)'
    }
})
export class JigsawDroppable{

    constructor(public elementRef: ElementRef, private _zone: NgZone){
    }

    @Output()
    dragEnter: EventEmitter<Event> = new EventEmitter<Event>();

    @Output()
    dragLeave: EventEmitter<Event> = new EventEmitter<Event>();

    @Output()
    dragOver: EventEmitter<Event> = new EventEmitter<Event>();

    // 用drop命名会报错，可能与原生的冲突了
    @Output()
    dropped: EventEmitter<Event> = new EventEmitter<Event>();

    private _dragEnterHandle(event){
        /*拖拽元素进入目标元素头上的时候*/
        this.dragEnter.emit(event);
        return true;
    }

    private _dragLeaveHandle(event){
        /*拖拽元素离开目标元素头上的时候*/
        this.dragLeave.emit(event);
        return false;
    }

    private _dragOverHandle(event){
        /*拖拽元素在目标元素头上移动的时候*/
        this._zone.runOutsideAngular(() => {
            event.preventDefault();
            this.dragOver.emit(event);
            return true;
        })
    }

    private _dropHandle(event){
        /*拖拽元素进入目标元素头上，同时鼠标松开的时候*/
        this.dropped.emit(event);
        return false;
    }
}


