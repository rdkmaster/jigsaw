import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter, forwardRef, Host, Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2, ViewChild
} from "@angular/core";
import {AbstractJigsawComponent} from "../common";

@Component({
    selector: 'jigsaw-scrollbar-handle',
    templateUrl: './handle.html'
})
export class JigsawScrollHandle implements OnInit {

    private _value: number;

    @Input()
    public get value() {
        return this._value;
    }

    public set value(value) {
        // this setting is only from outside.
        if (this._value === value) return;
        this._value = this._slider._verifyValue(value);
        this._valueToPos();
        if (this.globalEventMouseMove) {
            this.globalEventMouseMove()
        }
    }

    @Output()
    public valueChange = new EventEmitter<number>();

    private _valueToPos() {
        this._offset = this._slider._transformValueToPos(this.value);
        this.setHandleStyle();
    }

    private _offset: number = 0;

    /**
     * @internal
     */
    public _$handleStyle = {};

    private setHandleStyle() {
        if (isNaN(this._offset)) return;

        if (this._slider.vertical) { // 兼容垂直滑动条;
            this._$handleStyle = {
                top: this._offset + "%"
            }
        } else {
            this._$handleStyle = {
                left: this._offset + "%"
            }
        }
    }

    public transformPosToValue(pos, startPos, startValue) {
        // 更新取得的滑动条尺寸.
        this._slider._refresh();
        let dimensions = this._slider._dimensions;

        // bottom 在dom中的位置.
        let offset = this._slider.vertical ? dimensions.top : dimensions.left;
        let size = this._slider.vertical ? dimensions.height : dimensions.width;
        let posValue = this._slider.vertical ? pos.y : pos.x;
        let startPosValue = this._slider.vertical ? startPos.y : startPos.x;

        posValue = posValue > offset ? posValue : offset;

        let newValue = (posValue - startPosValue) / size * (this._slider.max - this._slider.min) + (this._slider.min - 0); // 保留两位小数
        let m = this._calFloat(this._slider.step);

        // 解决出现的有时小数点多了N多位.
        newValue = Math.round(Math.round(newValue / this._slider.step) * this._slider.step * Math.pow(10, m)) / Math.pow(10, m);
        return this._slider._verifyValue(startValue + newValue);
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
        } catch (e) {
        }
        return m;
    }

    /**
     * @internal
     */
    public _$dragToScroll(event) {
        this._slider.dragging = true;

        let startPos = {
            x: event["clientX"],
            y: event["clientY"]
        };
        this._registerGlobalEvent(startPos, this.value);
    }

    globalEventMouseMove: Function;
    globalEventMouseUp: Function;

    _registerGlobalEvent(startPos, startValue) {
        this.globalEventMouseMove = this._render.listen("document", "mousemove", (e) => {
            this._$updateValuePosition(e, startPos, startValue);
        });
        this.globalEventMouseUp = this._render.listen("document", "mouseup", () => {
            this._slider.dragging = false;
            this._destroyGlobalEvent();
        });
    }

    _destroyGlobalEvent() {
        if (this.globalEventMouseMove) {
            this.globalEventMouseMove();
        }

        if (this.globalEventMouseUp) {
            this.globalEventMouseUp();
        }
    }

    private _slider: JigsawScrollbar; // 父组件;

    constructor(private _render: Renderer2, public _elementRef: ElementRef, @Host() @Inject(forwardRef(() => JigsawScrollbar)) slider: JigsawScrollbar) {
        this._slider = slider;
    }

    /**
     * 改变value的值
     * @internal
     */
    public _$updateValuePosition(event, startPos, startValue) {
        if (!this._slider.dragging) return;
        // 防止产生选中其他文本，造成鼠标放开后还可以拖拽的奇怪现象;
        event.stopPropagation();
        event.preventDefault();

        let pos = {
            x: event["clientX"],
            y: event["clientY"]
        };

        let value = this.transformPosToValue(pos, startPos, startValue);

        if (this._value === value) return;
        this._value = this._slider._verifyValue(value);
        this.valueChange.emit(this._value);
        this._valueToPos();
    }

    ngOnInit() {
        this._valueToPos();
    }
}

@Component({
    selector: 'jigsaw-scrollbar, j-scrollbar',
    templateUrl: './scrollbar.html',
    host: {
        '[class.jigsaw-scrollbar]': 'true',
        '[class.jigsaw-scrollbar-dragging]': 'dragging',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[class.jigsaw-scrollbar-vertical]': 'vertical',
        '[class.jigsaw-scrollbar-horizontal]': '!vertical',
    }
})
export class JigsawScrollbar extends AbstractJigsawComponent implements OnInit, OnDestroy, AfterViewInit {

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        super();
    }

    @ViewChild(JigsawScrollHandle) private _sliderHandle: JigsawScrollHandle;

    private _value: number;

    @Input()
    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        if (this._value != value) {
            this._value = this._verifyValue(value);
            this.valueChange.emit(this._value);
        }
    }

    @Output()
    public valueChange = new EventEmitter<number>();

    /**
     * 最后重新计算一下，垂直滚动条的位置
     * @internal
     */
    public _refresh() {
        this._dimensions = this._elementRef.nativeElement.getBoundingClientRect();
    }

    private _min: number = 0;

    /**
     * 可选范围的最小值
     * @returns {number}
     */
    @Input()
    public get min() {
        return this._min;
    }

    public set min(min: number) {
        this._min = min;
    }

    private _max: number = 100;

    /**
     * 输入范围的可选最大值.
     * @returns {number}
     */
    @Input()
    public get max() {
        return this._max;
    }

    public set max(max: number) {
        this._max = max;
    }

    private _step: number = 1;

    /**
     * 每次变化的最小值, 最小支持小数点后两位.
     * @returns {number}
     */
    @Input()
    public get step() {
        return this._step;
    }

    public set step(value: number) {
        this._step = value;
    }

    public _transformValueToPos(value?) {
        // 检验值的合法性, 不合法转换成默认可接受的合法值;
        value = this._verifyValue(value);

        return (value - this.min) / (this.max - this.min) * 100;
    }

    public _dimensions: ClientRect;

    public dragging: boolean;

    /**
     * 垂直滑动条 默认 false
     * @type {boolean}
     */
    @Input()
    public vertical: boolean = false;

    ngOnInit() {
        super.ngOnInit();

        // 计算slider 的尺寸.
        this._dimensions = this._elementRef.nativeElement.getBoundingClientRect();

        // 注册resize事件;
        this.resize();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            if (this.vertical) {
                this._renderer.setStyle(this._elementRef.nativeElement, 'padding-bottom',
                    this._sliderHandle._elementRef.nativeElement.querySelector('.jigsaw-scrollbar-handle').offsetHeight + 'px');
            } else {
                this._renderer.setStyle(this._elementRef.nativeElement, 'padding-right',
                    this._sliderHandle._elementRef.nativeElement.querySelector('.jigsaw-scrollbar-handle').offsetWidth + 'px');
            }
        })
    }

    private _removeResizeEvent: Function;

    private resize() {
        this._removeResizeEvent = this._renderer.listen("window", "resize", () => {
            // 计算slider 的尺寸.
            this._dimensions = this._elementRef.nativeElement.getBoundingClientRect();
        })
    }

    /**
     * 暂没有使用场景.
     */
    public ngOnDestroy() {
        if (this._removeResizeEvent) {
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
