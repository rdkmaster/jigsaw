import {AfterContentInit, Component, ContentChildren, ElementRef, Input, NgModule, OnInit, QueryList, Renderer2} from "@angular/core";
import {AbstractJigsawComponent} from "../common";

@Component({
    selector: 'jigsaw-box, j-box',
    template: '<ng-content></ng-content>',
    host: {
        '[class.jigsaw-box]': 'true',
        '[class.jigsaw-flex]': 'type == "flex"',
        '[class.jigsaw-box-fixed]': 'fixable',
        '[style.width]': 'width',
        '[style.height]': 'height',
    }
})
export class JigsawBox extends AbstractJigsawComponent implements AfterContentInit {
    private _element: HTMLElement;

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        super();
        this._element = this._elementRef.nativeElement;
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

    @Input()
    public fixable: boolean;

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

    @ContentChildren(JigsawBox) childrenBox: QueryList<JigsawBox>;

    private _checkFlexByOwnProperty(property: string) {
        if (property && this.type != 'flex') {
            this.type = 'flex';
        }
    }

    private _checkFlexByChildren() {
        // 映射同一组件实例，ContentChildren会包含自己，https://github.com/angular/angular/issues/21148
        if (this.childrenBox.length > 1 && this.type != 'flex') {
            this.type = 'flex';
        }
    }

    ngAfterContentInit() {
        this._checkFlexByChildren();
        this.childrenBox.changes.subscribe(() => {
            this._checkFlexByChildren();
        })
    }
}

@NgModule({
    declarations: [JigsawBox],
    exports: [JigsawBox]
})
export class JigsawBoxModule {

}
