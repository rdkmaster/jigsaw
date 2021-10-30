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
    Input
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
        '[style.margin]': 'margin',
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

    /**
     * @internal
     */
    public get _$childrenBox(): JigsawEditableBox[] {
        return <JigsawEditableBox[]>this.childrenBox;
    }

    public set _$childrenBox(v: JigsawEditableBox[]) {
        this.childrenBox = v;
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
            }
        });
        if (!this._$childrenBox || !this.gap) {
            return;
        }
        this._$childrenBox.forEach((box, index) => {
            if (box.margin) {
                return;
            }
            box.margin = index == this._$childrenBox.length - 1 ? `0` : this.direction == 'column' ? `0 0 ${this.gap} 0` : `0 ${this.gap} 0 0`;
        })
    }

    private _insertTimer: number;

    public showInertLine(laying: boolean, mousePos?: { x: number, y: number }): BoxInsertInfo {
        this.element.style.borderColor = laying ? 'red' : '#ccc';
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

    protected _computeSizeRatios(sizeProp: string, updateOffset: number): number[] {
        const curIndex = this._getCurrentIndex();
        this._rawOffsets.splice(curIndex, 1, updateOffset);

        const sizes = this._rawOffsets.reduce((ss, offset, index) => {
            if(index > 0) {
                ss.push(offset - this._rawOffsets[index - 1])
            }
            return ss;
        }, []);

        return sizes.map(size => size / (this.parent.element[sizeProp]) * 100);
    }

    public _$handleResize(offset: number, emitEvent: boolean = false) {
        if (!this.parent) return;

        const sizeProp = this._getPropertyByDirection()[1];
        const sizeRatios = this._computeSizeRatios(sizeProp, offset);
        this.parent.childrenBox.forEach((box, index) => {
            if(box._isFixedSize) {
                // 固定尺寸的设置basis，而不是grow
                box.element.style.flexBasis = this.parent.element[this.parent.direction == 'column' ? 'offsetHeight' : 'offsetWidth'] * sizeRatios[index] / 100 + 'px';
                box.element.style.flexGrow = '0';
            } else {
                box.grow = sizeRatios[index];
            }
        });
    }
}
