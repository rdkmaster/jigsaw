import {Directive, ElementRef, Output, EventEmitter, NgZone, OnInit, Renderer2, OnDestroy} from "@angular/core";
import {DragDropInfo} from "./index";
import {CallbackRemoval} from "../../core/utils/common-utils";

@Directive({
    selector: '[jigsaw-droppable], [jigsawDroppable]',
    host: {
        '(dragenter)': '_dragEnterHandle($event)',
        '(dragleave)': '_dragLeaveHandle($event)',
        '(drop)': '_dropHandle($event)'
    }
})
export class JigsawDroppable implements OnInit, OnDestroy {
    /**
     * jigsawDragEnter、jigsawDragLeave、jigsawDrop 有可能是其子元素触发的，所以有必要保存elementRef
     *
     * @param {Renderer2} _renderer
     * @param {ElementRef} _elementRef
     * @param {NgZone} _zone
     */
    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _zone: NgZone) {
    }

    @Output()
    public jigsawDragEnter: EventEmitter<DragDropInfo> = new EventEmitter<DragDropInfo>();

    @Output()
    public jigsawDragLeave: EventEmitter<DragDropInfo> = new EventEmitter<DragDropInfo>();

    @Output()
    public jigsawDragOver: EventEmitter<DragDropInfo> = new EventEmitter<DragDropInfo>();

    @Output()
    public jigsawDrop: EventEmitter<DragDropInfo> = new EventEmitter<DragDropInfo>();

    private _dragEnterHandle(event) {
        /*拖拽元素进入目标元素头上的时候*/
        event.stopPropagation();
        this.jigsawDragEnter.emit(new DragDropInfo(event, this._elementRef.nativeElement));
        return true;
    }

    private _dragLeaveHandle(event) {
        /*拖拽元素离开目标元素头上的时候*/
        event.stopPropagation();
        this.jigsawDragLeave.emit(new DragDropInfo(event, this._elementRef.nativeElement));
        return false;
    }

    private _dragOverHandle = (event) => {
        /*拖拽元素在目标元素头上移动的时候*/
        event.preventDefault();
        event.stopPropagation();
        this.jigsawDragOver.emit(new DragDropInfo(event, this._elementRef.nativeElement));
        return true;
    };

    private _dropHandle(event) {
        /*拖拽元素进入目标元素头上，同时鼠标松开的时候*/
        event.stopPropagation();
        this.jigsawDrop.emit(new DragDropInfo(event, this._elementRef.nativeElement));
        return false;
    }

    private _removeDragOverHandler:CallbackRemoval;

    ngOnInit() {
        this._zone.runOutsideAngular(() => {
            this._removeDragOverHandler = this._renderer.listen(
                this._elementRef.nativeElement, 'dragover', this._dragOverHandle)
        })
    }

    ngOnDestroy() {
        if (this._removeDragOverHandler) {
            this._removeDragOverHandler();
        }
    }
}


