import {JigsawBox} from "./box";
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Renderer2,
    NgZone,
    ChangeDetectorRef,
    ContentChildren,
    QueryList,
    ViewChild,
    Injector,
    Input,
    ViewContainerRef
} from '@angular/core';
import {CommonUtils} from "../../common/core/utils/common-utils";

export type BoxInsertInfo = { parent: JigsawEditableBox, before?: JigsawEditableBox, reverse?: 'before' | 'after' };

@Component({
    selector: 'jigsaw-editable-box, j-editable-box',
    templateUrl: './editable-box.html',
    host: {
        '[class.jigsaw-editable-box]': 'true',
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[class.jigsaw-box-flicker]': '_$isFlicker',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.padding]': 'padding'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawEditableBox extends JigsawBox {

    constructor(elementRef: ElementRef, renderer: Renderer2, zone: NgZone,
                /**
                 * @internal
                 */
                public _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super(elementRef, renderer, zone, _cdr);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public resizable: boolean = true;

    private _gap: string;
    /**
     * 设置内容box的间隙
     */
    @Input()
    public get gap(): string {
        return this._gap;
    }

    public set gap(value: string) {
        this._gap = CommonUtils.getCssValue(value);
    }

    private _margin: string;
    /**
     * 设置当前box的外边距
     */
    @Input()
    public get margin(): string {
        return this._margin;
    }

    public set margin(value: string) {
        this._margin = String(value).split(/\s+/).map(m => CommonUtils.getCssValue(m)).join(' ');
        this.element.style.margin = this._margin;
    }

    private _padding: string;
    /**
     * 设置当前box的内边距
     */
    @Input()
    public get padding(): string {
        return this._padding;
    }

    public set padding(value: string) {
        this._padding = String(value).split(/\s+/).map(m => CommonUtils.getCssValue(m)).join(' ');
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public resizeStep: number = 8;

    @ViewChild("renderPoint", {read: ViewContainerRef})
    public renderPoint: ViewContainerRef;

    /**
     * @internal
     */
    public _scale: number[] = [];

    private static readonly _insertGap: number = 12;

    private static readonly _insertLineWidth: number = 4;

    private _laying: boolean;

    public set laying(value: boolean) {
        if (this._laying == value) {
            return;
        }
        this._laying = value;
        this._setLayout(value);
    }

    private _setLayout(laying: boolean) {
        if (laying) {
            let scalePX = JigsawEditableBox._insertGap * 2;
            const [width, height] = [this.element.offsetWidth, this.element.offsetHeight];
            // 防止宽高比insert gap还要小
            this._scale = [Math.max(0, 1 - scalePX / width), Math.max(0, 1 - scalePX / height)];
            this.renderer.setStyle(this.element, 'transform', `scale(${this._scale[0]}, ${this._scale[1]})`);
        } else {
            this.renderer.removeStyle(this.element, 'transform');
            this._scale = [];
        }
    }

    @ContentChildren(JigsawEditableBox)
    protected _childrenBoxRaw: QueryList<JigsawEditableBox>;

    @ViewChild('insertLine')
    private _insertLine: ElementRef;

    /**
     * @internal
     */
    public parent: JigsawEditableBox;

    @ContentChildren(JigsawEditableBox)
    protected childrenBox: QueryList<JigsawEditableBox>;

    /**
     * @internal
     */
    public _$childrenBox: JigsawEditableBox[];

    public static getBoxRealRect(box: JigsawEditableBox) {
        // DOMRect对象中有只读属性，无法通过Object.assign或结构复制对象
        const rect = box.element.getBoundingClientRect();
        const realRect = {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom
        };
        if (box.parent) {
            // 滚动条的情况处理
            const parentRect = box.parent.element.getBoundingClientRect();
            realRect.left = Math.max(rect.left, parentRect.left);
            realRect.top = Math.max(rect.top, parentRect.top);
            realRect.right = Math.min(rect.right, parentRect.right);
            realRect.bottom = Math.min(rect.bottom, parentRect.bottom);
        }
        return realRect;
    }

    protected _setChildrenBox() {
        if (!this._$childrenBox) {
            return;
        }
        this._$childrenBox.forEach((box, index) => {
            box.parent = this;
            this._supportSetSize(box, this);
            if (this.resizable && index != 0) {
                // 第一个child box没有resize line
                // 设置了尺寸的editable box也是需要resize line，用于调整尺寸
                // 异步消除变更检查报错
                this.runMicrotask(() => {
                    box.showResizeLine = true;
                    box._cdr.markForCheck();
                });
                this.runAfterMicrotasks(() => {
                    this._setResizeLineOffset(box, index);
                    this.element.insertBefore(box._resizeLineParent.nativeElement, box.element);
                })
            }
        });
        if (!this._$childrenBox || !this.gap) {
            return;
        }
        this._$childrenBox.forEach((box, index) => {
            if (box.margin) {
                // 自身通过输入属性设置过margin，就不通过gap设置
                return;
            }
            box.element.style.margin = index == this._$childrenBox.length - 1 ? `0` : this.direction == 'column' ? `0 0 ${this.gap} 0` : `0 ${this.gap} 0 0`;
        })
    }

    private _setResizeLineOffset(box: JigsawEditableBox, index) {
        const resizeLineWidth = 3;
        const parentBox = box.parent;
        const prevBox = parentBox._$childrenBox[index - 1];
        const offsetParam = parentBox.direction == 'column' ? 'top' : 'left';
        const prevGapParam = parentBox.direction == 'column' ? 'marginBottom' : 'marginRight';
        const curGapParam = parentBox.direction == 'column' ? 'marginTop' : 'marginLeft';
        const gapSize = Number(getComputedStyle(prevBox.element)[prevGapParam].replace('px', '')) +
            Number(getComputedStyle(box.element)[curGapParam].replace('px', ''));
        box._resizeLineParent.nativeElement.style[offsetParam] = - (gapSize + resizeLineWidth) / 2 + 'px';
    }

    protected _computeResizeLineWidth() {
        this.renderer.setStyle(this._resizeLine.nativeElement, this.parent.direction == 'column' ? 'width' : 'height', '100%');
    }

    public setResizeLineSize() {
        return;
    }

    private _insertTimer: number;

    public showInertLine(laying: boolean, mousePos?: { x: number, y: number }): BoxInsertInfo {
        if (laying) {
            this.renderer.addClass(this.element, 'jigsaw-editable-box-inserting')
        } else {
            this.renderer.removeClass(this.element, 'jigsaw-editable-box-inserting')
        }
        if (!laying || !mousePos) {
            clearTimeout(this._insertTimer);
            this.renderer.setStyle(this._insertLine.nativeElement, 'display', 'none');
            return;
        }
        const reverseInsertResult = this._reverseInsert(mousePos);
        if (reverseInsertResult) {
            return reverseInsertResult
        }
        return this._normalInsert(mousePos);
    }

    /**
     * 判断插入方向，如果和父box不是一个方向，则分'before', 'after'
     * @private
     */
    private _reverseInsert(mousePos: { x: number, y: number }): BoxInsertInfo {
        let insertPos: 'before' | 'after';
        let lineOffset: number;
        if (!this._$childrenBox.length) {
            return null;
        }

        const insertLineScaleWidth = this._getInsertLineScaleWidth(true);
        const parentBoxScrollOffset = (this.direction == 'column' ? this.element.scrollLeft : this.element.scrollTop) * this._getDirectScale(true);
        const firstChildRect = this._$childrenBox[0].element.getBoundingClientRect();
        const parentRect = this.element.getBoundingClientRect();
        if (!this.direction || this.direction == 'row') {
            if (mousePos.y < firstChildRect.top) {
                insertPos = 'before';
                lineOffset = (firstChildRect.top - parentRect.top - insertLineScaleWidth) / 2 + parentBoxScrollOffset;
            } else if (mousePos.y > firstChildRect.bottom) {
                insertPos = 'after';
                lineOffset = firstChildRect.bottom - parentRect.top + (parentRect.bottom - firstChildRect.bottom - insertLineScaleWidth) / 2 + parentBoxScrollOffset;
            }
        } else if (this.direction == 'column') {
            if (mousePos.x < firstChildRect.left) {
                insertPos = 'before';
                lineOffset = (firstChildRect.left - parentRect.left - insertLineScaleWidth) / 2 + parentBoxScrollOffset;
            } else if (mousePos.x > firstChildRect.right) {
                insertPos = 'after';
                lineOffset = firstChildRect.right - parentRect.left + (parentRect.right - firstChildRect.right - insertLineScaleWidth) / 2 + parentBoxScrollOffset;
            }
        }

        if (!insertPos) {
            return null;
        }

        this._insertTimer = this.callLater(() => {
            if (this.direction == 'column') {
                this.renderer.removeClass(this._insertLine.nativeElement, 'jigsaw-editable-box-insert-line-column');
            } else {
                this.renderer.addClass(this._insertLine.nativeElement, 'jigsaw-editable-box-insert-line-column');
            }
            // offset值需要设置缩放之前的值
            this.renderer.setStyle(this._insertLine.nativeElement, this.direction == 'column' ? 'left' : 'top', lineOffset / this._getDirectScale(true) + 'px');
            this.renderer.setStyle(this._insertLine.nativeElement, this.direction == 'column' ? 'top' : 'left', (this.direction == 'column' ? this.element.scrollTop : this.element.scrollLeft) + 'px');
            this.renderer.setStyle(this._insertLine.nativeElement, 'display', 'block');
        }, 350);

        return {
            parent: this,
            reverse: insertPos
        };
    }

    private _normalInsert(mousePos: { x: number, y: number }) {
        const posProp = this.direction == 'column' ? 'y' : 'x';
        const sizeProp = this.direction == 'column' ? 'height' : 'width';
        const mouseDirectPos = mousePos[posProp];
        // 获取鼠标后面box的下标
        const endBoxIndex = this._$childrenBox.findIndex(childBox => {
            const childBoxRect = childBox.element.getBoundingClientRect();
            return childBoxRect[posProp] > mouseDirectPos
        });
        const boxInsertBefore = endBoxIndex >= 0 ? this._$childrenBox[endBoxIndex] : null;
        // 计算插入线的位置，有缩放动画，需要延迟
        this._insertTimer = this.callLater(() => {
            if (this.direction == 'column') {
                this.renderer.addClass(this._insertLine.nativeElement, 'jigsaw-editable-box-insert-line-column');
            } else {
                this.renderer.removeClass(this._insertLine.nativeElement, 'jigsaw-editable-box-insert-line-column');
            }
            const insertOffset = this._getInsertOffset(endBoxIndex, posProp, sizeProp);
            // offset值需要设置缩放之前的值
            this.renderer.setStyle(this._insertLine.nativeElement, this.direction == 'column' ? 'top' : 'left', insertOffset / this._getDirectScale() + 'px');
            this.renderer.setStyle(this._insertLine.nativeElement, this.direction == 'column' ? 'left' : 'top', (this.direction == 'column' ? this.element.scrollLeft : this.element.scrollTop) + 'px');
            this.renderer.setStyle(this._insertLine.nativeElement, 'display', 'block');
        }, 350);
        return {
            parent: this,
            before: boxInsertBefore
        };
    }

    private _getInsertOffset(endBoxIndex: number, posProp: string, sizeProp: string): number {
        const insertLineScaleWidth = this._getInsertLineScaleWidth();
        let insertOffset = 0;
        const parentBoxRect = this.element.getBoundingClientRect();
        // 滚动距离需要添加缩放
        const parentBoxScrollOffset = (this.direction == 'column' ? this.element.scrollTop : this.element.scrollLeft) * this._getDirectScale();
        if (endBoxIndex == 0) {
            // 插在最前面
            const endBoxRect = this._$childrenBox[endBoxIndex].element.getBoundingClientRect();
            insertOffset = (endBoxRect[posProp] - parentBoxRect[posProp] - insertLineScaleWidth) / 2;
        } else if (endBoxIndex < 0) {
            // 插在最后面
            if (this._$childrenBox.length) {
                const startBoxRect = this._$childrenBox[this._$childrenBox.length - 1].element.getBoundingClientRect();
                const startBoxSizePos = startBoxRect[posProp] + startBoxRect[sizeProp];
                insertOffset = startBoxSizePos - parentBoxRect[posProp] + (parentBoxRect[posProp] + parentBoxRect[sizeProp] - startBoxSizePos - insertLineScaleWidth) / 2;
            } else {
                //没有子集则居中显示
                insertOffset = (parentBoxRect[sizeProp] - insertLineScaleWidth) / 2;
            }
        } else {
            // 插在中间
            const startBoxRect = this._$childrenBox[endBoxIndex - 1].element.getBoundingClientRect();
            const endBoxRect = this._$childrenBox[endBoxIndex].element.getBoundingClientRect();
            const startBoxSizePos = startBoxRect[posProp] + startBoxRect[sizeProp];
            insertOffset = startBoxSizePos - parentBoxRect[posProp] + (endBoxRect[posProp] - startBoxSizePos - insertLineScaleWidth) / 2;
        }
        return insertOffset + parentBoxScrollOffset;
    }

    private _getInsertLineScaleWidth(reverse: boolean = false) {
        return JigsawEditableBox._insertLineWidth * this._getDirectScale(reverse);
    }

    private _getDirectScale(reverse: boolean = false, scale: number = 1, box: JigsawEditableBox = this) {
        // 两层缩放比例
        scale = scale * this._getBoxDirectScale(box, reverse);
        return box.parent ? this._getDirectScale(reverse, scale, box.parent) : scale;
    }

    private _getBoxDirectScale(box: JigsawEditableBox, reverse: boolean = false) {
        if (!box || !box._scale.length) {
            return 1;
        }
        // 获取同一方向的缩放
        if (reverse) {
            return this.direction == 'column' ? box._scale[0] : box._scale[1];
        } else {
            return this.direction == 'column' ? box._scale[1] : box._scale[0];
        }
    }

    private _computeSizeRatios_(sizeProp: string, updateOffset: number): [number[], number[]] {
        const curIndex = this._getCurrentIndex();
        this._rawOffsets.splice(curIndex, 1, updateOffset);

        const sizes = this._rawOffsets.reduce((ss, offset, index) => {
            if (index > 0) {
                ss.push(offset - this._rawOffsets[index - 1])
            }
            return ss;
        }, []);
        // 根据padding/gap/border纠正尺寸
        const length = this.parent._$childrenBox.length;
        const parentStyle = getComputedStyle(this.parent.element);
        const [parentPaddingTop, parentPaddingBottom, parentPaddingLeft, parentPaddingRight] = [
            this._pxToNumber(parentStyle.paddingTop) + this._pxToNumber(parentStyle.borderTopWidth),
            this._pxToNumber(parentStyle.paddingBottom) + this._pxToNumber(parentStyle.borderBottomWidth),
            this._pxToNumber(parentStyle.paddingLeft) + this._pxToNumber(parentStyle.borderLeftWidth),
            this._pxToNumber(parentStyle.paddingRight) + this._pxToNumber(parentStyle.borderRightWidth)
        ];
        this.parent._$childrenBox.forEach((box, index) => {
            let paddingSize = 0, marginSize = 0, borderSize = 0, parentPaddingSize = 0;
            const boxStyle = getComputedStyle(box.element);
            if (this.parent.direction == 'column') {
                parentPaddingSize = index == 0 ? parentPaddingTop : index == length - 1 ? parentPaddingBottom : 0;
                paddingSize = this._pxToNumber(boxStyle.paddingTop) + this._pxToNumber(boxStyle.paddingBottom);
                marginSize = this._pxToNumber(boxStyle.marginTop) + this._pxToNumber(boxStyle.marginBottom);
                borderSize = this._pxToNumber(boxStyle.borderTopWidth) + this._pxToNumber(boxStyle.borderBottomWidth);
            } else {
                parentPaddingSize = index == 0 ? parentPaddingLeft : index == length - 1 ? parentPaddingRight : 0;
                paddingSize = this._pxToNumber(boxStyle.paddingLeft) + this._pxToNumber(boxStyle.paddingRight);
                marginSize = this._pxToNumber(boxStyle.marginLeft) + this._pxToNumber(boxStyle.marginRight);
                borderSize = this._pxToNumber(boxStyle.borderLeftWidth) + this._pxToNumber(boxStyle.borderRightWidth);
            }
            // 计算grow或basis要剔除边框、内边距、外边距的尺寸才能计算准确
            sizes[index] = sizes[index] - parentPaddingSize - paddingSize - marginSize - borderSize;
        });
        return [sizes, sizes.map(size => size / this.parent.element[sizeProp] * 100)];
    }

    public _$handleResize(offset: number, emitEvent: boolean = false) {
        if (!this.parent) return;

        const sizeProp = this._getPropertyByDirection()[1];
        const [sizes, sizeRatios] = this._computeSizeRatios_(sizeProp, offset);
        this.parent._$childrenBox.forEach((box, index) => {
            if (box._isFixedSize) {
                // 固定尺寸的设置basis，而不是grow
                box.element.style.flexBasis = sizes[index] + 'px';
                box.element.style.flexGrow = '0';
            } else {
                box.grow = sizeRatios[index];
                box.growChange.emit(sizeRatios[index]);
            }
        });
    }

    protected _emitResizeEvent(eventType: string) {
        if (eventType == 'resize') {
            if (this.parent && this.parent.resizable && this.parent._$childrenBox.length) {
                // editable box需要在resize结束后所有的子级box发送事件，以可以保存grow的值
                this.parent._$childrenBox.forEach(box => box[eventType].emit(box));
            }
        } else {
            this[eventType].emit(this);
            if (this.parent && this.parent.resizable && this.parent._$childrenBox.length) {
                const index = this.parent._$childrenBox.findIndex(box => box == this);
                const previousBox = this.parent._$childrenBox[index - 1];
                if (previousBox) {
                    previousBox[eventType].emit(previousBox);
                }
            }
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._resizeLineParent) {
            this._resizeLineParent.nativeElement.remove();
        }
    }
}
