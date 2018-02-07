import {AbstractJigsawComponent} from "../common";
import {ElementRef, Input, NgZone, QueryList, Renderer2} from "@angular/core";
import {CallbackRemoval, CommonUtils} from "../../core/utils/common-utils";
import {JigsawBox} from "./box";
import {AffixUtils} from "../../core/utils/internal-utils";

export class JigsawBoxBase extends AbstractJigsawComponent {
    public element: HTMLElement;

    constructor(private _elementRef: ElementRef, protected renderer: Renderer2, protected zone: NgZone) {
        super();
        this.element = _elementRef.nativeElement;
    }

    public static directionMap = new Map([
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

    public static justifyMap = new Map([
        ['start', 'flex-start'],
        ['end', 'flex-end'],
        ['center', 'center'],
        ['between', 'space-between'],
        ['around', 'space-around'],
    ]);

    public static alignMap = new Map([
        ['start', 'flex-start'],
        ['end', 'flex-end'],
        ['center', 'center'],
        ['baseline', 'baseline'],
        ['stretch', 'stretch'],
    ]);

    @Input()
    public type: string;

    /* flex box property */
    private _direction: string;
    private _justify: string;
    private _align: string;

    @Input()
    public get direction(): string {
        return this._direction;
    }

    public set direction(value: string) {
        value = JigsawBoxBase.directionMap.get(value);
        if (!value) return;
        this._direction = value;
        this.renderer.setStyle(this.element, 'flex-direction', value);
        this._checkFlexByOwnProperty(value);
    }

    @Input()
    public get justify(): string {
        return this._justify;
    }

    public set justify(value: string) {
        value = JigsawBoxBase.justifyMap.get(value);
        if (!value) return;
        this._justify = value;
        this.renderer.setStyle(this.element, 'justify-content', value);
        this._checkFlexByOwnProperty(value);
    }

    @Input()
    public get align(): string {
        return this._align;
    }

    public set align(value: string) {
        value = JigsawBoxBase.alignMap.get(value);
        if (!value) return;
        this._align = value;
        this.renderer.setStyle(this.element, 'align-items', value);
        this._checkFlexByOwnProperty(value);
    }

    /* flex item property */
    private _order: number;
    private _grow: number;
    private _shrink: number;

    @Input()
    public get order(): number {
        return this._order;
    }

    public set order(value: number) {
        this._order = value;
        this.renderer.setStyle(this.element, 'order', Number(value));
    }

    @Input()
    public get grow(): number {
        return this._grow;
    }

    public set grow(value: number) {
        if (CommonUtils.isUndefined(value)) return;
        this._grow = value;
        this.zone.runOutsideAngular(() => {
            this.renderer.setStyle(this.element, 'flex-grow', Number(value));
        });
    }

    @Input()
    public get shrink(): number {
        return this._shrink;
    }

    public set shrink(value: number) {
        this._shrink = value;
        this.renderer.setStyle(this.element, 'flex-shrink', Number(value));
    }

    protected childrenBox: QueryList<JigsawBoxBase> | JigsawBox[];

    private _checkFlexByOwnProperty(property: string) {
        if (property && this.type != 'flex') {
            setTimeout(() => {
                this.type = 'flex';
            })
        }
    }

    protected _checkFlexByChildren() {
        if (this.childrenBox.length > 0 && this.type != 'flex') {
            setTimeout(() => {
                this.type = 'flex';
            })
        }
    }

    protected checkFlex() {
        this._checkFlexByChildren();
        if (this.childrenBox instanceof QueryList) {
            this.childrenBox.changes.subscribe(() => {
                this._checkFlexByChildren();
            })
        }
    }
}

export class JigsawBoxResizableBase extends JigsawBoxBase {
    public parent: any;

    private _rawOffsets: number[];

    protected removeElementScrollEvent: CallbackRemoval;

    /**
     * @internal
     */
    public _$resizeRange: number[];

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
        const sizeRatios = this._computeSizeRatios(sizeProp, offset);
        this.parent.childrenBox.forEach((box, index) => {
            box.grow = sizeRatios[index];
            if (emitEvent) {
                box.growChange.emit(sizeRatios[index]);
            }
        });
    }

    private _computeSizeRatios(sizeProp: string, updateOffset: number): number[] {
        const sizes = this.parent.childrenBox.reduce((arr, box) => {
            arr.push(box.element[sizeProp]);
            return arr;
        }, []);
        const curIndex = this._getCurrentIndex();
        this._rawOffsets.splice(curIndex, 1, updateOffset);
        if (curIndex < 1) return;
        const prevBoxSize = this._rawOffsets[curIndex] - this._rawOffsets[curIndex - 1];
        const curBoxSize = this._rawOffsets[curIndex + 1] - this._rawOffsets[curIndex];
        sizes.splice(curIndex - 1, 2, prevBoxSize, curBoxSize);
        return sizes.map(size => {
            return size / this.parent.element[sizeProp] * 100
        });
    }

    /**
     * 子box相对于父box的偏移
     * @param {string} offsetProp
     * @param {string} sizeProp
     * @returns {number[]}
     * @private
     */
    private _getOffsets(offsetProp: string, sizeProp: string): number[] {
        const offsets = this.parent.childrenBox.reduce((arr, box, index) => {
            if (index == 0) {
                arr.push(0);
            } else {
                arr.push(AffixUtils.offset(box.element)[offsetProp] -
                    AffixUtils.offset(this.parent.element)[offsetProp]);
            }
            return arr;
        }, []);
        offsets.push(this.parent.element[sizeProp]);
        return offsets;
    }

    private _getCurrentIndex(): number {
        let index: number;
        if (this.parent.childrenBox instanceof QueryList) {
            index = this.parent.childrenBox.toArray().findIndex(box => box == this);
        } else {
            index = this.parent.childrenBox.findIndex(box => box == this);
        }
        return index;
    }

    private _getPropertyByDirection(): string[] {
        return [this.parent.direction == 'column' ? 'top' : 'left',
            this.parent.direction == 'column' ? 'offsetHeight' : 'offsetWidth']
    }

    private _getResizeRange(offsetProp: string, sizeProp: string): number[] {
        this._rawOffsets = this._getOffsets(offsetProp, sizeProp);
        const curIndex = this._getCurrentIndex();
        return [this._rawOffsets[curIndex - 1], this._rawOffsets[curIndex + 1]];
    }

    private _updateResizeRange() {
        const [offsetProp, sizeProp] = this._getPropertyByDirection();
        this._$resizeRange = this._getResizeRange(offsetProp, sizeProp);
    };
}
