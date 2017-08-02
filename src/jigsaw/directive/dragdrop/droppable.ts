import {Directive, ElementRef, Output, EventEmitter, NgZone, OnInit, Renderer2} from "@angular/core";
import {DragInfo} from "./draggable";

@Directive({
    selector: '[jigsaw-droppable], [jigsawDroppable]',
    host:{
        '(dragenter)': '_dragEnterHandle($event)',
        '(dragleave)': '_dragLeaveHandle($event)',
        '(drop)': '_dropHandle($event)'
    }
})
export class JigsawDroppable implements OnInit{

    private _hostElement: HTMLElement;

    //dragenter、dragleave、drop有可能是其子元素触发的，所以有必要保存elementRef
    constructor(private _renderer: Renderer2, private elementRef: ElementRef, private _zone: NgZone){
        this._hostElement = this.elementRef.nativeElement;
    }

    @Output()
    jigsawDragEnter: EventEmitter<DragInfo> = new EventEmitter<DragInfo>();

    @Output()
    jigsawDragLeave: EventEmitter<DragInfo> = new EventEmitter<DragInfo>();

    @Output()
    jigsawDragOver: EventEmitter<DragInfo> = new EventEmitter<DragInfo>();

    // 用drop命名会报错，可能与原生的冲突了
    @Output()
    jigsawDrop: EventEmitter<DragInfo> = new EventEmitter<DragInfo>();

    private _dragEnterHandle(event){
        /*拖拽元素进入目标元素头上的时候*/
        event.stopPropagation();
        this.jigsawDragEnter.emit(new DragInfo(this._hostElement, null, event));
        return true;
    }

    private _dragLeaveHandle(event){
        /*拖拽元素离开目标元素头上的时候*/
        event.stopPropagation();
        this.jigsawDragLeave.emit(new DragInfo(this._hostElement, null, event));
        return false;
    }

    private _dragOverHandle = (event) => {
        /*拖拽元素在目标元素头上移动的时候*/
        event.preventDefault();
        event.stopPropagation();
        this.jigsawDragOver.emit(new DragInfo(this._hostElement, null, event));
        return true;
    };

    private _dropHandle(event){
        /*拖拽元素进入目标元素头上，同时鼠标松开的时候*/
        event.stopPropagation();
        this.jigsawDrop.emit(new DragInfo(this._hostElement, null, event));
        return false;
    }

    ngOnInit(){
        this._zone.runOutsideAngular(() => {
            this._renderer.listen(this.elementRef.nativeElement, 'dragover', this._dragOverHandle)
        })
    }
}


