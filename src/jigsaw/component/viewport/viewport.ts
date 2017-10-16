import {Component, Input, NgModule} from "@angular/core";
import {BigTableData} from "../../core/data/table-data";
import {CommonModule} from "@angular/common";
import {JigsawScrollbarModule} from "../scrollbar/index";
import {JigsawSliderModule} from "../slider/index";

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
export class JigsawViewport {

    private _data: BigTableData;

    @Input()
    get data(): BigTableData {
        return this._data;
    }

    set data(value: BigTableData) {
        if (value instanceof BigTableData) {
            this._data = value;
        } else if (value) {
            console.warn('this data is not BigTableData')
        }
    }

    @Input()
    public step: number = 1;

    public _$showSlider: boolean;

    public _$handleMouseEnter() {
        console.log('mouse enter trigger');
        console.log(this._data);
        this._$showSlider = true;
    }

    public _$handleMouseLeave() {
        console.log('mouse leave trigger');
        this._$showSlider = false;
    }

    wheelDelta: string;

    public _$handleMouseWheel(e) {
        console.log('mouse wheel trigger');
        e.preventDefault();
        e.stopPropagation();
        if (e.wheelDelta) {  // IE，chrome滑轮事件
            if (e.wheelDelta > 0) { // 当滑轮向上滚动时
                this.wheelDelta = "滑轮向上滚动";
                this._scrollUp();
            }
            if (e.wheelDelta < 0) { // 当滑轮向下滚动时
                this.wheelDelta = "滑轮向下滚动";
                this._scrollDown();
            }
        } else if (e.detail) {  // Firefox滑轮事件
            if (e.detail < 0) { // 当滑轮向下滚动时
                this.wheelDelta = "滑轮向下滚动";
                this._scrollUp();
            }
            if (e.detail > 0) { // 当滑轮向上滚动时
                this.wheelDelta = "滑轮向上滚动";
                this._scrollDown();
            }
        }
    }

    private _scrollDown() {
        if (this.data.viewPort.verticalTo < this.data.origin.data.length) {
            if (this.data.viewPort.verticalTo + this.step < this.data.origin.data.length) {
                this.data.viewPort.verticalTo = this.data.viewPort.verticalTo + this.step;
            } else {
                this.data.viewPort.verticalTo = this.data.origin.data.length;
            }
        }
    }

    private _scrollUp() {
        if (this.data.viewPort.verticalTo > 0) {
            if (this.data.viewPort.verticalTo - this.step > 0) {
                this.data.viewPort.verticalTo = this.data.viewPort.verticalTo - this.step;
            } else {
                this.data.viewPort.verticalTo = 0;
            }
        }
    }

}

@NgModule({
    imports: [JigsawScrollbarModule, CommonModule, JigsawSliderModule],
    declarations: [JigsawViewport],
    exports: [JigsawViewport]
})
export class JigsawViewportModule {

}
