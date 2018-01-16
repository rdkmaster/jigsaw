import {AfterContentInit, Component, ContentChildren, ElementRef, Input, NgModule, QueryList, Renderer2} from "@angular/core";
import {AbstractJigsawComponent} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";

export class JigsawBoxBase extends AbstractJigsawComponent {
    protected _element: HTMLElement;

    constructor(private _elementRef: ElementRef, protected _renderer: Renderer2) {
        super();
        this._element = _elementRef.nativeElement;
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
        this._renderer.setStyle(this._element, 'flex-direction', value);
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
        this._renderer.setStyle(this._element, 'justify-content', value);
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
        this._renderer.setStyle(this._element, 'align-items', value);
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
        this._renderer.addClass(this._element, 'jigsaw-col-order-' + value);
    }

    @Input()
    public get grow(): number {
        return this._grow;
    }

    public set grow(value: number) {
        if (CommonUtils.isUndefined(value)) return;
        this._grow = value;
        this._renderer.setStyle(this._element, 'flex-grow', Number(value));
    }

    @Input()
    public get shrink(): number {
        return this._shrink;
    }

    public set shrink(value: number) {
        this._shrink = value;
        this._renderer.setStyle(this._element, 'flex-shrink', Number(value));
    }

    protected childrenBox: QueryList<JigsawBoxBase>;

    private _checkFlexByOwnProperty(property: string) {
        if (property && this.type != 'flex') {
            setTimeout(() => {
                this.type = 'flex';
            })
        }
    }

    private _checkFlexByChildren() {
        // 映射同一组件实例，ContentChildren会包含自己，https://github.com/angular/angular/issues/21148
        if (this.childrenBox.length > 1 && this.type != 'flex') {
            setTimeout(() => {
                this.type = 'flex';
            })
        }
    }

    protected checkFlex() {
        this._checkFlexByChildren();
        this.childrenBox.changes.subscribe(() => {
            this._checkFlexByChildren();
        })
    }
}

@Component({
    selector: 'jigsaw-box, j-box',
    template: '<ng-content></ng-content>',
    host: {
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawBox extends JigsawBoxBase implements AfterContentInit {
    constructor(elementRef: ElementRef, renderer: Renderer2) {
        super(elementRef, renderer);
    }

    @ContentChildren(JigsawBox)
    protected childrenBox: QueryList<JigsawBox>;

    ngAfterContentInit() {
        this.checkFlex();
    }
}

@NgModule({
    declarations: [JigsawBox],
    exports: [JigsawBox]
})
export class JigsawBoxModule {

}
