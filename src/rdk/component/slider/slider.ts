/**
 * Created by 10177553 on 2017/4/13.
 */
import {Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2} from '@angular/core';

@Component({
    selector: 'rdk-slider',
    templateUrl: './slider.html',
    styleUrls:['./slider.scss']
})
/**
 * TODO 1. 双触点实现.(这个实现有点难度.. 修改的有点多)
 *       2. 点击事件支持
 *       3. 竖向滚动条支持.
 *       4. tooltips 支持.
 *       5. class 设置的API
 *       6. mark的class
 *       7. api 说明文档, 要不然里面的属性有点多
 */
export class RdkSlider implements OnInit {

    constructor(private _element: ElementRef, private _render: Renderer2) { }

    private _value = 0;

    @Input()
    public get value() { return this._value; };
    public set value(value) {
        this._value = value;
        this._valueToPos();
    }

    private _valueToPos() {
        this._transformValueToPos();
        this.setTrackStyle();
        this.setHandleStyle();
    }

    @Output()
    public valueChange = new  EventEmitter<number>();

    @Output()
    public change = this.valueChange;

    @Input()
    public range: boolean = false;

    private _min: number = 0;
    @Input()
    public get min() { return this._min; }
    public set min(min) {
        this._min = min;
    }

    private _max: number = 100;
    @Input()
    public get max() { return this._max; }
    public set max(max) {
        this._max = max;
    }

    private _step: number = 1;
    @Input()
    public get step() { return this._step; }
    public set step(value) {
        this._step = value;
    }

    private _width: number;

    private _transformValueToPos(value?) {
        if(!value) {
            this._width = (this.value - this.min)/(this.max - this.min) * 100;
        } else {
            return (value - this.min)/(this.max - this.min) * 100;
        }
    }

    private _transformPosToValue(pos) {
        // 取得尺寸
        let offset = this._dimensions.left;
        let size = this._dimensions.width;

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
        } catch(e) {

        }
        return m;
    }

    private _dimensions;

    tipFormatter() {
        // Todo 格式化, 弹出信息.
    }

    // 改变value的值;
    private _updateValuePosition() {
        if(!this._dragged|| this.disabled) return;

        let pos = {
            x: event["clientX"],
            y: event["clientY"]
        }

        let newValue = this._transformPosToValue(pos);

        if(this.value === newValue) return ;

        this.value = newValue;

        this.valueChange.emit(newValue);
    }

    private _dragged = false;

    _updateCanDragged(flag) {
        this._registerGlobalEvent();
        this._dragged = flag;
        // Todo 增加取消事件注册的方法调用
    }

    @Input()
    public disabled: boolean = false;

    private _trackStyle = {}

    private setTrackStyle() {
        // 兼容双触点.
        let startPos: number = 0;
        let trackWidth: number = this._width;

        // 兼容双触点.
        if(this.range) {
            startPos = Math.min(this.value[0], this.value[1]);
            trackWidth = Math.abs(this.value[0] - this.value[1]);
        }

        this._trackStyle = {
            left: startPos + "%",
            width: trackWidth + "%"
        }
    }

    private _handleStyle = {}

    private setHandleStyle() {
        this._handleStyle = {
            left: this._width + "%"
        }
    }

    @Input()
    marks: [Object];

    _calMarks() {
        if(!this.marks) return;

        let width = Math.round(100/this.marks.length);
        let marginLeft = -Math.floor(width/2);
        let style = {
            "width": width,
            "margin-left": marginLeft
        }
        this.marks.forEach(mark => {
            mark["left"] = this._transformValueToPos(mark["value"]);
            mark["width"] = width;
            mark["marginLeft"] = marginLeft;
        });
    }

    _registerGlobalEvent() {
        this._render.listen("document", "mousemove", () => {
            this._updateValuePosition();
        });
        this._render.listen("document", "mouseup", () => {
            this._dragged = false;
        });
    }

    ngOnInit() {
        // 计算slider 的尺寸.
        this._dimensions = this._element.nativeElement.getBoundingClientRect();

        this._valueToPos();

        this._calMarks();
    }

}
