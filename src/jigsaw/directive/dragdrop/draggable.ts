import {Directive, ElementRef, Output, EventEmitter, NgZone, Input, OnInit, Renderer2} from "@angular/core";

export class DragInfo {
    constructor(public element: HTMLElement, public dragData: any, public event: DragEvent){}
}

@Directive({
    selector: '[jigsaw-draggable], [jigsawDraggable]',
    host: {
        '[attr.draggable]': 'true',
        '(selectstart)': '_selectStartHandle($event)',
        '(dragstart)': '_dragStartHandle($event)',
        '(dragend)': '_dragEndHandle($event)'
    }
})
export class JigsawDraggable implements OnInit {

    private _hostElement: HTMLElement;
    constructor(private _renderer: Renderer2, private elementRef: ElementRef, private _zone: NgZone) {
        this._hostElement = this.elementRef.nativeElement;
    }

    @Input()
    public dragData: any;

    @Output()
    dragStart: EventEmitter<DragInfo> = new EventEmitter<DragInfo>();

    @Output()
    dragEnd: EventEmitter<DragInfo> = new EventEmitter<DragInfo>();

    // 用drag命名会报错，可能与原生的冲突了
    @Output()
    dragging: EventEmitter<DragInfo> = new EventEmitter<DragInfo>();

    private _selectStartHandle(event) {
        return false;
    }

    private _dragStartHandle(event) {
        /*拖拽开始*/
        //拖拽效果
        event.stopPropagation();
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setDragImage(event.target, 0, 0);
        this.dragStart.emit(new DragInfo(this._hostElement, this.dragData, event));
        return true;
    }

    private _dragEndHandle(event) {
        /*拖拽结束*/
        //event.dataTransfer.clearData("text");
        event.stopPropagation();
        this.dragEnd.emit(new DragInfo(this._hostElement, this.dragData, event));
        return false
    }

    private _dragHandle = (event) => {
        /*拖拽元素的时候*/
        event.stopPropagation();
        this.dragging.emit(new DragInfo(this._hostElement, this.dragData, event));
    };

    ngOnInit() {
        this._zone.runOutsideAngular(() => {
            this._renderer.listen(this.elementRef.nativeElement, 'drag', this._dragHandle);
        })
    }

}

