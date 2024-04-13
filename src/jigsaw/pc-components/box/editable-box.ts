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
} from '@angular/core';
import {JigsawBox} from "./box";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {BoxSizes} from "./common-box";

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

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public resizeStep: number = 8;

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

    protected _setResizeLine(box: JigsawEditableBox, index: number) {
        if (!this.resizable || index == 0) {
            // 第一个child box没有resize line
            // 设置了尺寸的editable box也是需要resize line，用于调整尺寸
            return;
        }
        this._setResizeLineAsync(box, index);
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
        const sizes: BoxSizes = this._computeBoxSizes(sizeProp, offset);
        const sizeRatios = sizes.toRatios();
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
        const sizeRatios = this._computeBoxSizes(this._getPropertyByDirection()[1], this._rawOffsets[this._getCurrentIndex()]).toRatios();
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
}
