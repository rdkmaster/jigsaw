import {Directive, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, Renderer2} from "@angular/core";
import {DragDropInfo} from "./types";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";

@Directive({
    selector: '[jigsaw-draggable], [jigsawDraggable], [j-draggable]',
    host: {
        '[attr.draggable]': 'true',
        '(selectstart)': '_selectStartHandle($event)',
        '(dragstart)': '_dragStartHandle($event)',
        '(dragend)': '_dragEndHandle($event)',
        '(mousedown)': '_mouseDownHandle($event)'
    }
})
export class JigsawDraggable implements OnInit, OnDestroy {
    constructor(private _renderer: Renderer2, private _elementRef: ElementRef, private _zone: NgZone) {
    }

    @Output()
    public jigsawDragStart: EventEmitter<DragDropInfo> = new EventEmitter<DragDropInfo>();

    @Output()
    public jigsawDragEnd: EventEmitter<DragDropInfo> = new EventEmitter<DragDropInfo>();

    @Output()
    public jigsawDrag: EventEmitter<DragDropInfo> = new EventEmitter<DragDropInfo>();

    private _selectStartHandle(event) {
        return false;
    }

    private _offsetX: number = 0;
    private _offsetY: number = 0;

    /**
     * dragstart给的事件的offsetX和offsetY不准确，通过mousedown事件来弥补
     * @param event
     * @private
     */
    private _mouseDownHandle(event) {
        this._offsetX = event.offsetY;
        this._offsetY = event.offsetY;
    }

    private _dragStartHandle(event) {
        /*拖拽开始*/
        //拖拽效果
        event.stopPropagation();
        event.dataTransfer.effectAllowed = 'move';
        // 给非IE浏览器设置拖拽图片
        console.log(window.navigator.userAgent);
        console.log(navigator.userAgent);
        if (!CommonUtils.isIE()) {
            event.dataTransfer.setDragImage(event.target, this._offsetX, this._offsetY);
        }
        this.jigsawDragStart.emit(new DragDropInfo(event, this._elementRef.nativeElement));
        return true;
    }

    private _dragEndHandle(event) {
        /*拖拽结束*/
        //event.dataTransfer.clearData("text");
        event.stopPropagation();
        this.jigsawDragEnd.emit(new DragDropInfo(event, this._elementRef.nativeElement));
        return false
    }

    private _dragHandle = (event) => {
        /*拖拽元素的时候*/
        event.stopPropagation();
        this.jigsawDrag.emit(new DragDropInfo(event, this._elementRef.nativeElement));
    };

    private _removeDragHandler: CallbackRemoval;

    ngOnInit() {
        this._zone.runOutsideAngular(() => {
            this._removeDragHandler = this._renderer.listen(
                this._elementRef.nativeElement, 'drag', this._dragHandle);
        })
    }

    ngOnDestroy() {
        if (this._removeDragHandler) {
            this._removeDragHandler();
        }
    }

}

