import {Component, ElementRef, Input, NgModule, Renderer2} from "@angular/core";
import {AbstractJigsawComponent} from "../common";

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
export class JigsawBox extends AbstractJigsawComponent {
    private _element: HTMLElement;

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        super();
        this._element = this._elementRef.nativeElement;
    }

    @Input()
    type: string;

    /* flex box property */
    private _direction: string;
    private _justify: string;
    private _align: string;

    @Input()
    protected get direction(): string {
        return this._direction;
    }

    protected set direction(value: string) {
        this._direction = value;
        this._renderer.setStyle(this._element, 'flex-direction', value);
    }

    @Input()
    public get justify(): string {
        return this._justify;
    }

    public set justify(value: string) {
        this._justify = value;
        this._renderer.setStyle(this._element, 'justify-content', value);
    }

    @Input()
    public get align(): string {
        return this._align;
    }

    public set align(value: string) {
        this._align = value;
        this._renderer.setStyle(this._element, 'align-items', value);
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
}

@NgModule({
    declarations: [JigsawBox],
    exports: [JigsawBox]
})
export class JigsawBoxModule {

}
