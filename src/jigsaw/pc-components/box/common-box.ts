import {ElementRef, EventEmitter, Input, NgZone, OnDestroy, Output, QueryList, Renderer2, Directive} from "@angular/core";
import {Subscription} from "rxjs";
import {AbstractJigsawComponent} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {AffixUtils} from "../../common/core/utils/internal-utils";
import { JigsawBox } from "./box";

@Directive()
export class JigsawBoxBase extends AbstractJigsawComponent implements OnDestroy {
    public element: HTMLElement;

    constructor(private _elementRef: ElementRef, protected renderer: Renderer2, protected zone: NgZone) {
        super(zone);
        this.element = _elementRef.nativeElement;
    }

    private static DIRECTION_MAP = new Map([
        ['horizontal', 'row'],
        ['horizontal-reverse', 'row-reverse'],
        ['vertical', 'column'],
        ['vertical-reverse', 'column-reverse'],
        ['h', 'row'],
        ['hr', 'row-reverse'],
        ['v', 'column'],
        ['vr', 'column-reverse'],
        ['row', 'row'],
        ['row-reverse', 'row-reverse'],
        ['column', 'column'],
        ['column-reverse', 'column-reverse'],
    ]);

    private static JUSTIFY_MAP = new Map([
        ['start', 'flex-start'],
        ['end', 'flex-end'],
        ['center', 'center'],
        ['between', 'space-between'],
        ['around', 'space-around'],
    ]);

    private static ALIGN_MAP = new Map([
        ['start', 'flex-start'],
        ['end', 'flex-end'],
        ['center', 'center'],
        ['baseline', 'baseline'],
        ['stretch', 'stretch'],
    ]);

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public type: string;

    /* flex box property */
    private _direction: string;
    private _justify: string;
    private _align: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get direction(): string {
        return this._direction;
    }

    public set direction(value: string) {
        value = JigsawBoxBase.DIRECTION_MAP.get(value);
        if (!value) {
            this._direction = value;
            //设置默认值，如果box不是flex，该样式不会生效
            this.renderer.setStyle(this.element, 'flex-direction', 'row');
            return;
        }
        this._direction = value;
        this.renderer.setStyle(this.element, 'flex-direction', value);
        this._checkFlexByOwnProperty(value);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get justify(): string {
        return this._justify;
    }

    public set justify(value: string) {
        value = JigsawBoxBase.JUSTIFY_MAP.get(value);
        if (!value) return;
        this._justify = value;
        this.renderer.setStyle(this.element, 'justify-content', value);
        this._checkFlexByOwnProperty(value);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get align(): string {
        return this._align;
    }

    public set align(value: string) {
        value = JigsawBoxBase.ALIGN_MAP.get(value);
        if (!value) return;
        this._align = value;
        this.renderer.setStyle(this.element, 'align-items', value);
        this._checkFlexByOwnProperty(value);
    }

    /* flex item property */
    private _order: number;
    private _grow: number;
    private _shrink: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get order(): number {
        return this._order;
    }

    public set order(value: number) {
        this._order = value;
        this.renderer.setStyle(this.element, 'order', Number(value));
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get grow(): number {
        return this._grow;
    }

    public set grow(value: number) {
        if (CommonUtils.isUndefined(value) || this._grow == value) return;
        this._grow = value;
        this.zone.runOutsideAngular(() => {
            this.renderer.setStyle(this.element, 'flex-grow', Number(value));
        });
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get shrink(): number {
        return this._shrink;
    }

    public set shrink(value: number) {
        this._shrink = value;
        this.renderer.setStyle(this.element, 'flex-shrink', Number(value));
    }

    @Output()
    public growChange = new EventEmitter<number>();

    protected removeBoxChangeListener: Subscription;

    protected childrenBox: QueryList<JigsawBoxBase>;

    private _checkFlexByOwnProperty(property: string) {
        if (property && this.type != 'flex') {
            this.runMicrotask(() => this.type = 'flex');
        }
    }

    protected checkFlexByChildren() {
        if (this.childrenBox.length > 0 && this.type != 'flex') {
            this.runMicrotask(() => this.type = 'flex');
        }
    }

    protected checkFlex() {
        this.checkFlexByChildren();
        if (this.childrenBox instanceof QueryList) {
            if (this.removeBoxChangeListener) {
                this.removeBoxChangeListener.unsubscribe();
            }
            this.removeBoxChangeListener = this.childrenBox.changes.subscribe(() => {
                this.checkFlexByChildren();
            })
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.removeBoxChangeListener) {
            this.removeBoxChangeListener.unsubscribe();
        }
    }
}

export interface BoxSizes extends Array<number> {
    toRatios(): number[];
    totalSize: number;
}

@Directive()
export class JigsawResizableBoxBase extends JigsawBoxBase {
    private _disableGrow: boolean;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get disableGrow(): boolean {
        return this._disableGrow;
    }

    public set disableGrow(value: boolean) {
        this._disableGrow = value;
        if (!this.parent) {
            return;
        }
        this.runAfterMicrotasks(() => {
            if (this._isFixedSize) {
                return;
            }
            if (value) {
                this._setDisableGrowStyle(this.element);
            } else {
                this._resetDisableGrowStyle(this.element, true);
            }
        });
    }

    protected _setDisableGrowStyle(element: HTMLElement) {
        let sizeParam: 'offsetHeight' | 'offsetWidth';
        let sizeProp: 'height' | 'width';
        if (this.parent.direction == 'column') {
            sizeParam = 'offsetHeight';
            sizeProp = 'height'
        } else {
            sizeParam = 'offsetWidth';
            sizeProp = 'width'
        }
        const size = Number(element[sizeParam]) + 'px';
        this.renderer.setStyle(element, sizeProp, size);
        this.renderer.setStyle(element, 'flex-basis', size);
        this.renderer.setStyle(element, 'flex-grow', 0);
    }

    protected _resetDisableGrowStyle(element: HTMLElement, selfOnly?: boolean) {
        const [offsetProp, sizeProp] = this._getPropertyByDirection();
        this._rawOffsets = this._getOffsets(offsetProp, sizeProp);
        const sizeRatios = this._computeBoxSizes(sizeProp).toRatios();
        this.renderer.removeStyle(element, sizeProp);
        this.renderer.removeStyle(element, 'flex-basis');
        this.parent.getShownChildrenBox().forEach((box: JigsawBox, index: number) => {
            if (box._isFixedSize) {
                return;
            }
            this.zone.runOutsideAngular(() => {
                if (selfOnly) {
                    if (!box.disableGrow) {
                        this.renderer.setStyle(box.element, 'flex-grow', Number(sizeRatios[index]));
                    }
                } else {
                    this.renderer.setStyle(box.element, 'flex-grow', Number(sizeRatios[index]));
                    if (box.disableGrow) {
                        this.renderer.removeStyle(box.element, sizeProp);
                        this.renderer.removeStyle(box.element, 'flex-basis');
                    }
                }
            });
        });
    }

    public parent: any;

    protected _rawOffsets: number[];

    /**
     * @internal
     */
    public _isFixedSize: boolean;

    /**
     * @internal
     */
    public _$resizeRange: number[];

    @Output()
    public resizeStart = new EventEmitter();

    @Output()
    public resize = new EventEmitter();

    protected _pxToNumber(px: string): number {
        if (CommonUtils.isUndefined(px) || typeof px == 'number') {
            return <any>px;
        }
        px = px.replace(/(.*)px$/i, '$1');
        return Number(px);
    }

    /**
     * @internal
     */
    public _$handleResizeStart(event) {
        event.preventDefault();
        event.stopPropagation();

        this._updateResizeRange();
    }

    /**
     * @internal
     */
    public _$handleResize(offset: number, emitEvent: boolean = false) {
        if (!this.parent) return;
        const sizeProp = this._getPropertyByDirection()[1];
        const sizeRatios = this._computeBoxSizes(sizeProp, offset).toRatios();
        this.parent.getShownChildrenBox().forEach((box, index) => {
            if (box._isFixedSize) {
                return;
            }
            box.grow = sizeRatios[index];
            if (emitEvent) {
                box.growChange.emit(sizeRatios[index]);
            }
        });
    }

    public getRootBox(): any {
        let p = this.parent;
        if (!p) return this;
        while (true) {
            if (!p.parent) return p;
            p = p.parent;
        }
    }

    protected _computeBoxSizes(sizeProp: string, updateOffset?: number): BoxSizes {
        if (CommonUtils.isDefined(updateOffset)){
            const curIndex = this._getCurrentShownBoxIndex();
            this._rawOffsets.splice(curIndex, 1, updateOffset);
        }

        const sizes: BoxSizes = this._rawOffsets.reduce((ss, offset, index) => {
            if (index > 0) {
                ss.push(offset - this._rawOffsets[index - 1])
            }
            return ss;
        }, []) as BoxSizes;
        // 根据padding/gap/border纠正尺寸
        const parentStyle = getComputedStyle(this.parent.element);
        const parentPaddingTop = this._pxToNumber(parentStyle.paddingTop) + this._pxToNumber(parentStyle.borderTopWidth);
        const parentPaddingBottom = this._pxToNumber(parentStyle.paddingBottom) + this._pxToNumber(parentStyle.borderBottomWidth);
        const parentPaddingLeft = this._pxToNumber(parentStyle.paddingLeft) + this._pxToNumber(parentStyle.borderLeftWidth);
        const parentPaddingRight = this._pxToNumber(parentStyle.paddingRight) + this._pxToNumber(parentStyle.borderRightWidth);
        const globalScale = CommonUtils.getScale(this.element);
        const shownBox = this.parent.getShownChildrenBox();
        shownBox.forEach((box, index) => {
            let paddingSize: number, marginSize: number, borderSize: number, parentPaddingSize: number;
            const boxStyle = getComputedStyle(box.element);
            if (this.parent.direction == 'column') {
                parentPaddingSize = index == 0 ? parentPaddingTop : index == shownBox.length - 1 ? parentPaddingBottom : 0;
                paddingSize = this._pxToNumber(boxStyle.paddingTop) + this._pxToNumber(boxStyle.paddingBottom);
                marginSize = this._pxToNumber(boxStyle.marginTop) + this._pxToNumber(boxStyle.marginBottom);
                borderSize = this._pxToNumber(boxStyle.borderTopWidth) + this._pxToNumber(boxStyle.borderBottomWidth);
            } else {
                parentPaddingSize = index == 0 ? parentPaddingLeft : index == shownBox.length - 1 ? parentPaddingRight : 0;
                paddingSize = this._pxToNumber(boxStyle.paddingLeft) + this._pxToNumber(boxStyle.paddingRight);
                marginSize = this._pxToNumber(boxStyle.marginLeft) + this._pxToNumber(boxStyle.marginRight);
                borderSize = this._pxToNumber(boxStyle.borderLeftWidth) + this._pxToNumber(boxStyle.borderRightWidth);
            }
            // 计算grow或basis要剔除边框、内边距、外边距的尺寸才能计算准确
            sizes[index] = sizes[index] - (parentPaddingSize + paddingSize + marginSize + borderSize) * globalScale;
        });

        function toRatios() {
            return this.map(size => size / this.totalSize * 100);
        }
        sizes.totalSize = this.parent.element.getBoundingClientRect()[sizeProp];
        sizes.toRatios = toRatios.bind(sizes);

        return sizes;
    }

    /**
     * 子box相对于父box的偏移
     * @param offsetProp
     * @param sizeProp
     *
     *
     */
    protected _getOffsets(offsetProp: string, sizeProp: string): number[] {
        const offsets = this.parent.getShownChildrenBox().reduce((arr: number[], box: JigsawBox, index: number) => {
            if (index == 0) {
                arr.push(0);
            } else {
                arr.push(AffixUtils.offset(box.element)[offsetProp] -
                    AffixUtils.offset(this.parent.element)[offsetProp]);
            }
            return arr;
        }, []);
        offsets.push(this.parent.element.getBoundingClientRect()[sizeProp]);
        return offsets;
    }

    protected _getCurrentIndex(): number {
        let index: number;
        if (this.parent.childrenBox instanceof QueryList) {
            index = this.parent.childrenBox.toArray().findIndex(box => box == this);
        } else {
            index = this.parent.childrenBox.findIndex(box => box == this);
        }
        return index;
    }

    protected _getCurrentShownBoxIndex(): number {
        return this.parent.getShownChildrenBox().findIndex(box => box == this);
    }

    protected _getPropertyByDirection(): string[] {
        return [this.parent.direction == 'column' ? 'top' : 'left',
            this.parent.direction == 'column' ? 'height' : 'width']
    }

    private _getResizeRange(offsetProp: string, sizeProp: string): number[] {
        this._rawOffsets = this._getOffsets(offsetProp, sizeProp);
        const curIndex = this._getCurrentShownBoxIndex();
        const childrenBox = this.parent.getShownChildrenBox();
        const prevBox = childrenBox[curIndex - 1], curBox = childrenBox[curIndex];
        const scale = CommonUtils.getScale(this.element);
        return [
            this._rawOffsets[curIndex] - this._getBoxGrowSize(prevBox) * scale,
            this._rawOffsets[curIndex] + this._getBoxGrowSize(curBox) * scale
        ];
    }

    private _getBoxGrowSize(box: JigsawResizableBoxBase): number {
        let minParam;
        let paddingLeftParam;
        let paddingRightParam;
        let borderLeftParam;
        let borderRightParam;
        let sizeParam;
        if (this.parent.direction == 'column') {
            minParam = 'minHeight';
            paddingLeftParam = 'paddingTop';
            paddingRightParam = 'paddingBottom';
            borderLeftParam = 'borderTopWidth' ;
            borderRightParam = 'borderBottomWidth';
            sizeParam = 'offsetHeight';
        } else {
            minParam = 'minWidth';
            paddingLeftParam = 'paddingLeft';
            paddingRightParam = 'paddingRight';
            borderLeftParam = 'borderLeftWidth';
            borderRightParam = 'borderRightWidth';
            sizeParam = 'offsetWidth';
        }
        const boxStyle = getComputedStyle(box.element);
        let minSize = this._pxToNumber(boxStyle[minParam]) || 0;
        let padding = this._pxToNumber(boxStyle[paddingLeftParam]) + this._pxToNumber(boxStyle[paddingRightParam]);
        let border = this._pxToNumber(boxStyle[borderLeftParam]) + this._pxToNumber(boxStyle[borderRightParam]);
        let size = box.element[sizeParam];
        return size - Math.max(minSize, padding + border);
    }

    private _updateResizeRange() {
        const [offsetProp, sizeProp] = this._getPropertyByDirection();
        this._$resizeRange = this._getResizeRange(offsetProp, sizeProp);
    };
}
