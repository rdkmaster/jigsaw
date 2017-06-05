/**
 * Created by 10177553 on 2017/4/13.
 */
import {
    Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewEncapsulation, ViewChildren, QueryList, Renderer2,
    OnDestroy, ChangeDetectorRef
} from '@angular/core';
import {SliderHandle} from "./handle";
import {CommonUtils} from "../../core/utils/common-utils";

@Component({
    selector: 'rdk-slider',
    templateUrl: './slider.html',
    styleUrls:['./slider.scss'],
    host: {
        'class': 'sliderHost'
    },
    encapsulation: ViewEncapsulation.None
})
/**
 *       4. tooltips 支持. 暂不支持
 *       5. 点击的支持。
 */
export class RdkSlider implements OnInit, OnDestroy {

    constructor(private _element: ElementRef, private _render: Renderer2, private _changeDetector: ChangeDetectorRef) { }

    @ViewChildren(SliderHandle) _sliderHandle: QueryList<SliderHandle>;

    private _value:Array<number> = [];

    @Input()
    public get value():number|number[] {
        // 兼容返回单个值， 和多触点的数组;
        if(!this.range) {
            return this._value[0];
        } else {
            return this._value;
        }
    };
    public set value(value:number| number[]) {
        if(typeof value  === 'object') {
            this._value = value;
        } else if(this._value.length === 0) {
            this._value.push(this._verifyValue(value));
        } else if(this._value.length === 1) {
            this._value[0] = this._verifyValue(value);
        }

        this._setTrackStyle();
    }

    // 设置单个的值
    public setValue(key, value) {
        this._value[key] = value;

        this._setTrackStyle();

        this.valueChange.emit(this.value);
    }

    // 最后重新计算一下, 垂直滚动条的位置.
    public _refresh() {
        this._dimensions = this._element.nativeElement.getBoundingClientRect();
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

    public _transformValueToPos(value?) {
        // 检验值的合法性, 不合法转换成默认可接受的合法值;
        value = this._verifyValue(value);

        return (value - this.min)/(this.max - this.min) * 100;
    }

    public _dimensions;

    @Input()
    public vertical: boolean = false;

    tipFormatter() {
        // Todo 格式化, 弹出信息.
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
            // 取得最大值.最小值, 在它们之间一条轨道.
            if(typeof this.value === 'number') {
                console.error("范围模式下, 取值应该是个数组~");
                return;
            }
            let max: number = this.value[0];
            let min: number = this.value[0];

            this.value.map(item => {
                if (max - item < 0) max = item;
                else if (item - min < 0) min = item;
            });

            startPos = this._transformValueToPos(min);
            trackSize = Math.abs(this._transformValueToPos(max) - this._transformValueToPos(min));
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

    // 多值时选择一个合适的触点. Todo 支持点击
    _updateValuePosition() {
        // let handle = this._sliderHandle.first;
        // Todo
    }

    @Input()
    public marks: [Object];

    _calMarks() {
        if(!this.marks) return;

        let size = Math.round(100/this.marks.length);
        let margin = -Math.floor(size/2);
        let vertical = this.vertical;

        this.marks.forEach(mark => {
            // 添加垂直滚动条的支持;
            if(vertical) {
                mark["dot"] = {
                    bottom: this._transformValueToPos(mark["value"]) + "%",
                }
                mark["componentStyle"] = {
                    bottom: this._transformValueToPos(mark["value"]) + "%",
                    "margin-bottom": margin + "%"
                }
            } else {
                mark["dot"] = {
                    top: "-2px",
                    left: this._transformValueToPos(mark["value"]) + "%",
                }

                mark["componentStyle"] = {
                    left: this._transformValueToPos(mark["value"]) + "%",
                    width: size + "%",
                    "margin-left": margin + "%"
                }
            }
            // 如果用户自定义了样式, 要进行样式的合并;
            CommonUtils.extendObject(mark["componentStyle"], mark["style"]);
        });
    }

    ngOnInit() {
        // 计算slider 的尺寸.
        this._dimensions = this._element.nativeElement.getBoundingClientRect();

        // 设置选中的轨道.
        this._setTrackStyle(this.value);

        // 设置标记.
        this._calMarks();
        // 注册resize事件;
        this.resize();
    }

    private _removeResizeEvent:Function;

    private resize() {
        this._removeResizeEvent = this._render.listen("window", "resize", () => {
            // 计算slider 的尺寸.
            this._dimensions = this._element.nativeElement.getBoundingClientRect();
        })
    }

    /**
     * 暂没有使用场景.
     */
    public ngOnDestroy() {
        if(this._removeResizeEvent) {
            this._removeResizeEvent();
        }
    }

    /**
     * 校验value的合法性. 大于最大值，取最大值, 小于最小值取最小值.
     * @param value
     * @private
     */
    public _verifyValue(value: number) {
        if (value - this.min < 0) {
            return this.min;
        } else if (value - this.max > 0) {
            return this.max;
        } else {
            return value;
        }
    }
}
