import {Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Renderer2} from "@angular/core";
import {IPopupable} from "../../common/service/popup.service";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../common";
import {JigsawBlock, JigsawBlockModule} from "../block/block";

/**
 * Loading组件的基类，自定义Loading组件必须继承这个类。
 *
 * $demo = loading/user-defined
 */
export class JigsawLoadingBase extends AbstractJigsawComponent implements IPopupable {
    public initData: any;
    public answer: EventEmitter<any>;
    public popupElement: HTMLElement;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
        super();
    }

    protected getColorElement(): NodeListOf<Element> {
        return undefined;
    }

    protected _color: string;

    @Input()
    public get color(): string {
        return this._color;
    }

    public set color(rgb: string) {
        this._color = rgb;
        if (this.getColorElement()) {
            this.setElementsStyle(this.getColorElement(), 'backgroundColor', rgb);
        }
    }

    protected getPopupElement(): HTMLElement {
        return this._elementRef.nativeElement;
    }

    public setElementSize(selector: string, width: number | string, height: number | string) {
        this.popupElement = this.getPopupElement();

        if (width && height) {
            this._renderer.setStyle(this.popupElement, 'width', width);
            this._renderer.setStyle(this.popupElement, 'height', height);
            this._renderer.setStyle(this.popupElement.querySelector(selector), 'width', width);
            this._renderer.setStyle(this.popupElement.querySelector(selector), 'height', height);
            this._renderer.setStyle(this.popupElement.querySelector(selector), 'margin-left', '-' + this.popupElement.offsetWidth / 2 + 'px');
            this._renderer.setStyle(this.popupElement.querySelector(selector), 'margin-top', '-' + this.popupElement.offsetHeight / 2 + 'px');
        }
    }

    public setElementsStyle(elements: NodeListOf<Element>, props: string, val: string | boolean | number) {
        for (let index = 0; index < elements.length; ++index) {
            this._renderer.setStyle(elements[index], props, val);
        }
    }

}

@Component({
    selector: 'jigsaw-loading, j-loading',
    templateUrl: 'loading-ring.html'
})
export class JigsawLoading extends JigsawLoadingBase implements OnInit {

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'jigsaw-loading-host');
        super.setElementSize('.loadingProcess', this.width, this.height);
    }

}

@Component({
    selector: 'jigsaw-font-loading, j-font-loading',
    templateUrl: 'loading-font.html'
})
export class JigsawFontLoading extends JigsawLoadingBase implements OnInit {

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'jigsaw-font-loading-host');
        this.setElementSize('.jigsaw-font-loading', this.width, this.height);
    }


    protected getColorElement(): NodeListOf<Element> {
        return this.getPopupElement().querySelectorAll('.jigsaw-font-loading');
    }

    public set color(rgb: string) {
        this._color = rgb;
        if (this.getColorElement()) {
            this.setElementsStyle(this.getColorElement(), 'color', rgb);
        }
    }

    public setElementSize(selector: string, width: number | string, height: number | string) {
        super.setElementSize(selector, width, height);
        if (width && height) {
            this.renderer.setStyle(this.popupElement.querySelector(selector), 'font-size', width);
            this.renderer.setStyle(this.popupElement.querySelector(selector), 'line-height', height);
        }
    }

}

@Component({
    selector: 'jigsaw-bubble-loading, j-bubble-loading',
    templateUrl: 'loading-bubble.html'
})
export class JigsawBubbleLoading extends JigsawLoadingBase implements OnInit {

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'jigsaw-bubble-loading-host');
        super.setElementSize('.spinner', this.width, this.height);
    }


    protected getColorElement(): NodeListOf<Element> {
        return this.getPopupElement().querySelectorAll('.spinner-container > div');
    }

}

@Component({
    selector: 'jigsaw-ball-loading, j-ball-loading',
    templateUrl: 'loading-ball.html'
})
export class JigsawBallLoading extends JigsawLoadingBase implements OnInit  {
    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'jigsaw-ball-loading-host');
    }

    protected getColorElement(): NodeListOf<Element> {
        return this.getPopupElement().querySelectorAll('.jigsaw-loading-content > div');
    }

}

@NgModule({
    imports: [CommonModule, JigsawBlockModule],
    declarations: [JigsawLoading, JigsawBallLoading, JigsawBubbleLoading, JigsawFontLoading],
    exports: [JigsawLoading, JigsawBallLoading, JigsawBubbleLoading, JigsawFontLoading],
    entryComponents: [JigsawBlock, JigsawLoading, JigsawBallLoading, JigsawBubbleLoading, JigsawFontLoading]
})
export class JigsawLoadingModule {

}

