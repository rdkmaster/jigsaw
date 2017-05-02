/**
 * Created by 10177553 on 2017/4/13.
 */
import {
    Component, OnInit, Input, Output, EventEmitter, ElementRef
} from '@angular/core';

@Component({
    selector: 'rdk-slider',
    templateUrl: './slider.html',
    styleUrls:['./slider.scss']
})
/**
 *       3. 竖向滑动条支持.
 *       4. tooltips 支持. 暂不支持
 *       5. class 设置的API. 暂不支持.
 *       6. mark的class . 没有支持成功. 没发现哪里写的有问题.
 *       7. api 说明文档, 要不然里面的属性有点多, 有点难找.
 *       8. 双触点再向外传值支持;
 */
export class RdkSlider implements OnInit {

    constructor(private _element: ElementRef) { }

    private _handleValue1: number;

    private _handleValue2: number;

    private _value:Array<number> = [];

    @Input()
    public get value() {
        // 兼容返回单个值， 和多触点的数组;
        if(!this.range) {
            return this._value[0];
        } else {
            return [this._handleValue1, this._handleValue2];
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

        this._generateHandleValues();
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

    private _transformValueToPos(value?) {
        return (value - this.min)/(this.max - this.min) * 100;
    }

    private _dimensions;

    @Input()
    public vertical: boolean = false;

    tipFormatter() {
        // Todo 格式化, 弹出信息.
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
        let trackSize: number = typeof value !== 'undefined'?this._transformValueToPos(value):this._transformValueToPos(this.value); // 默认单触点位置

        // 兼容双触点.
        if(this.range) {
            startPos = Math.min(this._handleValue1, this._handleValue2);
            trackSize = Math.abs(this._handleValue1 - this._handleValue2);
        }

        if(this.vertical) { // 垂直和水平两种
          this._trackStyle = {
              bottom: startPos + "%",
              height: trackSize + "%"
          }
        } else {
            this._trackStyle = {
                left: startPos + "%",
                width: trackSize + "%"
            }
        }
    }

    _updateCanDragged(flag) {
        this._dragged = flag;
    }

    @Input()
    public marks: [Object];

    _handleValueChange(key, value) {

        if(value !== this.value) {

            if(key === 0) {
                this._handleValue1 = value;
            } else {
                this._handleValue2 = value;
            }

            if(this.range) {
                // [this._handleValue1, this._handleValue2]
                this.valueChange.emit();
            } else {
                this.valueChange.emit(value);
            }

            // 设置值域的变化.
            this._setTrackStyle(value);
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
        console.info("尺寸: ");
        console.info(this._dimensions);
        // 设置选中的轨道.
        this._setTrackStyle(this.value);

        // 设置标记.
        this._calMarks();
    }

    private _generateHandleValues() {
        if(this._value.length === 1 ) {
            this._handleValue1 = this._value[0];
        } else {
            this._handleValue1 = this._value[0];
            this._handleValue2 = this._value[1];
        }
    }
}
