import {Directive, ElementRef, Output, EventEmitter, NgZone, Input} from "@angular/core";

@Directive({
    selector: '[jigsaw-draggable], [jigsawDraggable]',
    host:{
        '[attr.draggable]': 'true',
        '(selectstart)': '_selectStartHandle($event)',
        '(dragstart)': '_dragStartHandle($event)',
        '(dragend)': '_dragEndHandle($event)',
        '(drag)': '_dragHandle($event)'
    }
})
export class JigsawDraggable{

    constructor(public elementRef: ElementRef, private _zone: NgZone){
    }

    @Input()
    dragData: any;

    @Output()
    dragStart: EventEmitter<Event> = new EventEmitter<Event>();

    @Output()
    dragEnd: EventEmitter<Event> = new EventEmitter<Event>();

    // 用drag命名会报错，可能与原生的冲突了
    @Output()
    dragging: EventEmitter<Event> = new EventEmitter<Event>();

    private _selectStartHandle(event){
        return false;
    }

    private _dragStartHandle(event){
        /*拖拽开始*/
        //拖拽效果
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setDragImage(event.target, 0, 0);
        this.dragStart.emit(event);
        return true;
    }

    private _dragEndHandle(event){
        /*拖拽结束*/
        //event.dataTransfer.clearData("text");
        this.dragEnd.emit(event);
        return false
    }

    private _dragHandle(event){
        /*拖拽元素的时候*/
        this._zone.runOutsideAngular(() => {
            this.dragging.emit(event);
        })
    }

}

