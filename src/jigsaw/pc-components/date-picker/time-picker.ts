import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    NgZone,
    Output,
    ViewChild,
    OnDestroy
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AbstractJigsawComponent} from "../../common/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {JigsawFloatModule} from "../../common/directive/float";
import {IPopupable} from "../../common/service/popup.service";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TimeGr, TimeService} from "../../common/service/time.service";
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export type TimeSelectMode = 'hour' | 'minute' | 'second';
export type TimeStep = 1 | 5 | 10;
export type TimePopupValue = { mode: TimeSelectMode, value: string, step: TimeStep };
export type TimePopupItem = {value: string, isSelected: boolean};

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
export class JigsawTimePicker extends AbstractJigsawComponent implements ControlValueAccessor, OnDestroy {
    constructor(private _cdr: ChangeDetectorRef, protected _zone: NgZone) {
        super(_zone);
        this._removeUpdateValueSubscriber = this._updateValue.pipe(debounceTime(300)).subscribe(() => {
            this.writeValue([this._$hour, this._$minute, this._$second].join(':'));
        })
    }

    private _value: string = '00:00:00';

    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        if (!value || value == this._value) return;
        this.writeValue(value);
        [this._$hour, this._$minute, this._$second] = value.split(':');
    }

    private _step: TimeStep = 1;
    @Input()
    public get step(): TimeStep {
        return this._step;
    }

    public set step(step: TimeStep) {
        if (!step || step == this._step) return;
        step = step != 1 && step != 5 && step != 10 ? 1 : step;
        this._step = step;
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
        if (value == this._hour) return;
        this._hour = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > 23 ? '23' : value;
        this._updateInputValue('hour', this._hour);
        if (this.initialized && this._hour.length > 1) {
            this._updateValue.emit();
            if(this._$selectMode == 'hour') {
                this._$handleSelectMode('minute');
            }
        }
    }

    private _minute: string = '00';

    public get _$minute(): string {
        return this._minute;
    }

    public set _$minute(value: string) {
        if (value == this._minute) return;
        let max = parseInt(59 / this.step + '') * this.step;
        this._minute = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > max ? String(max) : value;
        this._updateInputValue('minute', this._minute);
        if (this.initialized && this._minute.length > 1) {
            this._updateValue.emit();
            if(this._$selectMode == 'minute') {
                this._$handleSelectMode('second');
            }
        }
    }

    private _second: string = '00';

    public get _$second(): string {
        return this._second;
    }

    public set _$second(value: string) {
        if (value == this._second) return;
        let max = parseInt(59 / this.step + '') * this.step;
        this._second = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > max ? String(max) : value;
        this._updateInputValue('second', this._second);
        if (this.initialized && this._second.length > 1) {
            this._updateValue.emit();
            this._$cancelSelect('second');
        }
    }

    public _$selectMode: TimeSelectMode | 'none' = 'none';

    public _$floatTarget = JigsawTimePopup;

    public _$floatOpen: boolean;

    public _$floatInitData: any = {mode: this._$selectMode, value: this._$hour, step: this.step};

    public _$floatArrowElement: HTMLElement;

    public _$handleSelectMode(mode: TimeSelectMode | 'none') {
        this._$selectMode = mode;
        this._$floatOpen = mode == 'none' ? false : true;
        if (mode == 'hour') {
            this._hourInput.nativeElement.select();
            this._$floatInitData = {mode: 'hour', value: this._$hour, step: this.step};
            this._$floatArrowElement = this._hourInput.nativeElement;
        } else if (mode == 'minute') {
            this._minuteInput.nativeElement.select();
            this._$floatInitData = {mode: 'minute', value: this._$minute, step: this.step};
            this._$floatArrowElement = this._minuteInput.nativeElement;
        } else if (mode == 'second') {
            this._secondInput.nativeElement.select();
            this._$floatInitData = {mode: 'second', value: this._$second, step: this.step};
            this._$floatArrowElement = this._secondInput.nativeElement;
        }
    }

    public _$cancelSelect(mode: TimeSelectMode, checkAll?: boolean) {
        this._checkFormat(mode, checkAll);
        if (this._$selectMode == mode || checkAll) {
            this._$selectMode = 'none';
            this._$floatOpen = false;
        }
        this._updateValue.emit();
    }

    private _checkFormat(mode: TimeSelectMode, checkAll?: boolean) {
        if (mode == 'hour' || checkAll) {
            this._$hour = (Number(this._$hour) < 10 ? '0' : '') + Number(this._$hour);
        }
        if (mode == 'minute' || checkAll) {
            let value = this._$minute;
            value = parseInt(Number(value) / this.step + '') * this.step + '';
            this._$minute = (Number(value) < 10 ? '0' : '') + Number(value);
        }
        if (mode == 'second' || checkAll) {
            let value = this._$second;
            value = parseInt(Number(value) / this.step + '') * this.step + '';
            this._$second = (Number(value) < 10 ? '0' : '') + Number(value);
        }
    }

    private _updateInputValue(mode: TimeSelectMode, value) {
        if (mode == 'hour' && this._hourInput && this._hourInput.nativeElement.value != value) {
            this._hourInput.nativeElement.value = value;
        }
        if (mode == 'minute' && this._minuteInput && this._minuteInput.nativeElement.value != value) {
            this._minuteInput.nativeElement.value = value;
        }
        if (mode == 'second' && this._secondInput && this._secondInput.nativeElement.value != value) {
            this._secondInput.nativeElement.value = value;
        }
    }

    private _updateValue = new EventEmitter();
    private _removeUpdateValueSubscriber: Subscription;

    public _$handleKeyDown($event, mode: TimeSelectMode) {
        if ($event.keyCode == 38) {
            this._$handleCtrlBarClick($event, 1);
        } else if ($event.keyCode == 40) {
            this._$handleCtrlBarClick($event, -1);
        }
    }

    public _$handleCtrlBarClick($event, add: number) {
        $event.preventDefault();
        $event.stopPropagation();
        if (this._$selectMode == 'hour') {
            let value = String(Number(this._$hour) + add);
            this._hour = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > 23 ? '23' : value;
            this._updateInputValue('hour', this._hour);
            this._$floatInitData = {mode: 'hour', value: this._$hour, step: this.step};
        } else if (this._$selectMode == 'minute') {
            add = add * this.step;
            let value = parseInt(Number(this._$minute) / this.step + '') * this.step + '';
            value = String(Number(value) + add);
            let max = parseInt(59 / this.step + '') * this.step;
            this._minute = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > max ? String(max) : value;
            this._updateInputValue('minute', this._minute);
            this._$floatInitData = {mode: 'minute', value: this._$minute, step: this.step};
        } else if (this._$selectMode == 'second') {
            add = add * this.step;
            let value = parseInt(Number(this._$second) / this.step + '') * this.step + '';
            value = String(Number(value) + add);
            let max = parseInt(59 / this.step + '') * this.step;
            this._second = isNaN(Number(value)) || Number(value) < 0 ? '00' : Number(value) > max ? String(max) : value;
            this._updateInputValue('second', this._second);
            this._$floatInitData = {mode: 'second', value: this._$second, step: this.step};
        }
    }

    public _$popupSelect($event: TimePopupValue) {
        let {mode, value} = $event;
        if (mode == 'hour') {
            if(value == 'now') {
                this._$selectMode = 'none';
                [this._$hour, this._$minute, this._$second] = TimeService.convertValue('now', TimeGr.second).split(' ')[1].split(':');
                this._$cancelSelect(mode, true);
            } else {
                this._$hour = value;
            }
        } else if (mode == 'minute') {
            this._$minute = value;
        } else if (mode == 'second') {
            this._$second = value;
            this._$floatOpen = false;
        }
    }

    public writeValue(newValue: string): void {
        if (!newValue || newValue == this._value) return;
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

    ngOnDestroy() {
        super.ngOnDestroy();
        if(this._removeUpdateValueSubscriber) {
            this._removeUpdateValueSubscriber.unsubscribe();
            this._removeUpdateValueSubscriber = null;
        }
    }
}

@Component({
    selector: 'jigsaw-time-popup, j-time-popup',
    templateUrl: 'time-pop.html',
    host: {
        '[class.jigsaw-time-popup]': 'true',
        '(mousedown)': '_$stopBlur($event)'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTimePopup implements IPopupable {
    constructor(private _cdr: ChangeDetectorRef) {

    }

    public _value: TimePopupValue;

    public get initData(): TimePopupValue {
        return this._value
    }

    public set initData(value: TimePopupValue) {
        if (!value) {
            return;
        }
        Promise.resolve().then(() => {
            this._value = value;
            this._updateList(this.initData);
            this._cdr.markForCheck();
        })
    }

    public _$hourList: TimePopupItem[];
    public _$minuteList: TimePopupItem[];
    public _$secondList: TimePopupItem[];

    private _updateList(popupValue: TimePopupValue) {
        let {mode, value, step} = popupValue;
        this._$hourList = Array.from(new Array(24).keys()).map((h: any) => {
            h = (h < 10 ? '0' : '') + h;
            return {value: h, isSelected: false}
        });
        this._$minuteList = Array.from(new Array(60 / step).keys()).map((m: any) => {
            m = m * step;
            m = (m < 10 ? '0' : '') + m;
            return {value: m, isSelected: false}
        });
        this._$secondList = Array.from(new Array(60 / step).keys()).map((s: any) => {
            s = s * step;
            s = (s < 10 ? '0' : '') + s;
            return {value: s, isSelected: false}
        });
        let list = mode == 'hour' ? this._$hourList : mode == 'minute' ? this._$minuteList : mode == 'second' ? this._$secondList : null;
        if (!list) return;
        list.forEach(t => {
            t.isSelected = Number(t.value) == Number(value);
        });
        this._cdr.markForCheck();
    }

    public _$select(value: string) {
        this._value.value = String(value);
        this.answer.emit(this._value);
    }

    public _$stopBlur($event) {
        $event.preventDefault();
        $event.stopPropagation()
    }

    @Output()
    public answer: EventEmitter<any> = new EventEmitter<any>();
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawFloatModule, TranslateModule.forRoot()],
    declarations: [JigsawTimePicker, JigsawTimePopup],
    exports: [JigsawTimePicker, JigsawTimePopup],
    providers: [TranslateService],
})
export class JigsawTimePickerModule {
    constructor(translateService: TranslateService) {
        InternalUtils.initI18n(translateService, 'timePicker', {
            zh: {
                now: "此刻",
                default: '默认时间'
            },
            en: {
                now: 'this time',
                default: 'default time'
            }
        });
        translateService.setDefaultLang(translateService.getBrowserLang());
    }
}
