import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgModule, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ViewportData} from "../../common/core/data/component-data";
import {JigsawScrollbarModule} from "../scrollbar/index";
import {JigsawSliderModule} from "../slider/index";
import {AbstractJigsawComponent} from "../../common/common";

/**
 * 视口滚动时所发出的事件里所携带的数据。
 */
export class ViewportScrollEvent {
    /**
     * 本次滚动所发生的方向，分别是水平和垂直。
     */
    direction: "horizontal" | "vertical";
    /**
     * 本次滚动到的位置，需要配合`direction`来确定是哪个方向上的滚动。
     */
    scrollTo: number
}

/**
 * 为一个视口增加滚动条，让视口可以在整体可视区域中调整位置，具体用法请参考[这个demo]($demo=table/big-table)。
 */
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

    /**
     * 滚动条在垂直方向上的偏移量，例如让滚动条跳过表格的表头，这样会让滚动条与表格的视觉效果更佳。
     * 一般来说，默认皮肤下，JigsawTable的表头高度为42px。
     *
     * @type {number}
     */
    @Input()
    public verticalOffset: number = 0;

    /**
     * 视口数据，这些数据描述了视口尺寸、位置，及其整体可视区域的尺寸等信息，
     * `JigsawViewport`通过修改这些数据达到调整视口位置、尺寸等的目的。
     */
    @Input()
    public viewport: ViewportData;

    /**
     * 鼠标滑轮每移动一次，视口位置偏移的单位数。笼统的讲，这个数值越大，滚动条越敏感。
     * “视口”是一个抽象的概念，视口位置偏移量也是抽象的，这个偏移量的单位是在视口设计时给定的。
     * 例如`BigTableData`所设计的视口，在垂直方向上的单位是记录数，即视口的每一个单位代表着表格的一行。
     *
     * @type {number}
     */
    @Input()
    public step: number = 1;

    /**
     * 视口在发生滚动时，`JigsawViewport`会不停的发出此事件
     *
     * @type {EventEmitter<ViewportScrollEvent>}
     */
    @Output()
    public scroll = new EventEmitter<ViewportScrollEvent>();

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
    public _$handleViewChange(scrollTo: number, direction: "horizontal" | "vertical") {
        this.scroll.emit({direction, scrollTo});
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
