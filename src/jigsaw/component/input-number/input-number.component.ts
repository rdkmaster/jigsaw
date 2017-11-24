import { Component, ViewEncapsulation, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild, HostBinding, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractJigsawComponent } from "../common";

@Component({
    selector: 'jigsaw-numeric-input',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JigsawInputNumberComponent),
            multi: true
        }
    ],
})

export class JigsawInputNumberComponent extends AbstractJigsawComponent implements OnInit, ControlValueAccessor {
    _el: HTMLElement;
    _value: number;
    _size = 'default';
    _prefixCls = 'jigsaw-input-number';
    _step = 1;
    _precisionStep = 0;
    _precisionFactor = 1;
    _displayValue;
    _disabledUp = false;
    _disabledDown = false;
    _focused = false;
    _mouseInside = false;
    // ngModel Access
    onChange: any = Function.prototype;
    onTouched: any = Function.prototype;
    @ViewChild('inputNumber') _inputNumber: ElementRef;

    @Input() PlaceHolder = '';
    @Input() min: number = -Infinity;
    @Input() max: number = Infinity;

    @Input() @HostBinding('class.jigsaw-input-number-disabled') disabled = false;

    @Input()
    get preSize(): string {
        return this._size;
    };

    set preSize(value: string) {
        this._renderer.removeClass(this._el, `${this._prefixCls}-${this._size}`);
        this._size = { large: 'lg', small: 'sm' }[ value ];
        this._renderer.addClass(this._el, `${this._prefixCls}-${this._size}`);
    }

    // @Input()
    // get width(): string {
    //     return this._size;
    // };
    //
    // set width(value: string) {
    //     this._renderer.removeClass(this._el, `${this._prefixCls}-${this._size}`);
    //     this._renderer.setStyle(this._inputNumber.nativeElement, 'width', value);
    // }
    //
    // @Input()
    // get height(): string {
    //     return this._size;
    // };
    //
    // set height(value: string) {
    //     this._renderer.removeClass(this._el, `${this._prefixCls}-${this._size}`);
    //     this._renderer.setStyle(this._inputNumber.nativeElement, 'height', value);
    // }

    @Input()
    get step(): number {
        return this._step;
    }

    set step(value: number) {
        this._step = value;
        const stepString = value.toString();
        if (stepString.indexOf('e-') >= 0) {
            this._precisionStep = parseInt(stepString.slice(stepString.indexOf('e-')), 10);
        }
        if (stepString.indexOf('.') >= 0) {
            this._precisionStep = stepString.length - stepString.indexOf('.') - 1;
        }
        this._precisionFactor = Math.pow(10, this._precisionStep);
    }

    @Output() nzBlur: EventEmitter<MouseEvent> = new EventEmitter();
    @Output() nzFocus: EventEmitter<MouseEvent> = new EventEmitter();

    _numberUp($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this._inputNumber.nativeElement.focus();
        if (this.jigsawValue === undefined) {
            this.jigsawValue = this.min || 0;
        }
        if (!this._disabledUp) {
            this.jigsawValue = this.toPrecisionAsStep((this._precisionFactor * this.jigsawValue + this._precisionFactor * this.step) / this._precisionFactor);
        }
    }

    _numberDown($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this._inputNumber.nativeElement.focus();
        if (this.jigsawValue === undefined) {
            this.jigsawValue = this.min || 0;
        }
        if (!this._disabledDown) {
            this.jigsawValue = this.toPrecisionAsStep((this._precisionFactor * this.jigsawValue - this._precisionFactor * this.step) / this._precisionFactor);
        }
    }

    get jigsawValue(): number {
        return this._value;
    };

    set jigsawValue(value: number) {
        this._updateValue(value);
    }

    _emitBlur($event) {
        // avoid unnecessary events
        if (this._focused && !this._mouseInside) {
            this._checkValue();
            this._focused = false;
            this.nzBlur.emit($event);
        }
        this.onTouched();
    }

    _emitFocus($event) {
        // avoid unnecessary events
        if (!this._focused) {
            this._focused = true;
            this.nzFocus.emit($event);
        }
    }

    _emitKeydown($event) {
        if ($event.keyCode === 9 && this._focused) {
            this._focused = false;
            this.nzBlur.emit($event);
        }
        else if ($event.keyCode === 38 && this._focused) {
            this._numberUp($event);
        }
        else if ($event.keyCode === 40 && this._focused) {
            this._numberDown($event);
        }

    }

    _userInputChange() {
        const numberValue = +this._displayValue;
        if (this._isNumber(numberValue) && (numberValue <= this.max) && (numberValue >= this.min)) {
            this.jigsawValue = numberValue;
        }
    }

    _checkValue() {
        this._displayValue = this.jigsawValue;
    }

    _getBoundValue(value) {
        if (value > this.max) {
            return this.max;
        } else if (value < this.min) {
            return this.min;
        } else {
            return value;
        }
    }

    _isNumber(value) {
        return !isNaN(value) && isFinite(value)
    }

    toPrecisionAsStep(num) {
        if (isNaN(num) || num === '') {
            return num;
        }
        return Number(Number(num).toFixed(this._precisionStep));
    }

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
        super();
        this._el = this._elementRef.nativeElement;
        this._renderer.addClass(this._el, `${this._prefixCls}`);
    }

    writeValue(value: any): void {
        // this.jigsawValue = value;
        this._updateValue(value, false);
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    private _updateValue(value: number, emitChange = true) {
        if (this._value === value) {
            return;
        }
        this._value = this._getBoundValue(value);
        this._displayValue = this._value;
        this._inputNumber.nativeElement.value = this._value;
        if (emitChange) {
            this.onChange(this._value);
        }
        this._disabledUp = (this.jigsawValue !== undefined) && !((this.jigsawValue + this.step) <= this.max);
        this._disabledDown = (this.jigsawValue !== undefined) && !((this.jigsawValue - this.step) >= this.min);
    }
}
