import { Component, ElementRef, EventEmitter, Input, NgModule, OnInit, Renderer2, Directive, ChangeDetectorRef, AfterViewChecked, NgZone } from "@angular/core";
import { IPopupable } from "../../service/popup.service";
import { CommonModule } from "@angular/common";
import {AbstractJigsawComponent, WingsTheme} from "../../common";
import { JigsawBlockModule } from "../block/block";

/**
 * Loading组件的基类，自定义Loading组件必须继承这个类。
 *
 * $demo = loading/user-defined
 */
@Directive()
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

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get color(): string {
        return this._color;
    }

    public set color(rgb: string) {
        this._color = rgb;
        this.runMicrotask(() => {
            if (this.getColorElement()) {
                this.setElementsStyle(this.getColorElement(), 'backgroundColor', rgb);
            }
        })
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

@WingsTheme('circle-loading.scss')
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

@WingsTheme('loading-font.scss')
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
        this.runMicrotask(() => {
            if (this.getColorElement()) {
                this.setElementsStyle(this.getColorElement(), 'color', rgb);
            }
        })
    }

    public setElementSize(selector: string, width: number | string, height: number | string) {
        super.setElementSize(selector, width, height);
        if (width && height) {
            this.renderer.setStyle(this.popupElement.querySelector(selector), 'font-size', width);
            this.renderer.setStyle(this.popupElement.querySelector(selector), 'line-height', height);
        }
    }

}

@WingsTheme('loading-bubble.scss')
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

@WingsTheme('loading-ball.scss')
@Component({
    selector: 'jigsaw-ball-loading, j-ball-loading',
    templateUrl: 'loading-ball.html'
})
export class JigsawBallLoading extends JigsawLoadingBase implements OnInit {
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

@WingsTheme('circle-loading.scss')
@Component({
    selector: 'jigsaw-circle-loading-svg, j-circle-loading-svg',
    templateUrl: 'loading-circle-svg.html'
})
export class JigsawCircleLoadingSVG extends JigsawLoadingBase implements OnInit {
    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'jigsaw-circle-loading-host');
    }
}

@WingsTheme('circle-loading.scss')
@Component({
    selector: "jigsaw-circle-loading, j-circle-loading",
    templateUrl: "loading-circle.html",
    host: {
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-circle-loading-host]': 'true',
    }
})
export class JigsawCircleLoading extends JigsawLoadingBase implements OnInit {
    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
        super(renderer, elementRef);
    }

    ngOnInit() {
        let parent = this.renderer.parentNode(this.elementRef.nativeElement);
        let sibling = parent.querySelector('jigsaw-block');
        if (sibling){
            this.renderer.addClass(
                this.elementRef.nativeElement,
                "jigsaw-circle-loading-within-mask"
            );
        }
    }

    private _size: "small" | "medium" | "large" = "large";

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get size(): "small" | "medium" | "large" {
        return this._size;
    }

    public set size(value: "small" | "medium" | "large") {
        this._size = value;
        let circleWidth = 66;
        let currentStroke = 6;
        let currentWidth = 78;
        let circumference = circleWidth * Math.PI;
        if (value === "large") {
            circleWidth = 66;
            currentStroke = 6;
            currentWidth = circleWidth + currentStroke * 2;
            circumference = circleWidth * Math.PI;
        } else if (value === "medium") {
            circleWidth = 38;
            currentStroke = 4;
            currentWidth = circleWidth + currentStroke * 2;
            circumference = circleWidth * Math.PI;
        } else if (value === "small") {
            circleWidth = 22;
            currentStroke = 2;
            currentWidth = circleWidth + currentStroke * 2;
            circumference = circleWidth * Math.PI;
        }

        this._$radius = circleWidth / 2;
        this._$center = currentWidth / 2;
        this._$svgWidth = currentWidth;
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', currentWidth + "px");
        this.renderer.setStyle(this.elementRef.nativeElement, 'height', currentWidth + "px");
        this._$strokeWidth = currentStroke;
        this.elementRef.nativeElement.querySelector(".jigsaw-circle-loading-svg-bar")
            .style.strokeDasharray = `${circumference},${circumference}`;
        this.elementRef.nativeElement.querySelector(".jigsaw-circle-loading-svg-bar")
            .style.strokeDashoffset = `0`;
    }

    /**
     * @internal
     */
    public _$radius = 33;

    /**
     * @internal
     */
    public _$center = 39;

    /**
     * @internal
     */
    public _$svgWidth = 78;

    /**
     * @internal
     */
    public _$strokeWidth = 6;

    /**
     * @internal
     */
    public get _$percent(): string {
        const fractions = this.size == 'large' ? 2 : 1;
        return this._$validPercent ? this.percent.toFixed(fractions) : '--';
    }

    private _percent: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get percent(): number {
        return this._percent;
    }

    public set percent(value: number) {
        this._percent = typeof value != 'number' ? parseFloat(value) : value;
    }

    /**
     * @internal
     */
    public get _$validPercent(): boolean {
        return !isNaN(this.percent);
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public label: string = '';
}

@NgModule({
    imports: [CommonModule, JigsawBlockModule],
    declarations: [JigsawLoading, JigsawBallLoading, JigsawBubbleLoading, JigsawFontLoading, JigsawCircleLoading],
    exports: [JigsawLoading, JigsawBallLoading, JigsawBubbleLoading, JigsawFontLoading, JigsawCircleLoading]
})
export class JigsawLoadingModule {
}

