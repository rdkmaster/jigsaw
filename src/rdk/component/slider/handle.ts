/**
 * Created by 10177553 on 2017/4/19.
 */

import {
    Input, Output, EventEmitter, Renderer2, Component, OnInit, ViewEncapsulation
} from "@angular/core";

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
    public get value() { return this._value; }
    public set value(value) {
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

    private _handleStyle = {}

    private setHandleStyle() {

        if(isNaN(this._offset)) return;

        if(this.vertical) { // 兼容垂直滑动条;
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
        this._offset = (this.value - this.min)/(this.max - this.min) * 100;
    }

    _dragged: boolean = false;

    disabled: boolean = false;

    @Input()
    public dimensions;

    @Input()
    public max: number;

    @Input()
    public min: number;

    @Input()
    public step: number;

    @Input()
    public vertical: boolean = false;

    public transformPosToValue(pos) {
        // 取得尺寸
        // 滚动条,减去全局滚动条的位置.
        let top = document.body.scrollTop;
        let left = document.body.scrollLeft;

        let offset = this.vertical?this.dimensions.bottom - top:this.dimensions.left - left;
        let size = this.vertical?this.dimensions.height:this.dimensions.width;
        let posValue = this.vertical? pos.y-38: pos.x;

        if(this.vertical) {
            posValue = posValue > offset? offset:posValue;
        } else {
            posValue = posValue < offset? offset:posValue;
        }

        let newValue = ((Math.abs(posValue - offset)) / size * (this.max - this.min) + this.min); // 保留两位小数

        let m = this._calFloat(this.step);

        // 解决出现的有时小数点多了N多位.
        newValue = Math.round(Math.round(newValue / this.step) * this.step * Math.pow(10, m)) / Math.pow(10, m);

        if (newValue < this.min) {
            return this.min;
        } else if (newValue > this.max) {
            return this.max;
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
            m = this.step.toString().split(".")[1].length;
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
        this.globalEventMouseMove = this._render.listen("document", "mousemove", () => {
            this.updateValuePosition();
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

    // 改变value的值;
    private updateValuePosition() {
        if(!this._dragged|| this.disabled) return;

        let pos = {
            x: event["clientX"],
            y: event["clientY"]
        }

        let newValue = this.transformPosToValue(pos);

        if(this.value === newValue) return ;

        this.value = newValue;

        this.change.emit(newValue);
    }

    constructor(private _render: Renderer2) { }

    ngOnInit() {
        this._valueToPos();
    }
}
