import {
    AfterContentInit, AfterViewInit, Component, ContentChildren, DoCheck,
    ElementRef, Input, NgModule, QueryList, Renderer2, ViewChild
} from "@angular/core";
import {AbstractJigsawComponent} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";
import {CommonModule} from "@angular/common";
import {JigsawBoxResizableModule} from "./resizable.directive";
import {AffixUtils} from "../../core/utils/internal-utils";

export class JigsawBoxBase extends AbstractJigsawComponent {
    public element: HTMLElement;

    constructor(private _elementRef: ElementRef, protected _renderer: Renderer2) {
        super();
        this.element = _elementRef.nativeElement;
    }

    private _directionMap = new Map([
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

    private _justifyMap = new Map([
        ['start', 'flex-start'],
        ['end', 'flex-end'],
        ['center', 'center'],
        ['between', 'space-between'],
        ['around', 'space-around'],
    ]);

    private _alignMap = new Map([
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
        value = this._directionMap.get(value);
        if (!value) return;
        this._direction = value;
        this._renderer.setStyle(this.element, 'flex-direction', value);
        this._checkFlexByOwnProperty(value);
    }

    @Input()
    public get justify(): string {
        return this._justify;
    }

    public set justify(value: string) {
        value = this._justifyMap.get(value);
        if (!value) return;
        this._justify = value;
        this._renderer.setStyle(this.element, 'justify-content', value);
        this._checkFlexByOwnProperty(value);
    }

    @Input()
    public get align(): string {
        return this._align;
    }

    public set align(value: string) {
        value = this._alignMap.get(value);
        if (!value) return;
        this._align = value;
        this._renderer.setStyle(this.element, 'align-items', value);
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
        this._renderer.setStyle(this.element, 'order', Number(value));
    }

    @Input()
    public get grow(): number {
        return this._grow;
    }

    public set grow(value: number) {
        if (CommonUtils.isUndefined(value)) return;
        this._grow = value;
        this._renderer.setStyle(this.element, 'flex-grow', Number(value));
    }

    @Input()
    public get shrink(): number {
        return this._shrink;
    }

    public set shrink(value: number) {
        this._shrink = value;
        this._renderer.setStyle(this.element, 'flex-shrink', Number(value));
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

@Component({
    selector: 'jigsaw-box, j-box',
    templateUrl: './box.html',
    host: {
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawBox extends JigsawBoxBase implements AfterContentInit, DoCheck, AfterViewInit {
    constructor(elementRef: ElementRef, renderer: Renderer2) {
        super(elementRef, renderer);
    }

    @Input()
    public resizable: boolean = true;

    public showResizeLine: boolean;

    public isColumnLine: boolean;

    public parent: JigsawBox;

    @ContentChildren(JigsawBox)
    public childrenBoxRaw: QueryList<JigsawBox>;

    protected childrenBox: JigsawBox[];

    ngAfterContentInit() {
        // 映射同一组件实例，ContentChildren会包含自己，https://github.com/angular/angular/issues/21148
        this.childrenBox = this.childrenBoxRaw.filter(box => box != this);
        this.checkFlex();
        this.childrenBoxRaw.changes.subscribe(() => {
            this.childrenBox = this.childrenBoxRaw.filter(box => box != this);
            this._checkFlexByChildren();
        });

        if (this.resizable) {
            this.childrenBox.forEach((box, index) => {
                box.parent = this;
                if (index == 0) return; // 过滤掉第一个child box

                box.showResizeLine = true;
                if (this.direction == 'column') {
                    box.isColumnLine = true;
                }

            });
        }
    }

    @ViewChild('resizeLine')
    public resizeLine: ElementRef;

    ngAfterViewInit() {
        // 等待box视图渲染
        setTimeout(() => {
            if (this.isColumnLine || !this.resizeLine) return;
            this._renderer.setStyle(this.resizeLine.nativeElement, 'height', this.element.offsetHeight - 2 + 'px');
        })
    }

    ngDoCheck() {
        /*console.log('aaaa')
        if(this.isColumnLine || !this.resizeLine) return;
        console.log('bbbb')
        this._renderer.setStyle(this.resizeLine.nativeElement, 'height', this.element.offsetHeight-2 + 'px');*/
    }


    /**
     * @internal
     */
    public _$handleResize(offset: number) {
        if (!this.parent) return;

        const [offsetProp, sizeProp] = this._getPropertyByDirection();
        const sizeRatios = this._computeSizeRatios(offsetProp, sizeProp, offset);
        this.parent.childrenBox.forEach((box, index) => {
            box.grow = sizeRatios[index];
        });

        this._handleResizeMouseUp();
    }

    private _computeSizeRatios(offsetProp: string, sizeProp: string, updateOffset: number): number[] {
        const offsets = this._getOffsets(offsetProp, sizeProp);
        const sizes = this.parent.childrenBox.reduce((arr, box) => {
            arr.push(box.element[sizeProp]);
            return arr;
        }, []);
        const curIndex = this._getCurrentIndex();
        offsets.splice(curIndex, 1, updateOffset);
        if (curIndex < 1) return;
        const prevBoxSize = offsets[curIndex] - offsets[curIndex - 1];
        const curBoxSize = offsets[curIndex + 1] - offsets[curIndex];
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
                arr.push(AffixUtils.offset(box.resizeLine.nativeElement)[offsetProp] -
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
        const offsets = this._getOffsets(offsetProp, sizeProp);
        const curIndex = this._getCurrentIndex();
        return [offsets[curIndex - 1], offsets[curIndex + 1]];
    }

    /**
     * @internal
     */
    public _$resizeRange: number[];

    private _updateResizeRange() {
        const [offsetProp, sizeProp] = this._getPropertyByDirection();
        this._$resizeRange = this._getResizeRange(offsetProp, sizeProp);
    };

    /**
     * @internal
     */
    public _$handleResizeMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();

        this._updateResizeRange();
        //this._renderer.addClass(this._parentViewEditor.element, 'jigsaw-view-editor-resizing');
    }

    private _handleResizeMouseUp() {
        //this._renderer.removeClass(this._parentViewEditor.element, 'jigsaw-view-editor-resizing');
    }
}

@NgModule({
    imports: [CommonModule, JigsawBoxResizableModule],
    declarations: [JigsawBox],
    exports: [JigsawBox]
})
export class JigsawBoxModule {

}
