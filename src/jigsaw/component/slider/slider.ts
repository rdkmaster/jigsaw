/**
 * Created by 10177553 on 2017/4/13.
 */
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    Renderer2,
    ViewChildren,
    ViewEncapsulation
} from "@angular/core";
import {JigsawSliderHandle} from "./handle";
import {CommonUtils} from "../../core/utils/common-utils";
import {ArrayCollection} from "../../core/data/array-collection";
import {CallbackRemoval} from "../../core/data/component-data";
import {AbstractJigsawComponent, IJigsawComponent} from "../core";

export class SliderMark {
    value: number;
    label: string;
    style?: any;
}

/**
 * @description 滑动条组件.
 *
 * 何时使用
 * 当用户需要在数值区间/自定义区间内进行选择时
 */
@Component({
    selector: 'jigsaw-slider',
    templateUrl: './slider.html',
    styleUrls: ['./slider.scss'],
    host: {
        'class': 'jigsaw-slider-host'
    },
    encapsulation: ViewEncapsulation.None
})
/**
 *       4. tooltips 支持. 暂不支持
 *       5. 点击的支持。
 */
export class JigsawSlider extends AbstractJigsawComponent implements OnInit, OnDestroy {

    constructor(private _element: ElementRef, private _render: Renderer2) {
        super();
    }

    // Todo 支持滑动条点击.
    @ViewChildren(JigsawSliderHandle) private _sliderHandle: QueryList<JigsawSliderHandle>;

    /**
     * @internal
     */
    public _$value: ArrayCollection<number> = new ArrayCollection<number>();
    private _removeRefreshCallback: CallbackRemoval;

    /**
     * slider的当前值, 类型 number | ArrayCollection<number> 支持多触点.
     * @returns {any}
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
        if (value instanceof ArrayCollection) {
            this._$value = value;
        } else {
            this._$value.splice(0, this._$value.length);
            this._$value.push(this._verifyValue(value));
        }

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
        }
        this._removeRefreshCallback = this._$value.onRefresh(() => {
            this._setTrackStyle(this.value);
            this.valueChange.emit(this.value);
        });
    }

    /**
     * 设置单个的值。内部使用
     *
     * @param index
     * @param value
     * @private
     */
    public _setValue(index: number, value: number) {
        this._$value.set(index, value);
        this._$value.refresh();
    }

    // 最后重新计算一下, 垂直滚动条的位置.
    public _refresh() {
        this._dimensions = this._element.nativeElement.getBoundingClientRect();
    }

    /**
     * 可以不用理会, 主要使 value 支持双向绑定
     * @type {EventEmitter<number|ArrayCollection<number>>}
     */
    @Output()
    public valueChange = new EventEmitter<number | ArrayCollection<number>>();

    // 当滑动条的组件值变化时，对外发出的事件
    @Output()
    public change = this.valueChange;

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

    public _dimensions;

    /**
     * 垂直滑动条 默认 false
     * @type {boolean}
     */
    @Input()
    public vertical: boolean = false;

    // tipFormatter() {
    //     // Todo 格式化, 弹出信息.
    // }

    /**
     * 是否禁用. 数据类型 boolean, 默认false;
     * @type {boolean}
     */
    @Input()
    public disabled: boolean = false;

    /**
     * @internal
     */
    public _$trackStyle = {};

    private _setTrackStyle(value?) {
        // 兼容双触点.
        let startPos: number = 0;
        let trackSize: number = typeof value !== 'undefined' ? this._transformValueToPos(value) : this._transformValueToPos(this.value); // 默认单触点位置

        if (this._$value.length > 1) {
            let max: number = this._$value[0];
            let min: number = this._$value[0];

            this._$value.map(item => {
                if (max - item < 0) max = item;
                else if (item - min < 0) min = item;
            });

            startPos = this._transformValueToPos(min);
            trackSize = Math.abs(this._transformValueToPos(max) - this._transformValueToPos(min));
        }

        if (this.vertical) { // 垂直和水平两种
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

    // 多值时选择一个合适的触点. Todo 支持点击
    // _updateValuePosition() {
    //     // let handle = this._sliderHandle.first;
    //     // Todo
    // }

    /**
     * @internal
     */
    public _$marks: any[] = [];
    private _marks: SliderMark[];

    /**
     * marks 标签 使用格式为  [Object] 其中 Object 必须包含value 及label 可以有style 属性 例如:  marks = [{value: 20, label: '20 ℃'},
     */
    @Input()
    public get marks(): SliderMark[] {
        return this._marks;
    }

    public set marks(value: SliderMark[]) {
        this._marks = value;
        this._calcMarks();
    }

    private _calcMarks() {
        if (!this._marks || !this.initialized) return;

        this._$marks.splice(0, this._$marks.length);
        let size = Math.round(100 / this._marks.length);
        let margin = -Math.floor(size / 2);
        let vertical = this.vertical;

        this._marks.forEach(mark => {
            const richMark:any = {};
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
            this._$marks.push(richMark);
        });
    }

    ngOnInit() {
        super.ngOnInit();

        // 计算slider 的尺寸.
        this._dimensions = this._element.nativeElement.getBoundingClientRect();

        // 设置选中的轨道.
        this._setTrackStyle(this.value);

        // 设置标记.
        this._calcMarks();
        // 注册resize事件;
        this.resize();
    }

    private _removeResizeEvent: Function;

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
        if (this._removeResizeEvent) {
            this._removeResizeEvent();
        }

        if (this._removeRefreshCallback) {
            this._removeRefreshCallback()
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
