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

export type InsertInfo = { parent: JigsawEditableBox, before: JigsawEditableBox };

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
        super._setChildrenBox();
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

    public showInertLine(laying: boolean, mousePos?: { x: number, y: number }): InsertInfo {
        this.element.style.borderColor = laying ? 'red' : '#ccc';
        if (!laying) {
            clearTimeout(this._insertTimer);
            this.renderer.setStyle(this._insertLine.nativeElement, 'display', 'none');
            return;
        }

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
            const insertLineScaleWidth = this._getInsertLineScaleWidth();
            let insertOffset = 0;
            const parentBoxRect = this.element.getBoundingClientRect();
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
            // offset值需要设置缩放之前的值
            this.renderer.setStyle(this._insertLine.nativeElement, this.direction == 'column' ? 'top' : 'left', insertOffset / this._getDirectScale() + 'px');
            this.renderer.setStyle(this._insertLine.nativeElement, 'display', 'block');
        }, 350);

        return {
            parent: this,
            before: boxInsertBefore
        };
    }

    private _getInsertLineScaleWidth() {
        return JigsawEditableBox._insertLineWidth * this._getDirectScale();
    }

    private _getDirectScale(scale: number = 1, box: JigsawEditableBox = this) {
        // 两层缩放比例
        scale = scale * this._getBoxDirectScale(box);
        return box.parent ? this._getDirectScale(scale, box.parent) : scale;
    }

    private _getBoxDirectScale(box: JigsawEditableBox) {
        if (!box || !box._scale.length) {
            return 1;
        }
        // 获取同一方向的缩放
        return this.direction == 'column' ? box._scale[1] : box._scale[0];
    }

}
