import {
    AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter,
    Input, NgZone, OnDestroy, QueryList, Renderer2, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef
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
export class JigsawBox extends JigsawResizableBoxBase implements AfterContentInit, OnDestroy {
    constructor(elementRef: ElementRef, renderer: Renderer2, zone: NgZone,
                /**
                 * @internal
                 */
                public _cdr: ChangeDetectorRef) {
        super(elementRef, renderer, zone);
    }

    public static resizeEnd = new EventEmitter();
    public static resizeStart = new EventEmitter();
    public static viewInit = new EventEmitter();

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public resizable: boolean;

    /**
     * @internal
     */
    public _$isFlicker: boolean = true;

    /**
     * @internal
     */
    public _$showResizeLine: boolean;

    /**
     * @internal
     */
    public set showResizeLine(value: boolean) {
        this._$showResizeLine = value;
        this._removeAllResizeLineListener();
        if (!value) {
            return;
        }
        this._listenResizeLineEvent();
    }

    /**
     * @internal
     */
    public parent: JigsawBox;

    @ViewChild('resizeLine')
    protected _resizeLine: ElementRef;

    @ViewChild('resizeLineParent')
    protected _resizeLineParent: ElementRef;

    /**
     * @internal
     */
    @ContentChildren(JigsawBox)
    protected childrenBox: QueryList<JigsawBox>;

    /**
     * @internal
     */
    public _$childrenBox: JigsawBox[];

    private _removeResizeStartListener: Subscription;
    private _removeResizeEndListener: Subscription;
    private _removeWindowResizeListener: CallbackRemoval;

    private _isCurrentResizingBox: boolean;

    protected _computeResizeLineWidth() {
        if (!this._resizeLine) return;
        this.zone.runOutsideAngular(() => {
            if (this.parent.direction == 'column') {
                if (this.element.clientWidth != this._resizeLine.nativeElement.offsetWidth) {
                    // 2px用于消除四舍五入的偏差
                    this.renderer.setStyle(this._resizeLine.nativeElement, 'width', this.element.clientWidth - 2 + 'px');
                }
            } else {
                if (this.element.clientHeight != this._resizeLine.nativeElement.offsetHeight) {
                    // 2px用于消除四舍五入的偏差
                    this.renderer.setStyle(this._resizeLine.nativeElement, 'height', this.element.clientHeight - 2 + 'px');
                }
            }
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

    protected _emitResizeEvent(eventType: string) {
        this[eventType].emit(this);
        if (this.parent && this.parent.resizable && this.parent._$childrenBox.length) {
            const index = this.parent._$childrenBox.findIndex(box => box == this);
            const previousBox = this.parent._$childrenBox[index - 1];
            if (previousBox) {
                previousBox[eventType].emit(previousBox);
            }
        }
    }

    ngAfterContentInit() {
        // 映射同一组件实例，ContentChildren会包含自己，https://github.com/angular/angular/issues/21148
        this._$childrenBox = this.childrenBox.toArray();
        this.checkFlex();
        this._setChildrenBox();
        this.removeBoxChangeListener = this.childrenBox.changes.subscribe(() => {
            this._$childrenBox = this.childrenBox.toArray();
            this.checkFlexByChildren();
            this._setChildrenBox();
            this.runAfterMicrotasks(() => {
                // 根据是否有parent判断当前是否根节点，这里需要异步才能判断
                if (!this.parent) {
                    this.setResizeLineSize();
                }
            });
        });
        this.runAfterMicrotasks(() => {
            this._zone.run(() => {
                this._$isFlicker = false;
                // 根据是否有parent判断当前是否根节点，这里需要异步才能判断
                if (!this.parent) {
                    JigsawBox.viewInit.emit();
                    this.runAfterMicrotasks(() => {
                        this.setResizeLineSize();
                    });
                }
                this._cdr.markForCheck();
            });
        });
    }

    protected _setChildrenBox() {
        if (!this._$childrenBox) {
            return;
        }
        this._$childrenBox.forEach((box, index) => {
            box.parent = this;
            this._supportSetSize(box, this);
            if (this.resizable && index != 0 && !box._isFixedSize && !this._$childrenBox[index - 1]._isFixedSize) {
                // 第一个child box没有resize line
                // 设置了尺寸的box没有resize line
                // 异步消除变更检查报错
                this.runMicrotask(() => {
                    box.showResizeLine = true;
                    box._cdr.markForCheck();
                });
            }
        });
    }

    /**
     * @internal
     * 页面初始化之后从根节点开始向下递归修改 resize line 的尺寸
     */
    public setResizeLineSize() {
        this._computeResizeLineWidth();
        if (!this._$childrenBox) {
            return;
        }
        this._$childrenBox.forEach(box => {
            box.setResizeLineSize();
        });
    }

    protected _supportSetSize(box: JigsawBox, parent: JigsawBox) {
        if (!parent) return;
        if (box.width && parent.direction != 'column') {
            // 同步grow属性
            box.grow = 0;
            box.renderer.setStyle(box.element, 'flex-grow', '0');
            box.renderer.setStyle(box.element, 'flex-basis', box.width);
            box._isFixedSize = true;
        }
        if (box.height && parent.direction == 'column') {
            box.grow = 0;
            box.renderer.setStyle(box.element, 'flex-grow', '0');
            box.renderer.setStyle(box.element, 'flex-basis', box.height);
            box._isFixedSize = true;
        }
    }

    private _listenResizeLineEvent() {
        this._removeResizeStartListener = JigsawBox.resizeStart.subscribe(() => {
            if (this._isCurrentResizingBox || !this._resizeLineParent || !this._resizeLine) return;
            // 兼容IE,去掉resize过程中产生的莫名滚动条
            this.renderer.setStyle(this._resizeLineParent.nativeElement, 'display', 'none');
            // 设置成0，防止出现滚动条
            this.renderer.setStyle(this._resizeLine.nativeElement, this.parent.direction == 'column' ? 'width' : 'height', 0);
        });

        this._removeResizeEndListener = JigsawBox.resizeEnd.subscribe(() => {
            this._computeResizeLineWidth();
            if (!this._resizeLineParent) {
                return;
            }
            const resizeLineWrapper: HTMLElement = this._resizeLineParent.nativeElement;
            // 兼容IE,去掉resize过程中产生的莫名滚动条
            if (this._isCurrentResizingBox) {
                this.renderer.setStyle(resizeLineWrapper, 'display', 'none');
            }
            this.runMicrotask(() => {
                this.renderer.setStyle(resizeLineWrapper, 'display', 'block');
            });
        });

        this._zone.runOutsideAngular(() => {
            this._removeWindowResizeListener = this.renderer.listen('window', 'resize', () => {
                this._computeResizeLineWidth();
            });
            this.removeElementScrollEvent = this.renderer.listen(this.element, 'scroll', () => {
                if (!this._resizeLine) {
                    return;
                }
                const resizeLine: HTMLElement = this._resizeLine.nativeElement;
                if (this._pxToNumber(getComputedStyle(resizeLine).top) != this.element.scrollTop) {
                    this.renderer.setStyle(resizeLine, 'top', this.element.scrollTop + 'px');
                }
                if (this._pxToNumber(getComputedStyle(resizeLine).left) != this.element.scrollLeft) {
                    this.renderer.setStyle(resizeLine, 'left', this.element.scrollLeft + 'px');
                }
            });
        });
    }

    private _removeAllResizeLineListener() {
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
        this._removeAllResizeLineListener();
    }
}
