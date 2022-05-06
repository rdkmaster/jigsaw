/**
 * Created by 10177553 on 2017/4/13.
 */
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Host,
    HostListener,
    Inject,
    Injector,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    ViewChildren,
    ViewEncapsulation,
    ViewChild
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CallbackRemoval, CommonUtils} from "../../common/core/utils/common-utils";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {AbstractJigsawComponent, AbstractJigsawViewBase, WingsTheme} from "../../common/common";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {JigsawTooltip} from "../../common/directive/tooltip/tooltip";
import {FloatPosition} from "../../common/directive/float/float";

export class SliderMark {
    value: number;
    label: string;
    style?: any;
}

/**
 * @internal
 */
@Component({
    selector: 'jigsaw-slider-handle',
    templateUrl: './slider-handle.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSliderHandle extends AbstractJigsawViewBase implements OnInit {

    private _value: number;

    /**
     * @internal
     */
    public _$tooltipRenderHtml: string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public index: number;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value() {
        return this._value;
    }

    public set value(value) {
        this._value = this._slider._verifyValue(value);
        this._valueToPos();
        this._$tooltipRenderHtml = `<div style="word-break: normal;">${this._value}</div>`
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public tooltipPosition: FloatPosition = 'top';

    @Output()
    public change = new EventEmitter<number>();

    private _valueToPos() {
        this._offset = this._slider._transformValueToPos(this.value);
        this._setHandleStyle();
    }

    private _offset: number = 0;

    /**
     * @internal
     */
    public _$handleStyle = {};

    private _setHandleStyle() {
        if (isNaN(this._offset)) {
            return;
        }
        if (this._slider.vertical) {
            this._$handleStyle = {
                bottom: this._offset + "%"
            }
        } else {
            this._$handleStyle = {
                left: this._offset + "%"
            }
        }
        this._cdr.markForCheck();
    }

    private _dragging: boolean = false;

    private _transformPosToValue(pos: { x: number, y: number }): number {
        // 更新取得的滑动条尺寸.
        this._slider._refresh();
        const dimensions = this._slider._dimensions;

        // bottom 在dom中的位置.
        const offset = this._slider.vertical ? dimensions.bottom : dimensions.left;
        const size = this._slider.vertical ? dimensions.height : dimensions.width;
        let posValue = this._slider.vertical ? pos.y - 6 : pos.x;

        if (this._slider.vertical) {
            posValue = posValue > offset ? offset : posValue;
        } else {
            posValue = posValue < offset ? offset : posValue;
        }

        let newValue = Math.abs(posValue - offset) / size * (this._slider.max - this._slider.min) + (this._slider.min - 0); // 保留两位小数
        const m = this._calFloat(this._slider.step);
        // 解决出现的有时小数点多了N多位.
        newValue = Math.round(Math.round(newValue / this._slider.step) * this._slider.step * Math.pow(10, m)) / Math.pow(10, m);

        return this._slider._verifyValue(newValue);
    }

    /**
     * 增加步长的计算，计算需要保留小数的位数
     */
    private _calFloat(value: number): number {
        try {
            return this._slider.step.toString().split(".")[1].length;
        } catch (e) {
            return 0;
        }
    }

    /**
     * @internal
     */
    public _$startToDrag(): void {
        this._tooltip.jigsawFloatCloseTrigger = 'none';
        this._dragging = true;
        this._registerGlobalEvent();
    }

    private _removeGlobalEventMouseMoveListener: Function;
    private _removeGlobalEventMouseUpListener: Function;

    private _registerGlobalEvent(): void {
        if (this._removeGlobalEventMouseMoveListener) {
            this._removeGlobalEventMouseMoveListener();
        }
        this._removeGlobalEventMouseMoveListener = this._render.listen("document", "mousemove", (e) => {
            this._updateValuePosition(e);
        });

        if (this._removeGlobalEventMouseUpListener) {
            this._removeGlobalEventMouseUpListener();
        }
        this._removeGlobalEventMouseUpListener = this._render.listen("document", "mouseup", () => {
            this._dragging = false;
            this._destroyGlobalEvent();
        });
    }

    private _destroyGlobalEvent() {
        if (this._removeGlobalEventMouseMoveListener) {
            this._removeGlobalEventMouseMoveListener();
        }
        if (this._removeGlobalEventMouseUpListener) {
            this._removeGlobalEventMouseUpListener();
        }
        this._tooltip.jigsawFloatCloseTrigger = 'mouseleave';
    }

    /**
     * 父组件
     * @private
     */
    private _slider: JigsawSlider;

    constructor(private _render: Renderer2, @Host() @Inject(forwardRef(() => JigsawSlider)) slider: any,
                protected _zone: NgZone, private _cdr: ChangeDetectorRef) {
        super();
        this._slider = slider;
    }

    @ViewChild(JigsawTooltip)
    private _tooltip: JigsawTooltip;

    /**
     * 改变value的值
     */
    private _updateValuePosition(event?) {
        if (!this._dragging || this._slider.disabled) {
            return;
        }

        // 防止产生选中其他文本，造成鼠标放开后还可以拖拽的奇怪现象;
        event.stopPropagation();
        event.preventDefault();

        const pos = {
            x: event["clientX"],
            y: event["clientY"]
        };

        let newValue = this._transformPosToValue(pos);

        if (this.value === newValue) {
            return;
        }

        this.value = newValue;

        this._slider._updateValue(this.index, newValue);
        this.runAfterMicrotasks(() => {
            this._tooltip.reposition();
        });
    }

    ngOnInit() {
        this._valueToPos();
    }
}

/**
 * @description 滑动条组件.
 *
 * 何时使用
 * 当用户需要在数值区间/自定义区间内进行选择时
 */
@WingsTheme('slider.scss')
@Component({
    selector: 'jigsaw-slider, j-slider',
    templateUrl: './slider.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-slider-host]': 'true',
        '[class.jigsaw-slider-error]': '!valid',
        '[class.jigsaw-slider-vertical]': 'vertical',
    },
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawSlider), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawSlider extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, OnDestroy {

    constructor(private _element: ElementRef, private _render: Renderer2,
                protected _zone: NgZone, private _changeDetectorRef: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public valid: boolean = true;

    // Todo 支持滑动条点击.
    @ViewChildren(JigsawSliderHandle)
    private _sliderHandle: QueryList<JigsawSliderHandle>;

    /**
     * @internal
     */
    public get _$trackBy() {
        return (index: number) => index;
    }

    /**
     * @internal
     */
    public _$value: ArrayCollection<number> = new ArrayCollection<number>();
    private _removeRefreshCallback: CallbackRemoval = this._getRemoveRefreshCallback();

    /**
     * slider的当前值, 类型 number | ArrayCollection<number> 支持多触点
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get value(): number | ArrayCollection<number> {
        // 兼容返回单个值， 和多触点的数组;
        if (this._$value.length == 1) {
            return this._$value[0];
        } else {
            return this._$value;
        }
    }

    public set value(value: number | ArrayCollection<number>) {
        this.writeValue(value);
    }

    /**
     * 设置单个的值。内部使用
     * 子级组件需要用到
     * @internal
     */
    public _updateValue(index: number, value: number) {
        this._$value.set(index, value);
        this._$value.refresh();
        this._changeDetectorRef.markForCheck();
    }

    /**
     * 最后重新计算一下，垂直滚动条的位置
     * 子级组件需要用到
     * @internal
     */
    public _refresh() {
        this._dimensions = this._element.nativeElement.getBoundingClientRect();
        this._changeDetectorRef.markForCheck();
    }

    /**
     * 使 value 支持双向绑定
     */
    @Output()
    public valueChange = new EventEmitter<number | ArrayCollection<number>>();

    // 当滑动条的组件值变化时，对外发出的事件
    @Output()
    public change = this.valueChange;

    private _min: number = 0;

    /**
     * 可选范围的最小值
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get min():number {
        return this._min;
    }

    public set min(min: number) {
        min = Number(min);
        if (isNaN(min)) {
            return;
        }
        this._min = min;
    }

    private _max: number = 100;

    /**
     * 输入范围的可选最大值.
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get max():number {
        return this._max;
    }

    public set max(max: number) {
        max = Number(max);
        if (isNaN(max)) {
            return;
        }
        this._max = Number(max);
    }

    private _step: number = 1;

    /**
     * 每次变化的最小值, 最小支持小数点后两位.
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public get step() {
        return this._step;
    }

    public set step(value: number) {
        this._step = value;
    }

    /**
     * 子级组件需要用到
     * @internal
     */
    public _transformValueToPos(value?) {
        // 检验值的合法性, 不合法转换成默认可接受的合法值;
        value = this._verifyValue(value);

        return (value - this.min) / (this.max - this.min) * 100;
    }

    /**
     * 子级组件需要用到
     * @internal
     */
    public _dimensions: ClientRect;

    /**
     * 垂直滑动条 默认 false
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public vertical: boolean = false;

    /**
     * 是否禁用. 数据类型 boolean, 默认false;
     */
    @Input()
    @RequireMarkForCheck()
    public disabled: boolean = false;

    /**
     * @internal
     */
    public _$trackStyle = {};

    private _setTrackStyle() {
        let startPos: number = 0;
        let trackSize: number = 0;
        if (this._$value.length > 1) {
            // 多触点
            let min: number = Math.min(...this._$value);
            let max: number = Math.max(...this._$value);
            startPos = this._transformValueToPos(min);
            trackSize = Math.abs(this._transformValueToPos(max) - this._transformValueToPos(min));
        } else {
            // 单触点
            trackSize = this._transformValueToPos(this.value);
        }
        if (this.vertical) {
            this._$trackStyle = {
                bottom: startPos + "%",
                height: trackSize + "%"
            }
        } else {
            this._$trackStyle = {
                left: startPos + "%",
                width: trackSize + "%"
            }
        }
    }

    /**
     * @internal
     */
    public _$marks: any[] = [];
    private _marks: SliderMark[];

    /**
     * marks 标签 使用格式为  [Object] 其中 Object 必须包含value 及label 可以有style 属性
     * 例如:  marks = [{value: 20, label: '20 ℃'},
     */
    @Input()
    @RequireMarkForCheck()
    public get marks(): SliderMark[] {
        return this._marks;
    }

    public set marks(value: SliderMark[]) {
        this._marks = value;
        this._calcMarks();
    }

    /**
     * @internal
     * @param markVal
     */
    public _$isDotActive(markVal: number): boolean {
        if (this._$value.length == 1) {
            return markVal < this.value;
        } else {
            const min = Math.min(...this._$value);
            const max = Math.max(...this._$value);
            return markVal >= min && markVal <= max;
        }
    }

    private _calcMarks() {
        if (!this._marks || !this.initialized) {
            return;
        }

        this._$marks.splice(0, this._$marks.length);
        let size = Math.round(100 / this._marks.length);
        let margin = -Math.floor(size / 2);
        let vertical = this.vertical;

        this._marks.forEach(mark => {
            const richMark: any = {};
            if (vertical) {
                richMark.dotStyle = {
                    bottom: this._transformValueToPos(mark.value) + "%"
                };
                richMark.labelStyle = {
                    bottom: this._transformValueToPos(mark.value) + "%",
                    "margin-bottom": margin + "%"
                };
            } else {
                richMark.dotStyle = {
                    top: "-2px",
                    left: this._transformValueToPos(mark.value) + "%"
                };
                richMark.labelStyle = {
                    left: this._transformValueToPos(mark.value) + "%",
                    width: size + "%", "margin-left": margin + "%"
                };
            }
            // 如果用户自定义了样式, 要进行样式的合并;
            CommonUtils.extendObject(richMark.labelStyle, mark.style);
            richMark.label = mark.label;
            richMark.value = mark.value;
            this._$marks.push(richMark);
        });
    }

    ngOnInit() {
        super.ngOnInit();

        // 计算slider 的尺寸.
        this._dimensions = this._element.nativeElement.getBoundingClientRect();

        // 设置标记.
        this._calcMarks();
        // 注册resize事件;
        this._resize();
    }

    private _removeResizeEvent: Function;

    private _resize() {
        this._zone.runOutsideAngular(() => {
            this._removeResizeEvent = this._render.listen("window", "resize", () => {
                // 计算slider 的尺寸.
                this._dimensions = this._element.nativeElement.getBoundingClientRect();
            })
        })
    }

    /**
     * 暂没有使用场景.
     */
    public ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeResizeEvent) {
            this._removeResizeEvent();
        }
        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
    }

    /**
     * 校验value的合法性. 大于最大值，取最大值, 小于最小值取最小值
     * 子级组件需要用到
     * @internal
     */
    public _verifyValue(value: number): number {
        if (value - this.min < 0 && this.initialized) {
            return this.min;
        } else if (value - this.max > 0 && this.initialized) {
            return this.max;
        } else {
            return value;
        }
    }

    private _getRemoveRefreshCallback() {
        return this._$value.onRefresh(() => {
            this._zone.runOutsideAngular(() => this._setTrackStyle());
            this._updateSliderHandleValue();
            this.valueChange.emit(this.value);
            this._propagateChange(this.value);
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * 手动更新handle的值，通过ngFor更新必须value发生变化，如max变化也需要调整位置
     * @private
     */
    private _updateSliderHandleValue() {
        if(!this._sliderHandle || !this._$value) {
            return;
        }
        this._sliderHandle.forEach((item, index) => item.value = this._$value[index])
    }

    private _propagateChange: any = () => {
    };
    private _onTouched: any = () => {
    };

    // ngModel触发的writeValue方法，只会在ngOnInit,ngAfterContentInit,ngAfterViewInit这些生命周期之后才调用
    public writeValue(value: any): void {
        if (value instanceof Array) {
            value = new ArrayCollection(value);
        }
        if (value instanceof ArrayCollection) {
            if (this._$value !== value) {
                this._$value = value;
                if (this._removeRefreshCallback) {
                    this._removeRefreshCallback();
                }
                this._removeRefreshCallback = this._getRemoveRefreshCallback();
            }
        } else {
            this._$value.splice(0, this._$value.length);
            this._$value.push(this._verifyValue(+value));
        }

        // refresh的回调是异步的
        this._$value.refresh();
        this._changeDetectorRef.markForCheck();
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    @HostListener('click')
    onClickTrigger(): void {
        if (this.disabled) {
            return;
        }
        this._onTouched();
    }

    public setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }
}
