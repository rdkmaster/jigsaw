import {
    NgModule, Component, EventEmitter, Input, Output, ElementRef, ViewChild, AfterContentInit,
    Renderer2, forwardRef
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent} from "../common";
import {CommonUtils} from "../../core/utils/common-utils";

/**
 * 数字输入框
 * - 支持最大值最小值
 * - 支持不可用设置
 * - 支持设置尺寸，有固定的‘small’、‘default’、‘large’，还可以直接设置宽高
 * - 支持设置不同的步长
 *
 * $demo = numeric-input/basic
 */
@Component({
    selector: 'jigsaw-numeric-input, j-numeric-input',
    templateUrl: 'numeric-input.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[style.line-height]': 'height',
        '(click)': '_$stopPropagation($event)',
        '[class.jigsaw-numeric-input]': 'true',
        '[class.jigsaw-numeric-input-disabled]': 'disabled',
        '[class.jigsaw-numeric-input-small]': 'size == "small"',
        '[class.jigsaw-numeric-input-large]': 'size == "large"'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawNumericInput), multi: true},
    ]
})
export class JigsawNumericInput extends AbstractJigsawComponent implements ControlValueAccessor, AfterContentInit {
    constructor(private _render2: Renderer2,
                private _elementRef: ElementRef) {
        super();
    }

    /**
     * 设置不可用
     * @type {boolean}
     *
     * $demo = numeric-input/disabled
     */
    @Input() public disabled: boolean = false;

    /**
     * 输入框的placeholder
     * @type {string}
     *
     * $demo = numeric-input/basic
     */
    @Input() public placeholder = '';

    private _min: number = -Infinity;

    /**
     * 最小值
     * @returns {number}
     *
     * $demo = numeric-input/basic
     */
    @Input()
    public get min(): number {
        return this._min;
    }

    public set min(value: number) {
        if (isNaN(value)) {
            console.error('min property must be a number, please input a number or number string');
            return;
        }
        this._min = Number(value);
    }

    private _max: number = Infinity;

    /**
     * 最大值
     * @returns {number}
     *
     * $demo = numeric-input/basic
     */
    @Input()
    public get max(): number {
        return this._max;
    }

    public set max(value: number) {
        if (isNaN(value)) {
            console.error('max property must be a number, please input a number or number string');
            return;
        }
        this._max = Number(value);
    }

    private _precisionStep: number = 0;
    private _precisionFactor: number = 1;

    private _step: number = 1;

    /**
     * 步长，默认是1
     * @returns {number}
     *
     * $demo = numeric-input/step
     */
    @Input()
    public get step(): number {
        return this._step;
    }

    public set step(value: number) {
        if (isNaN(value)) {
            console.error('step property must be a number, please input a number or number string');
            return;
        }
        this._step = Number(value);
        const stepStr = this._step.toString();
        if (stepStr.indexOf('e-') >= 0) {
            this._precisionStep = parseInt(stepStr.slice(stepStr.indexOf('e-')), 10);
        }
        if (stepStr.indexOf('.') >= 0) {
            this._precisionStep = stepStr.length - stepStr.indexOf('.') - 1;
        }
        this._precisionFactor = Math.pow(10, this._precisionStep);
    }

    private _value: number;

    /**
     * 输入框的值，双绑
     * @returns {number}
     *
     * $demo = numeric-input/basic
     */
    @Input()
    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        if (CommonUtils.isUndefined(value) || this._value == value) {
            return;
        }
        value = Number((value + '').replace(/[^0-9-.]+/, ''));
        if (isNaN(value)) {
            console.error('value property must be a number, please input a number or number string');
            return;
        }

        if (value > this.max) {
            value = this.max;
        }
        if (value < this.min) {
            value = this.min;
        }
        this._value = value;
        this.valueChange.emit(this._value);
        this._propagateChange(this._value);

        this._checkDisabled();
        this._checkInputValue();
    }

    /**
     * 尺寸，默认是‘default’
     * @type {string}
     *
     * $demo = numeric-input/size
     */
    @Input()
    public size: 'small' | 'default' | 'large' = 'default';

    /**
     * 当value改变时，自动发出事件
     * @type {EventEmitter<number>}
     */
    @Output()
    public valueChange: EventEmitter<number> = new EventEmitter<number>();

    /**
     * focus事件
     * @type {EventEmitter<FocusEvent>}
     */
    @Output('focus')
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    /**
     * blur事件
     * @type {EventEmitter<FocusEvent>}
     */
    @Output('blur')
    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ViewChild('input')
    private _inputElement: ElementRef;

    public _$upDisabled: boolean;
    public _$downDisabled: boolean;

    private _checkDisabled() {
        this._$upDisabled = this.value >= this.max;
        this._$downDisabled = this.value <= this.min;
    }

    private _checkInputValue() {
        if (this._inputElement && this._inputElement.nativeElement.value != this.value) {
            this._inputElement.nativeElement.value = this.value;
        }
    }

    /**
     * @internal
     */
    public _$increase(event): void {
        event.preventDefault();
        event.stopPropagation();
        if (CommonUtils.isUndefined(this.value)) {
            this.value = this.min == -Infinity ? 0 : this.min;
        }
        this.value = this._toPrecisionAsStep((this._precisionFactor * this._value +
            this._precisionFactor * this._step) / this._precisionFactor);
    }

    /**
     * @internal
     */
    public _$decrease(event): void {
        event.preventDefault();
        event.stopPropagation();
        if (CommonUtils.isUndefined(this.value)) {
            this.value = this.min == -Infinity ? 0 : this.min;
        }
        this.value = this._toPrecisionAsStep((this._precisionFactor * this._value -
            this._precisionFactor * this._step) / this._precisionFactor);
    }

    private _toPrecisionAsStep(num) {
        if (isNaN(num) || num === '') {
            return num;
        }
        return Number(Number(num).toFixed(this._precisionStep));
    }

    /**
     * 让输入框获取焦点的函数
     */
    public focus() {
        this._focused = true;
        this._inputElement.nativeElement.focus();
    }

    /**
     * 让输入框文本选中的函数
     */
    public select() {
        this._inputElement.nativeElement.select();
    }

    private _focused: boolean = false;

    public get focused(): boolean {
        return this._focused;
    }

    /**
     * @internal
     */
    public _$handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
    }

    @Input()
    public blurOnClear: boolean = true;

    /**
     * @internal
     */
    public _$handleBlur(event: FocusEvent) {
        this._focused = false;
        if (this.blurOnClear) {
            this._blurEmitter.emit(event);
        } else {
            this.callLater(() => {
                if (!this._focused) {
                    this._blurEmitter.emit(event);
                }
            }, 150);
        }
    }

    /**
     * @internal
     */
    public _handleKeyDown(event) {
        if (event.keyCode == 38) {
            this._$increase(event);
        } else if (event.keyCode == 40) {
            this._$decrease(event);
        }
    }

    /**
     * @internal
     */
    public _$stopPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    ngAfterContentInit() {
        this.callLater(() => {
            this._render2.setStyle(this._elementRef.nativeElement, 'opacity', 1);
        });
    }

    private _propagateChange: any = () => {
    };

    public writeValue(value: any): void {
        this.value = value;
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [JigsawNumericInput],
    exports: [JigsawNumericInput],
})
export class JigsawNumericInputModule {

}
