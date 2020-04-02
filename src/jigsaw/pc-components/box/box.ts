import {
    AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter,
    Input, NgZone, OnDestroy, QueryList, Renderer2, ViewChild, ChangeDetectorRef,ChangeDetectionStrategy
} from "@angular/core";
import {Subscription} from "rxjs/internal/Subscription";
import {JigsawResizableBoxBase} from "./common-box";
import {CallbackRemoval} from "../../common/core/utils/common-utils";

@Component({
    selector: 'jigsaw-box, j-box',
    templateUrl: './box.html',
    host: {
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[class.jigsaw-box-flicker]': '_$isFlicker',
        '[style.width]': 'width',
        '[style.height]': 'height',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawBox extends JigsawResizableBoxBase implements AfterContentInit, AfterViewInit, OnDestroy {
    constructor(elementRef: ElementRef, renderer: Renderer2, zone: NgZone, private _cdr: ChangeDetectorRef) {
        super(elementRef, renderer, zone);
    }

    public static resizeEnd = new EventEmitter();
    public static resizeStart = new EventEmitter();
    public static viewInit = new EventEmitter();

    @Input()
    public resizable: boolean;

    public _$isFlicker: boolean = true;

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

    private _removeResizeStartListener: Subscription;
    private _removeResizeEndListener: Subscription;
    private _removeWindowResizeListener: CallbackRemoval;

    private _isCurrentResizingBox: boolean;

    private _computeResizeLineWidth() {
        if (!this._resizeLine) return;
        this.zone.runOutsideAngular(() => {
            this.callLater(() => {
                if (this.parent.direction == 'column') {
                    if (this.element.clientWidth != this._resizeLine.nativeElement.offsetWidth) {
                        this.renderer.setStyle(this._resizeLine.nativeElement, 'width', this.element.clientWidth + 'px');
                    }
                } else {
                    if (this.element.clientHeight != this._resizeLine.nativeElement.offsetHeight) {
                        this.renderer.setStyle(this._resizeLine.nativeElement, 'height', this.element.clientHeight + 'px');
                    }
                }
            });
        })
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

        this.runAfterMicrotasks(this._computeResizeLineWidth, this);

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
            this.runMicrotask(() => {
                this.renderer.setStyle(this._resizeLineParent.nativeElement, 'display', 'block');
            });
        });

        this._zone.runOutsideAngular(() => {
            this._removeWindowResizeListener = this.renderer.listen('window', 'resize', () => {
                this._computeResizeLineWidth();
            });

            this.removeElementScrollEvent = this.renderer.listen(this.element, 'scroll', () => {
                if (this._resizeLine.nativeElement.scrollTop != this.element.scrollTop) {
                    this.renderer.setStyle(this._resizeLine.nativeElement, 'top', this.element.scrollTop + 'px');
                }
                if (this._resizeLine.nativeElement.scrollLeft != this.element.scrollLeft) {
                    this.renderer.setStyle(this._resizeLine.nativeElement, 'left', this.element.scrollLeft + 'px');
                }
            });
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
            this._supportSetSize(box, this);
            if (this.resizable && index != 0 && !box._isFixedSize && !this._$childrenBox[index - 1]._isFixedSize) {
                // 第一个child box没有resize line
                // 设置了尺寸的box没有resize line
                box._$showResizeLine = true;
            }
        });

        this.runAfterMicrotasks(() => {
            this._zone.run(() => {
                this._$isFlicker = false;
                if(!this.parent) JigsawBox.viewInit.emit();
            })
        });
    }

    private _supportSetSize(box: JigsawBox, parent: JigsawBox) {
        if (!parent) return;
        if (box.width && parent.direction != 'column') {
            box.renderer.setStyle(box.element, 'flex-grow', '0');
            box.renderer.setStyle(box.element, 'flex-basis', box.width);
            box._isFixedSize = true;
        }
        if (box.height && parent.direction == 'column') {
            box.renderer.setStyle(box.element, 'flex-grow', '0');
            box.renderer.setStyle(box.element, 'flex-basis', box.height);
            box._isFixedSize = true;
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
