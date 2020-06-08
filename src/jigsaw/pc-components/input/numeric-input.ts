import {
    NgModule, Component, EventEmitter, Input, Output, ElementRef, ViewChild, forwardRef, ChangeDetectionStrategy
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent} from "../../common/common";
import {CommonUtils} from "../../common/core/utils/common-utils";

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
        '(click)': '_$stopPropagation($event)',
        '[class.jigsaw-numeric-input]': 'true',
        '[class.jigsaw-numeric-input-disabled]': 'disabled',
        '[class.jigsaw-numeric-input-small]': 'size == "small"',
        '[class.jigsaw-numeric-input-large]': 'size == "large"',
        '[class.jigsaw-numeric-input-error]': '!valid',
        '[class.jigsaw-numeric-input-focused]': 'focused'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawNumericInput), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawNumericInput extends AbstractJigsawComponent implements ControlValueAccessor {
    @Input()
    public valid: boolean = true;

    /**
     * 设置不可用
     *
     *
     * $demo = numeric-input/disabled
     */
    @Input() public disabled: boolean = false;

    /**
     * 输入框的placeholder
     *
     *
     * $demo = numeric-input/basic
     */
    @Input() public placeholder = '';

    private _min: number = -Infinity;

    /**
     * 最小值
     *
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
     *
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
     *
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
     *
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
        if (isNaN(value) && <any>value !== "-") {
            value = this.min == -Infinity ? 0 : this.min;
            console.error('value property must be a number, please input a number or number string');
        }

        if (<any>value === "" || <any>value === "-" || Number(value) < this.min) {
            // 正在输入的数值会在blur的时候处理
            this._value = value;
            return;
        }

        value = Number(value);
        if (value > this.max) {
            value = this.max;
        }
        this._value = value;
        this._updateValue();
    }

    /**
     * 尺寸，默认是‘default’
     *
     *
     * $demo = numeric-input/size
     */
    @Input()
    public size: 'small' | 'default' | 'large' = 'default';

    /**
     * 当value改变时，自动发出事件
     *
     */
    @Output()
    public valueChange: EventEmitter<number> = new EventEmitter<number>();

    /**
     * focus事件
     *
     */
    @Output('focus')
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    /**
     * blur事件
     *
     */
    @Output('blur')
    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ViewChild('input')
    private _inputElement: ElementRef;

    /**
     * @internal
     */
    public _$upDisabled: boolean;
    /**
     * @internal
     */
    public _$downDisabled: boolean;

    private _updateValue() {
        this.valueChange.emit(this._value);
        this._propagateChange(this._value);
        this._checkDisabled();
        this._checkInputValue();
    }

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
        if (CommonUtils.isUndefined(this.value) || this._value < this.min || isNaN(this._value) || <any>this._value === "") {
            // 非法的value取最小值
            this.value = this.min == -Infinity ? 0 : this.min;
        } else {
            this.value = this._toPrecisionAsStep((this._precisionFactor * this._value +
                this._precisionFactor * this._step) / this._precisionFactor);
        }
    }

    /**
     * @internal
     */
    public _$decrease(event): void {
        event.preventDefault();
        event.stopPropagation();
        if (CommonUtils.isUndefined(this.value) || this._value < this.min || isNaN(this._value) || <any>this._value === "") {
            // 非法的value取最小值
            this.value = this.min == -Infinity ? 0 : this.min;
        } else {
            let tempValue = this._toPrecisionAsStep((this._precisionFactor * this._value -
                this._precisionFactor * this._step) / this._precisionFactor);
            if (tempValue < this.min) {
                this.value = this.min;
            } else {
                this.value = tempValue;
            }
        }
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
        if (this._value < this.min || isNaN(this._value) || <any>this._value === "") {
            this._value = this.min == -Infinity ? 0 : this.min;
            this._updateValue();
        }
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
