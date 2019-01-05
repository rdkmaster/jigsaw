import {Component, ViewEncapsulation, EventEmitter, Input, OnInit, Output, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractJigsawComponent} from "../common";

@Component({
    selector: 'jigsaw-rate, j-rate',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './rate.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JigsawRateComponent),
            multi: true
        }
    ],
})
export class JigsawRateComponent extends AbstractJigsawComponent implements OnInit, ControlValueAccessor {
    /**
     * @internal
     */
    public _$starArray: Array<any> = [];
    /**
     * @internal
     */
    public _$classMap: any;

    // 鼠标悬浮时的星数，为正整数，和_hasHalf配合使用
    private _hoverValue: number = 0;
    private _prefixCls: string = 'jigsaw-rate';
    private _innerPrefixCls: string = `${this._prefixCls}-star`;
    private _value: number = 0;
    private _hasHalf: boolean = false;
    private _floatReg: RegExp = /^\d+(\.\d+)?$/;   // 小数判断

    private _onChange = (value: number) => {
    };
    private _onTouched = () => {
    };

    private _icon: string = 'fa fa-star';

    @Input()
    public get icon(): string {
        return this._icon;
    }

    public set icon(icon: string) {
        this._icon = icon;
    }

    private _max: number = 5;

    @Input()
    public get max(): number {
        return this._max;
    }

    public set max(value: number) {
        this._max = value;
    }

    private _allowHalf: boolean = false;

    @Input()
    public set allowHalf(value: boolean) {
        this._allowHalf = !!value;
    }

    @Input()
    public get value(): number {
        return this._value;
    };

    public set value(value: number) {
        if (this._value === value) {
            return;
        }
        this._value = value;
        if (this._floatReg.test(value + '')) {
            value += 0.5;
            this._hasHalf = true;
        }
        this._hoverValue = value;
    }

    @Output()
    public valueChange: EventEmitter<number> = new EventEmitter<number>();

    private _disabled: boolean = false;

    @Input()
    public get disabled(): boolean {
        return this._disabled;
    }

    public set disabled(value: boolean) {
        this._disabled = value;
        this._setClassMap();
    }

    private _setClassMap(): void {
        this._$classMap = {
            [this._prefixCls]: true,
            [`${this._prefixCls}-disabled`]: this._disabled
        };
    }

    private _setChildrenClassMap(): void {
        let index = 0;
        while (index < this._max) {
            this._$starArray.push(index++);
        }
    }

    /**
     * @internal
     */
    public _$clickRate(event: any, index: number, isFull:boolean = false): void {
        event.stopPropagation();
        if (this._disabled) {
            return;
        }
        this._hoverValue = this._value = index + 1;
        this._hasHalf = !isFull && this._allowHalf;
        if (this._hasHalf) {
            this._value -= 0.5;
        }
        this._onChange(this._value);
        this.valueChange.emit(this.value);
    }

    /**
     * @internal
     */
    public _$hoverRate(event: any, index: number, isFull:boolean = false): void {
        event.stopPropagation();
        if (this._disabled) {
            return;
        }
        const isHalf: boolean = !isFull && this._allowHalf;
        // 如果星数一致，则不作操作，用于提高性能
        if (this._hoverValue === index + 1 && isHalf === this._hasHalf) {
            return;
        }

        this._hoverValue = index + 1;
        this._hasHalf = isHalf;
    }

    private _leaveRate(event): void {
        event.stopPropagation();
        let oldVal = this._value;
        if (this._floatReg.test(oldVal + '')) {
            oldVal += 0.5;
            this._hasHalf = true;
        }
        this._hoverValue = oldVal;
    }

    /**
     * @internal
     */
    public _$setClasses(idx: number): any {
        return {
            [this._innerPrefixCls]: true,
            [`${this._innerPrefixCls}-full`]: (idx + 1 < this._hoverValue) || (!this._hasHalf) && (idx + 1 === this._hoverValue),
            [`${this._innerPrefixCls}-half`]: (this._hasHalf) && (idx + 1 === this._hoverValue),
            [`${this._innerPrefixCls}-active`]: (this._hasHalf) && (idx + 1 === this._hoverValue),
            [`${this._innerPrefixCls}-zero`]: (idx + 1 > this._hoverValue)
        };
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => {}): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnInit() {
        this._setClassMap();
        this._setChildrenClassMap();
    }
}
