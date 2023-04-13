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
import {JigsawBox} from "./box";
import {CommonUtils} from "../../common/core/utils/common-utils";

export type BoxInsertPosition = { parent: JigsawEditableBox, before?: JigsawEditableBox, reverse?: 'before' | 'after' };

const insertionGap: number = 12;
const insertionLineWidth: number = 4;

export function getBoxRealRect(box: JigsawEditableBox) {
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
     * @NoMarkForCheckRequired
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
     * @NoMarkForCheckRequired
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
     * @NoMarkForCheckRequired
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

    @Input()
    public isEditing: boolean = true;

    @ViewChild("renderPoint", {read: ViewContainerRef})
    public renderPoint: ViewContainerRef;

    /**
     * @internal
     */
    public _scale: number[] = [];

    private _inserting: boolean;

    public set inserting(value: boolean) {
        if (this._inserting == value) {
            return;
        }
        this._inserting = value;
        this._setLayout(value);
    }

    private _setLayout(inserting: boolean) {
        if (inserting) {
            const scalePX = insertionGap * 2;
            const [width, height] = [this.element.offsetWidth, this.element.offsetHeight];
            // 防止宽高比insert gap还要小
            this._scale = [Math.max(0, 1 - scalePX / width), Math.max(0, 1 - scalePX / height)];
            this.renderer.setStyle(this.element, 'transform', `scale(${this._scale[0]}, ${this._scale[1]})`);
        } else {
            this.renderer.removeStyle(this.element, 'transform');
            this._scale = [];
        }
    }

    @ViewChild('insertionLine')
    private _insertionLine: ElementRef;

    public parent: JigsawEditableBox;

    @ContentChildren(JigsawEditableBox)
    protected childrenBox: QueryList<JigsawEditableBox>;

    /**
     * @internal
     */
    public _$childrenBox: JigsawEditableBox[];

    protected _setChildrenBox() {
        if (!this._$childrenBox) {
            return;
        }
        this._$childrenBox.forEach((box, index) => {
            box.parent = this;
            this._supportSetSize(box, this);
            // 非编辑状态下的固定尺寸box需要隐藏resize line
            const isFixedBoxForDisplay = !box.isEditing && (box._isFixedSize || this._$childrenBox?.[index - 1]?._isFixedSize);
            if (this.resizable && index != 0 && !isFixedBoxForDisplay) {
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
        this._$childrenBox
            // 自身通过输入属性设置过margin，就不通过gap设置
            .filter(box => !box.margin)
            .forEach((box, index) => {
                box.element.style.margin = index == this._$childrenBox.length - 1 ? `0` :
                    this.direction == 'column' ? `0 0 ${this.gap} 0` : `0 ${this.gap} 0 0`;
            });
    }

    private _setResizeLineOffset(box: JigsawEditableBox, index: number): void {
        const resizeLineWidth = 3;
        const parentBox = box.parent;
        const prevBox = parentBox._$childrenBox[index - 1];
        const offsetParam = parentBox.direction == 'column' ? 'top' : 'left';
        const prevGapParam = parentBox.direction == 'column' ? 'marginBottom' : 'marginRight';
        const curGapParam = parentBox.direction == 'column' ? 'marginTop' : 'marginLeft';
        const gapSize = this._pxToNumber(getComputedStyle(prevBox.element)[prevGapParam]) +
            this._pxToNumber(getComputedStyle(box.element)[curGapParam]);
        box._resizeLineParent.nativeElement.style[offsetParam] = - (gapSize + resizeLineWidth) / 2 + 'px';
    }

    protected _computeResizeLineWidth() {
        this.renderer.setStyle(this._resizeLine.nativeElement, this.parent.direction == 'column' ? 'width' : 'height', '100%');
    }

    public setResizeLineSize() {
        return;
    }

    private _insertTimer: number;

    public showInertLine(inserting: boolean, mousePos?: { x: number, y: number }): BoxInsertPosition {
        if (inserting) {
            this.renderer.addClass(this.element, 'jigsaw-editable-box-inserting')
        } else {
            this.renderer.removeClass(this.element, 'jigsaw-editable-box-inserting')
        }
        if (!inserting || !mousePos) {
            clearTimeout(this._insertTimer);
            this.renderer.setStyle(this._insertionLine.nativeElement, 'display', 'none');
            return;
        }
        const globalScale = CommonUtils.getScale(this.element);
        const reverseInsertResult = this._reverseInsert(mousePos, globalScale);
        return reverseInsertResult ? reverseInsertResult : this._normalInsert(mousePos, globalScale);
    }

    /**
     * 判断插入方向，如果和父box不是一个方向，则分 before, after
     * @private
     */
    private _reverseInsert(mousePos: { x: number, y: number }, globalScale: number = 1): BoxInsertPosition {
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
                this.renderer.removeClass(this._insertionLine.nativeElement, 'jigsaw-editable-box-insert-line-column');
            } else {
                this.renderer.addClass(this._insertionLine.nativeElement, 'jigsaw-editable-box-insert-line-column');
            }
            // offset值需要设置缩放之前的值
            this.renderer.setStyle(this._insertionLine.nativeElement, this.direction == 'column' ? 'left' : 'top', lineOffset / this._getDirectScale(true) / globalScale + 'px');
            this.renderer.setStyle(this._insertionLine.nativeElement, this.direction == 'column' ? 'top' : 'left', (this.direction == 'column' ? this.element.scrollTop : this.element.scrollLeft) + 'px');
            this.renderer.setStyle(this._insertionLine.nativeElement, 'display', 'block');
        }, 350);

        return {
            parent: this,
            reverse: insertPos
        };
    }

    private _normalInsert(mousePos: { x: number, y: number }, globalScale: number = 1): BoxInsertPosition {
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
                this.renderer.addClass(this._insertionLine.nativeElement, 'jigsaw-editable-box-insert-line-column');
            } else {
                this.renderer.removeClass(this._insertionLine.nativeElement, 'jigsaw-editable-box-insert-line-column');
            }
            const insertOffset = this._getInsertOffset(endBoxIndex, posProp, sizeProp);
            // offset值需要设置缩放之前的值
            this.renderer.setStyle(this._insertionLine.nativeElement, this.direction == 'column' ? 'top' : 'left',
                (insertOffset / this._getDirectScale() / globalScale) + 'px');
            this.renderer.setStyle(this._insertionLine.nativeElement, this.direction == 'column' ? 'left' : 'top',
                (this.direction == 'column' ? this.element.scrollLeft : this.element.scrollTop) + 'px');
            this.renderer.setStyle(this._insertionLine.nativeElement, 'display', 'block');
        }, 350);
        return {
            parent: this,
            before: boxInsertBefore
        };
    }

    private _getInsertOffset(endBoxIndex: number, posProp: string, sizeProp: string): number {
        const insertLineScaleWidth = this._getInsertLineScaleWidth();
        let insertOffset: number;
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

    private _getInsertLineScaleWidth(reverse: boolean = false): number {
        return insertionLineWidth * this._getDirectScale(reverse);
    }

    private _getDirectScale(reverse: boolean = false, scale: number = 1, box: JigsawEditableBox = this): number {
        // 两层缩放比例
        scale = scale * this._getBoxDirectScale(box, reverse);
        return box.parent ? this._getDirectScale(reverse, scale, box.parent) : scale;
    }

    private _getBoxDirectScale(box: JigsawEditableBox, reverse: boolean = false): number {
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

    private _computeSizeRatios2(sizeProp: string, updateOffset: number): [number[], number[]] {
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
        const parentPaddingTop = this._pxToNumber(parentStyle.paddingTop) + this._pxToNumber(parentStyle.borderTopWidth);
        const parentPaddingBottom = this._pxToNumber(parentStyle.paddingBottom) + this._pxToNumber(parentStyle.borderBottomWidth);
        const parentPaddingLeft = this._pxToNumber(parentStyle.paddingLeft) + this._pxToNumber(parentStyle.borderLeftWidth);
        const parentPaddingRight = this._pxToNumber(parentStyle.paddingRight) + this._pxToNumber(parentStyle.borderRightWidth);
        const globalScale = CommonUtils.getScale(this.element);
        this.parent._$childrenBox.forEach((box, index) => {
            let paddingSize: number, marginSize: number, borderSize: number, parentPaddingSize: number;
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
            sizes[index] = sizes[index] - (parentPaddingSize + paddingSize + marginSize + borderSize) * globalScale;
        });
        return [sizes, sizes.map(size => size / this.parent.element.getBoundingClientRect()[sizeProp] * 100)];
    }

    /**
     * @internal
     * @param offset
     * @param emitEvent
     * @private
     */
    public _$handleResize(offset: number, emitEvent: boolean = false): void {
        if (!this.parent) {
            return;
        }

        const sizeProp = this._getPropertyByDirection()[1];
        const [sizes, sizeRatios] = this._computeSizeRatios2(sizeProp, offset);
        const globalScale = CommonUtils.getScale(this.element);
        this.parent._$childrenBox.forEach((box, index) => {
            if (box._isFixedSize) {
                // 固定尺寸的设置basis，而不是grow
                let paddingSize: number, borderSize: number;
                const boxStyle = getComputedStyle(box.element);
                if (this.parent.direction == 'column') {
                    paddingSize = this._pxToNumber(boxStyle.paddingTop) + this._pxToNumber(boxStyle.paddingBottom);
                    borderSize = this._pxToNumber(boxStyle.borderTopWidth) + this._pxToNumber(boxStyle.borderBottomWidth);
                } else {
                    paddingSize = this._pxToNumber(boxStyle.paddingLeft) + this._pxToNumber(boxStyle.paddingRight);
                    borderSize = this._pxToNumber(boxStyle.borderLeftWidth) + this._pxToNumber(boxStyle.borderRightWidth);
                }
                box.element.style.flexBasis = sizes[index] / globalScale + paddingSize + borderSize + 'px';
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
            super._emitResizeEvent(eventType);
        }
    }

    /**
     * 用于外部直接调用函数设置box固定尺寸
     */
    public manualSetFixedSize(property: 'width' | 'height', value: string): void {
        this[property] = value;
        this._supportSetSize(this, this.parent);
    }

    /**
     * 用于外部直接调用函数设置box grow
     */
    public manualSetGrow(): number[] {
        this.width = null;
        this.height = null;
        this._isFixedSize = false;
        const [offsetProp, sizeProp] = this._getPropertyByDirection();
        this._rawOffsets = this._getOffsets(offsetProp, sizeProp);
        const [, sizeRatios] = this._computeSizeRatios2(this._getPropertyByDirection()[1], this._rawOffsets[this._getCurrentIndex()]);
        this.parent?._$childrenBox?.forEach((box, index) => {
            const grow = sizeRatios[index];
            box.grow = grow;
            box.element.style.flexGrow = grow + '';
            box.growChange.emit(grow);
            box.element.style.flexBasis = '0';
        });
        return sizeRatios;
    }

    /**
     * 用于外部直接调用函数更新子box的状态，resize-line / gap 等
     */
    public manualUpdateChildren() {
        this._setChildrenBox();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._resizeLineParent) {
            this._resizeLineParent.nativeElement.remove();
        }
    }
}
