import {
    AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter,
    Input, NgZone, OnDestroy, QueryList, Renderer2, ViewChild
} from "@angular/core";
import {JigsawResizableBoxBase} from "./common-box";
import {CallbackRemoval} from "../../core/utils/common-utils";

@Component({
    selector: 'jigsaw-box, j-box',
    templateUrl: './box.html',
    host: {
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawBox extends JigsawResizableBoxBase implements AfterContentInit, AfterViewInit, OnDestroy {
    constructor(elementRef: ElementRef, renderer: Renderer2, zone: NgZone) {
        super(elementRef, renderer, zone);
    }

    public static resizeEnd = new EventEmitter();
    public static resizeStart = new EventEmitter();

    @Input()
    public resizable: boolean;

    /**
     * @internal
     */
    public _$showResizeLine: boolean;

    public parent: JigsawBox;

    @ContentChildren(JigsawBox)
    private _childrenBoxRaw: QueryList<JigsawBox>;

    @ViewChild('resizeLine')
    private _resizeLine: ElementRef;

    @ViewChild('resizeLineParent')
    private _resizeLineParent: ElementRef;

    /**
     * @internal
     */
    public get _$childrenBox(): JigsawBox[] {
        return <JigsawBox[]>this.childrenBox;
    }

    public set _$childrenBox(v: JigsawBox[]) {
        this.childrenBox = v;
    }

    private _removeResizeStartListener: EventEmitter<any>;
    private _removeResizeEndListener: EventEmitter<any>;
    private _removeWindowResizeListener: CallbackRemoval;

    private _isCurrentResizingBox: boolean;

    private _computeResizeLineWidth() {
        if (!this._resizeLine) return;
        this.zone.runOutsideAngular(() => {
            if (this.parent.direction == 'column') {
                this.renderer.setStyle(this._resizeLine.nativeElement, 'width', this.element.offsetWidth - 2 + 'px');
            } else {
                this.renderer.setStyle(this._resizeLine.nativeElement, 'height', this.element.offsetHeight - 2 + 'px');
            }
        });
    }

    /**
     * @internal
     */
    public _$handleResizeStart(event) {
        super._$handleResizeStart(event);
        this._isCurrentResizingBox = true;
        JigsawBox.resizeStart.emit();
        this._emitResizeEvent('resizeStart');
    }

    /**
     * @internal
     */
    public _$handleResizeEnd() {
        JigsawBox.resizeEnd.emit();
        this._isCurrentResizingBox = false;
        this._emitResizeEvent('resize');
    }

    private _emitResizeEvent(eventType: string) {
        this[eventType].emit(this);
        if (this.parent && this.parent.resizable && this.parent._$childrenBox.length) {
            const index = this.parent._$childrenBox.findIndex(box => box == this);
            const previousBox = this.parent._$childrenBox[index - 1];
            if (previousBox) {
                previousBox[eventType].emit(previousBox);
            }
        }
    }

    ngAfterViewInit() {
        // resize line 视图渲染完成
        if (!this._resizeLine) return;

        setTimeout(() => {
            // 等待box视图渲染
            this._computeResizeLineWidth();
        });

        this._removeAllListener();

        this._removeResizeStartListener = JigsawBox.resizeStart.subscribe(() => {
            if (this._isCurrentResizingBox || !this._resizeLineParent) return;
            // 兼容IE,去掉resize过程中产生的莫名滚动条
            this.renderer.setStyle(this._resizeLineParent.nativeElement, 'display', 'none');
        });

        this._removeResizeEndListener = JigsawBox.resizeEnd.subscribe(() => {
            this._computeResizeLineWidth();

            if (!this._resizeLineParent) return;
            // 兼容IE,去掉resize过程中产生的莫名滚动条
            if (this._isCurrentResizingBox) {
                this.renderer.setStyle(this._resizeLineParent.nativeElement, 'display', 'none');
            }
            setTimeout(() => {
                this.renderer.setStyle(this._resizeLineParent.nativeElement, 'display', 'block');
            });
        });

        this._removeWindowResizeListener = this.renderer.listen('window', 'resize', () => {
            this._computeResizeLineWidth();
        });

        this.removeElementScrollEvent = this.renderer.listen(this.element, 'scroll', () => {
            this.renderer.setStyle(this._resizeLine.nativeElement, 'top', this.element.scrollTop + 'px');
            this.renderer.setStyle(this._resizeLine.nativeElement, 'left', this.element.scrollLeft + 'px');
        });
    }

    ngAfterContentInit() {
        // 映射同一组件实例，ContentChildren会包含自己，https://github.com/angular/angular/issues/21148
        this._$childrenBox = this._childrenBoxRaw.filter(box => box != this);
        this.checkFlex();
        this.removeBoxChangeListener = this._childrenBoxRaw.changes.subscribe(() => {
            this._$childrenBox = this._childrenBoxRaw.filter(box => box != this);
            this.checkFlexByChildren();
        });

        this._$childrenBox.forEach((box, index) => {
            box.parent = this;
            if (this.resizable && index != 0) {
                // 第一个child box没有resize line
                box._$showResizeLine = true;
            }
            this._supportSetSize(box, this);
        });
    }

    private _supportSetSize(box: JigsawBox, parent: JigsawBox) {
        if (!parent) return;
        if (box.width && parent.direction != 'column') {
            box.renderer.setStyle(box.element, 'flex-grow', '0');
            box.renderer.setStyle(box.element, 'flex-basis', box.width);
        }
        if (box.height && parent.direction == 'column') {
            box.renderer.setStyle(box.element, 'flex-grow', '0');
            box.renderer.setStyle(box.element, 'flex-basis', box.height);
        }
    }

    private _removeAllListener() {
        if (this._removeResizeStartListener) {
            this._removeResizeStartListener.unsubscribe();
            this._removeResizeStartListener = null;
        }
        if (this._removeResizeEndListener) {
            this._removeResizeEndListener.unsubscribe();
            this._removeResizeEndListener = null;
        }
        if (this._removeWindowResizeListener) {
            this._removeWindowResizeListener();
            this._removeWindowResizeListener = null;
        }
        if (this.removeElementScrollEvent) {
            this.removeElementScrollEvent();
            this.removeElementScrollEvent = null;
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._removeAllListener();
    }
}
