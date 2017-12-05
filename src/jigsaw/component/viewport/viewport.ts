import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, Input, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ViewportData} from "../../core/data/component-data";
import {JigsawScrollbarModule} from "../scrollbar/index";
import {JigsawSliderModule} from "../slider/index";
import {AbstractJigsawComponent} from "../common";

@Component({
    selector: 'jigsaw-viewport, j-viewport',
    templateUrl: './viewport.html',
    host: {
        '[class.jigsaw-viewport]': 'true',
        '(mouseenter)': '_$handleMouseEnter()',
        '(mouseleave)': '_$handleMouseLeave()',
        '(mousewheel)': '_$handleMouseWheel($event)', // Chrome IE
        '(DOMMouseScroll)': '_$handleMouseWheel($event)' // firefox
    }
})
export class JigsawViewport extends AbstractJigsawComponent implements AfterViewChecked {

    @Input()
    public verticalOffset: number = 0;

    @Input()
    public viewport: ViewportData;

    @Input()
    public step: number = 1;

    constructor(private _elementRef: ElementRef, private _changeDetector: ChangeDetectorRef) {
        super();
        this._height = '0px';
    }

    ngAfterViewChecked() {
        const originHeight = this._height;
        const height = this._elementRef.nativeElement.offsetHeight - this.verticalOffset;
        this._height = (height > 0 ? height : 0) + 'px';
        if (this._height != originHeight) {
            this._changeDetector.detectChanges();
        }
    }

    /**
     * @internal
     */
    public _$showSlider: boolean;

    /**
     * @internal
     */
    public _$handleMouseEnter() {
        this._$showSlider = true;
    }

    /**
     * @internal
     */
    public _$handleMouseLeave() {
        this._$showSlider = false;
    }

    /**
     * @internal
     */
    public _$handleMouseWheel(e) {
        e.preventDefault();
        e.stopPropagation();

        let sign = 0;
        if (e.wheelDelta && e.wheelDelta > 0) {
            // 当IE or chrome滑轮向上滚动时
            sign = -1;
        }
        if (e.wheelDelta && e.wheelDelta < 0) {
            // 当IE or chrome滑轮向下滚动时
            sign = 1;
        }
        if (e.detail && e.detail < 0) {
            // 当Firefox滑轮向上滚动时
            sign = -1;
        }
        if (e.detail && e.detail > 0) {
            // 当Firefox滑轮向下滚动时
            sign = 1;
        }
        this.viewport.verticalTo = this.viewport.verticalTo + sign * this.step;
    }
}

@NgModule({
    imports: [JigsawScrollbarModule, CommonModule, JigsawSliderModule],
    declarations: [JigsawViewport],
    exports: [JigsawViewport]
})
export class JigsawViewportModule {
}
