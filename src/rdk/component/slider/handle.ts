/**
 * Created by 10177553 on 2017/4/19.
 */

import {
    Input, Output, EventEmitter, Renderer2, Component, ViewEncapsulation, OnInit, Optional
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

        this._handleStyle = {
            left: this._offset + "%"
        }
        console.info(this._handleStyle);
    }

    private _transformValueToPos() {
        this._offset = (this.value - this.min)/(this.max - this.min) * 100;
    }

    _dragged: boolean = false;

    disabled: boolean = false;

    @Input()
    dimensions;

    @Input() max: number;

    @Input() min: number;

    @Input() step: number;

    public transformPosToValue(pos) {
        // 取得尺寸
        let offset = this.dimensions.left;
        let size = this.dimensions.width;

        let newValue = ((pos.x - offset) / size * (this.max - this.min) + this.min); // 保留两位小数

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
        console.info(flag);
        console.info("this._dragged:" + this._dragged);

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
            this._updateValuePosition();
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
    private _updateValuePosition() {
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
