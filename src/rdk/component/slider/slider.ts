/**
 * Created by 10177553 on 2017/4/13.
 */
import {
    Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer2, ViewEncapsulation,
    ViewChildren, QueryList
} from '@angular/core';
import {SliderHandle} from "./handle";

@Component({
    selector: 'rdk-slider',
    templateUrl: './slider.html',
    styleUrls:['./slider.scss'],
    encapsulation: ViewEncapsulation.None
})
/**
 * TODO 1. 双触点实现.(待完善, 修改的有点多. 修改的有点挂了了. 有个问题不知道为什么, 提交一个半成品. 准备重新整理一下心情, 再把剩下的补全)
 *       3. 竖向滚动条支持.
 *       4. tooltips 支持. 暂不支持
 *       5. class 设置的API. 暂不支持.
 *       6. mark的class . 没有支持成功. 没发现哪里写的有问题.
 *       7. api 说明文档, 要不然里面的属性有点多, 有点难找.
 */
export class RdkSlider implements OnInit {

    constructor(private _element: ElementRef, private _render: Renderer2) { }

    private _value:Array<number> = [];

    @ViewChildren(SliderHandle) _handles: QueryList<SliderHandle>;

    @Input()
    public get value() {
        if(this._value.length === 1) {
            return this._value[0]
        } else {
            return this._value;
        }

    };
    public set value(value) {
        if(typeof value  === 'object') {
            this._value = value;
        } else if(this._value.length === 0) {
            this._value.push(value);
        } else if(this._value.length === 1) {
            this._value[0] = value;
        }

        this._setTrackStyle();
    }

    @Output()
    public valueChange = new  EventEmitter<number| Array<number>>();

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

    private _offset: number;

    private _transformValueToPos(value?) {
        if(!value) {
            let temp = Number(this.value);
            this._offset = (temp - this.min)/(this.max - this.min) * 100;
        } else {
            return (value - this.min)/(this.max - this.min) * 100;
        }
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

        let newValue = this._handles.first.transformPosToValue(pos);

        this.valueChange.emit(newValue);
    }

    // 改变value的值;
    private _clickPosition() {
        let pos = {
            x: event["clientX"],
            y: event["clientY"]
        }
    }

    private _dragged = false;

    @Input()
    public disabled: boolean = false;

    private _trackStyle = {}

    private _setTrackStyle(value?) {
        // 兼容双触点.
        let startPos: number = 0;
        let trackWidth: number = typeof value !== 'undefined'?this._transformValueToPos(value):this._transformValueToPos(this.value); // 默认单触点位置

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

    _updateCanDragged(flag) {
        this._dragged = flag;
    }

    @Input()
    public marks: [Object];

    _newValue: Array<number> = [];

    _handleValueChange(key, value) {

        if(value !== this.value) {

            // this._setNewValue(value, key);

            if(this.range) {
                this.valueChange.emit(this._newValue);
            } else {
                this.valueChange.emit(value);
            }

            // 设置值域的变化.
            this._setTrackStyle(value);
        }
    }

    private _setNewValue(value, key?) {
        if(typeof value  === 'object') {
            this._newValue = value;
        } else if(this._newValue.length === 0) {
            this._newValue.push(value);
        } else if(this._newValue.length === 1) {
            this._newValue[0] = value;
        } else {
            this._newValue[key] = value;
        }
    }

    _calMarks() {
        if(!this.marks) return;

        let width = Math.round(100/this.marks.length);
        let marginLeft = -Math.floor(width/2);

        this.marks.forEach(mark => {
            mark["left"] = this._transformValueToPos(mark["value"]);
            mark["width"] = width;
            mark["marginLeft"] = marginLeft;
        });
    }

    ngOnInit() {
        // 计算slider 的尺寸.
        this._dimensions = this._element.nativeElement.getBoundingClientRect();

        // 设置新值;
        this._setNewValue(this.value);

        // 设置选中的轨道.
        this._setTrackStyle();

        // 设置标记.
        this._calMarks();
    }

}
