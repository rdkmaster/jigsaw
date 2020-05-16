import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule, NgZone,
    Output,
    ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../../common/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {JigsawFloatModule} from "../../common/directive/float";
import {IPopupable} from "../../common/service/popup.service";

@Component({
    selector: 'jigsaw-time-picker, j-time-picker',
    templateUrl: './time-picker.html',
    host: {
        '[class.jigsaw-time-picker]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
        '(keydown)': '_$handleKeyDown($event)'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTimePicker), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTimePicker extends AbstractJigsawComponent implements ControlValueAccessor {
    constructor(private _cdr: ChangeDetectorRef, protected _zone: NgZone) {
        super(_zone);
    }

    private _value: string = '00:00:00';

    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        if(!value || value == this._value) return;
        this.writeValue(value);
        [this._$hour, this._$minute, this._$second] = value.split(':');
    }

    @Output()
    public valueChange = new EventEmitter<string>();

    @ViewChild('hour') private _hourInput: ElementRef;
    @ViewChild('minute') private _minuteInput: ElementRef;
    @ViewChild('second') private _secondInput: ElementRef;

    private _hour: string = '00';

    public get _$hour(): string {
        return this._hour;
    }

    public set _$hour(value: string) {
        if(value == this._hour) return;
        this._hour = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > 23 ? '23' : value;
        this._updateInputValue('hour', this._hour);
        if(this.initialized && this._hour.length > 1) {
            this._updateValue();
            this._minuteInput.nativeElement.select();
            this._$selectMode = 'minute';
        }
    }

    private _minute: string = '00';

    public get _$minute(): string {
        return this._minute;
    }

    public set _$minute(value: string) {
        if(value == this._minute) return;
        this._minute = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > 59 ? '59' : value;
        this._updateInputValue('minute', this._minute);
        if(this.initialized && this._minute.length > 1) {
            this._updateValue();
            this._secondInput.nativeElement.select();
            this._$selectMode = 'second';
        }
    }

    private _second: string = '00';

    public get _$second(): string {
        return this._second;
    }

    public set _$second(value: string) {
        if(value == this._second) return;
        this._second = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > 59 ? '59' : value;
        this._updateInputValue('second', this._second);
        if(this.initialized && this._second.length > 1) {
            this._updateValue();
        }
    }

    public _$floatTarget = JigsawTimeSelect;

    public _$selectMode: 'hour' | 'minute' | 'second' | 'none' = 'none';

    public _$handleSelectMode(mode: 'hour' | 'minute' | 'second') {
        this._$selectMode = mode;
        if(mode == 'hour') {
            this._hourInput.nativeElement.select();
        } else if(mode == 'minute') {
            this._minuteInput.nativeElement.select();
        } else if(mode == 'second') {
            this._secondInput.nativeElement.select();
        }
    }

    public _$cancelSelect(mode: 'hour' | 'minute' | 'second') {
        this._checkFormat(mode);
        this._$selectMode = 'none';
        this._updateValue();
    }

    private _checkFormat(mode: 'hour' | 'minute' | 'second') {
        if(mode == 'hour') {
            this._$hour = (Number(this._$hour) < 10 ? '0' : '') + Number(this._$hour);
        }
        if(mode == 'minute') {
            this._$minute = (Number(this._$minute) < 10 ? '0' : '') + Number(this._$minute);
        }
        if(mode == 'second') {
            this._$second = (Number(this._$second) < 10 ? '0' : '') + Number(this._$second);
        }
    }

    private _updateInputValue(mode: 'hour' | 'minute' | 'second', value) {
        if(mode == 'hour' && this._hourInput && this._hourInput.nativeElement.value != value) {
            this._hourInput.nativeElement.value = value;
        }
        if(mode == 'minute' && this._minuteInput && this._minuteInput.nativeElement.value != value) {
            this._minuteInput.nativeElement.value = value;
        }
        if(mode == 'second' && this._secondInput && this._secondInput.nativeElement.value != value) {
            this._secondInput.nativeElement.value = value;
        }
    }

    private _updateValue() {
        this.writeValue([this._$hour, this._$minute, this._$second].join(':'));
    }

    public _$handleKeyDown($event, mode: 'hour' | 'minute' | 'second') {
        if ($event.keyCode == 38) {
            this._$handleCtrlBarClick($event, 1);
        } else if ($event.keyCode == 40) {
            this._$handleCtrlBarClick($event, -1);
        }
    }

    public _$handleCtrlBarClick($event, add: number) {
        $event.preventDefault();
        $event.stopPropagation();
        if(this._$selectMode == 'hour') {
            let value = String(Number(this._$hour) + add);
            this._hour = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > 23 ? '23' : value;
            this._updateInputValue('hour', this._hour);
        } else if(this._$selectMode == 'minute') {
            let value = String(Number(this._$minute) + add);
            this._minute = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > 59 ? '59' : value;
            this._updateInputValue('minute', this._minute);
        } else if (this._$selectMode == 'second') {
            let value = String(Number(this._$second) + add);
            this._second = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > 59 ? '59' : value;
            this._updateInputValue('second', this._second);
        }
    }

    public writeValue(newValue: string): void {
        if(!newValue || newValue == this._value) return;
        this._value = newValue;
        this.valueChange.emit(newValue);
        this._propagateChange();
    }

    private _propagateChange: any = () => {
    };

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}

@Component({
    selector: 'jigsaw-time-select, j-time-select',
    templateUrl: 'time-select.html',
    host: {
        '[class.jigsaw-time-select]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTimeSelect implements IPopupable {
    private _value: string;

    public get initData(): string {
        return this._value
    }

    public set initData(value: string) {
        if (!value || value != this._value) {
            return;
        }
        this._value = value;

    }

    private _createTimeSelect(hour?: number, minute?: number, second?: number) {
        this._$hourList = Array.from(new Array(24).keys()).map(h => ({value: h++, isSelected: false}));
        this._$minuteList = Array.from(new Array(60).keys()).map(m => ({value: m++, isSelected: false}));
        this._$secondList = Array.from(new Array(60).keys()).map(s => ({value: s++, isSelected: false}));
    }

    public _$hourList = Array.from(new Array(24).keys()).map(h => ({value: h++, isSelected: false}));
    public _$minuteList = Array.from(new Array(60).keys()).map(m => ({value: m++, isSelected: false}));
    public _$secondList = Array.from(new Array(60).keys()).map(s => ({value: s++, isSelected: false}));

    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawFloatModule,],
    declarations: [JigsawTimePicker, JigsawTimeSelect],
    exports: [JigsawTimePicker, JigsawTimeSelect]
})
export class JigsawTimePickerModule {

}
