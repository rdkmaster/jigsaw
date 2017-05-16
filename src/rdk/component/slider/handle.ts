/**
 * Created by 10177553 on 2017/4/19.
 */

import {
    Input, Output, EventEmitter, Renderer2, Component, OnInit, ViewEncapsulation, forwardRef, Inject, Host
} from "@angular/core";
import {RdkSlider} from "./slider";

@Component({
    selector: 'slider-handle',
    templateUrl: './handle.html',
    encapsulation: ViewEncapsulation.None
})
export class SliderHandle implements OnInit{

    private _value: number;

    @Input()
    public key: number;

    @Input()
    public dimensions;

    @Input()
    public get value() { return this._value; }
    public set value(value) {
        if(this._value === value) return;

        this._value = value;
        this._valueToPos();
    }

    @Output()
    public change = new  EventEmitter<number>();

    private _valueToPos() {
        this._transformValueToPos();
        this.setHandleStyle();
    }

    private _offset: number = 0;

    private _handleStyle = {};

    private setHandleStyle() {
        if(isNaN(this._offset)) return;

        if(this._slider.vertical) { // 兼容垂直滑动条;
            this._handleStyle = {
                bottom: this._offset + "%"
            }
        } else {
            this._handleStyle = {
                left: this._offset + "%"
            }
        }
    }

    private _transformValueToPos() {
        this._offset = (this.value - this._slider.min)/(this._slider.max - this._slider.min) * 100;
    }

    private _dragged: boolean = false;

    public transformPosToValue(pos) {
        // 取得尺寸
        // 滚动条,减去全局滚动条的位置.
        let top = document.body.scrollTop;
        let left = document.body.scrollLeft;

        // bottom 在dom中的位置.
        let offset = this._slider.vertical?this.dimensions.bottom - top:this.dimensions.left - left;
        let size = this._slider.vertical?this.dimensions.height:this.dimensions.width;
        let posValue = this._slider.vertical? pos.y-56: pos.x;

        if(this._slider.vertical) {
            posValue = posValue > offset? offset:posValue;
        } else {
            posValue = posValue < offset? offset:posValue;
        }

        let newValue = Math.abs(posValue - offset) / size * (this._slider.max - this._slider.min) + (this._slider.min-0); // 保留两位小数

        let m = this._calFloat(this._slider.step);

        // 解决出现的有时小数点多了N多位.
        newValue = Math.round(Math.round(newValue / this._slider.step) * this._slider.step * Math.pow(10, m)) / Math.pow(10, m);

        if (newValue < this._slider.min) {
            return this._slider.min;
        } else if (newValue > this._slider.max) {
            return this._slider.max;
        } else {
            return newValue;
        }
    }

    /**
     * 计算需要保留小数的位数.
     * @param value
     * @private
     */
    _calFloat(value: number): number {
        // 增加步长的计算;
        let m = 0;
        try {
            m = this._slider.step.toString().split(".")[1].length;
        } catch(e) { }
        return m;
    }

    _updateCanDragged(flag) {
        this._dragged = flag;

        if(flag) {
            this._registerGlobalEvent();
        } else {
            this._destroyGlobalEvent();
        }
    }

    globalEventMouseMove: Function;
    globalEventMouseUp: Function;

    _registerGlobalEvent() {
        this.globalEventMouseMove = this._render.listen("document", "mousemove", (e) => {
            this.updateValuePosition(e);
        });
        this.globalEventMouseUp = this._render.listen("document", "mouseup", () => {
            this._dragged = false;
            this._destroyGlobalEvent();
        });

    }

    _destroyGlobalEvent() {
        if(this.globalEventMouseMove) { this.globalEventMouseMove(); }

        if(this.globalEventMouseUp)  { this.globalEventMouseUp(); }
    }

    private _slider:RdkSlider; // 父组件;

    constructor(private _render: Renderer2,@Host() @Inject(forwardRef(() => RdkSlider)) slider: RdkSlider) {
        this._slider = slider;
    }

    // 改变value的值;
    private updateValuePosition(event?) {
        if(!this._dragged|| this._slider.disabled) return;

        // 防止产生选中其他文本，造成鼠标放开后还可以拖拽的奇怪现象;
        event.stopPropagation();
        event.preventDefault();

        let pos = {
            x: event["clientX"],
            y: event["clientY"]
        }

        let newValue = this.transformPosToValue(pos);

        if(this.value === newValue) return;

        this.value = newValue;

        this._slider.setValue(this.key, newValue);
    }

    ngOnInit() {
        this._valueToPos();
    }
}
