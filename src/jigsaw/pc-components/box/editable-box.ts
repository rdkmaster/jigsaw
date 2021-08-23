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
    Injector
} from '@angular/core';
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";

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
     * @internal
     */
    public _scale: number[] = [];

    private _insertGap: number = 12;

    private _insertLineWidth: number = 4;

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
            let scalePX = this._insertGap * 2;
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

    public showInertLineByOffset(type: boolean, mousePos?: { x: number, y: number }) {
        this.element.style.borderColor = type ? 'red' : '#ccc';
        this.renderer.setStyle(this._insertLine.nativeElement, 'display', type ? 'block' : 'none');
        if (!type) {
            return;
        }
        const curBoxRect = this.element.getBoundingClientRect();
        let insertOffset = 0;
        const directProp = this.direction == 'column' ? 'y' : 'x';
        const directSizeProp = this.direction == 'column' ? 'height' : 'width';
        const mouseDirectValue = mousePos[directProp];
        // 获取鼠标后面box的下标
        const endBoxIndex = this._$childrenBox.findIndex(childBox => {
            const childBoxRect = childBox.element.getBoundingClientRect();
            return childBoxRect[directProp] > mouseDirectValue
        });
        const insertGapOffset = this._getInsertGapOffset();
        if (endBoxIndex == 0) {
            // 插在最前面
            insertOffset = insertGapOffset;
        } else if (endBoxIndex < 0) {
            // 插在最后面
            if (this._$childrenBox.length) {
                const startBoxRect = this._$childrenBox[this._$childrenBox.length - 1].element.getBoundingClientRect();
                insertOffset = startBoxRect[directProp] + startBoxRect[directSizeProp] - curBoxRect[directProp] + insertGapOffset;
            } else {
                //没有子集则居中显示
                insertOffset = (curBoxRect[directSizeProp] - this._insertLineWidth) / 2;
            }
        } else {
            // 插在中间
            const startBoxRect = this._$childrenBox[endBoxIndex - 1].element.getBoundingClientRect();
            insertOffset = startBoxRect[directProp] + startBoxRect[directSizeProp] - curBoxRect[directProp] + insertGapOffset * 2;
        }
        // offset值需要设置缩放之前的值
        this.renderer.setStyle(this._insertLine.nativeElement, this.direction == 'column' ? 'top' : 'left', insertOffset / this._getDirectScale() + 'px');
    }

    private _getInsertGapOffset() {
        return (this._insertGap - this._insertLineWidth * this._getDirectScale()) / 2;
    }

    private _getDirectScale() {
        // 两层缩放比例
        return this._getBoxDirectScale(this.parent) * this._getBoxDirectScale(this);
    }

    private _getBoxDirectScale(box: JigsawEditableBox) {
        if (!box || !box._scale.length) {
            return 1;
        }
        return box.direction == 'column' ? box._scale[1] : box._scale[0];
    }

}
