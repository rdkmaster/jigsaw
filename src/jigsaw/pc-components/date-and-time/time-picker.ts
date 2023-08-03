import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Injector,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TranslateModule} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {JigsawFloat, JigsawFloatModule} from "../../common/directive/float/float";
import {IPopupable} from "../../common/service/popup.service";
import {TimeGr, TimeService, TimeUnit} from "../../common/service/time.service";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {TranslateHelper} from "../../common/core/utils/translate-helper";

export type TimeSelectMode = 'hour' | 'minute' | 'second';
export type TimeStep = 1 | 5 | 10 | 15 | 30;
export type TimePopupValue = { mode: TimeSelectMode | 'none', value: string, list: TimePopupItem[], showNowButton: boolean };
export type TimePopupItem = { value: string, isSelected?: boolean, disabled?: boolean };

type TimePickerGR = TimeGr.time | TimeGr.time_hour_minute | TimeGr.time_minute_second | TimeGr.time_hour;

/**
 * 用于在界面上提供一个时间（不带日期）选择，如下是关于时间的一些常见的场景及其建议：
 *
 * - 如果需要选择的是一个时间范围，则请使用`JigsawRangeDateTimePicker`；
 * - 如果需要选择的是一个时刻，则请使用`JigsawDateTimePicker`；
 * - 如果你需要的是一个日历的功能，那请参考[这个demo](/#/components/table-renderer?demo=table-renderer-calendar)，通过表格+渲染器的方式来模拟；
 * - 时间选择器常常是收纳到下拉框中以解决视图空间，则请使用 `JigsawDateTimeSelect` 和 `JigsawRangeDateTimeSelect`，
 * 参考[这个demo](/#/components/date-time-picker?demo=date-time-picker-date-time-select)；
 */
@WingsTheme('time-picker.scss')
@Component({
    selector: 'jigsaw-time-picker, j-time-picker',
    templateUrl: './time-picker.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-time-picker-host]': 'true',
        '[class.jigsaw-time-picker-active]': '_$selectMode != "none"',
        '[class.jigsaw-time-picker-error]': '!valid',
        '[class.jigsaw-time-picker-disabled]': 'disabled',
        '(keydown)': '_$handleKeyDown($event)'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTimePicker), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTimePicker extends AbstractJigsawComponent implements ControlValueAccessor, OnDestroy, OnInit {
    constructor(protected _cdr: ChangeDetectorRef, protected _zone: NgZone,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super(_zone);
        this._removeUpdateValueSubscriber = this._updateValue.pipe(debounceTime(300)).subscribe(() => {
            this._hour = this._hour ? this._hour : '00';
            this._minute = this._minute ? this._minute : '00';
            this._second = this._second ? this._second : '00';
            let value = this._calValueByGr(this._$hour, this._$minute, this._$second);
            this.writeValue(value);
        });
        this._removeSwitchPopupSubscriber = this._switchPopup.pipe(debounceTime(150)).subscribe((open: boolean) => {
            this._$floatOpen = open;
            this._cdr.markForCheck();
        });
    }

    /**
     * 参考`JigsawDateTimePicker.disabled`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-time-picker/disabled
     */
    @Input()
    public disabled: boolean;

    /**
     * 参考`JigsawDateTimePicker.valid`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-time-picker/valid
     */
    @Input()
    public valid: boolean = true;

    private _value: string = '00:00:00';

    /**
     * 时间选择器的当前值，可以界面选择，也可以双绑修改
     * $demo = time-picker/basic
     */
    @RequireMarkForCheck()
    @Input()
    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        if (!value || value == this._value) {
            return;
        }
        this.writeValue(value);
        if (this.initialized) {
            this._createTime(value, this.gr);
        }
    }

    private _step: TimeStep = 1;

    /**
     * 分钟、秒钟选择面板的默认有60个数字可以挑选，显得比较凌乱，你可以设置此值为5/10来减少面板上的可选项
     *
     * @NoMarkForCheckRequired
     *
     * $demo = time-picker/step
     */
    @Input()
    public get step(): TimeStep {
        return this._step;
    }

    public set step(step: TimeStep) {
        if (!step || step == this._step) {
            return;
        }
        step = step != 1 && step != 5 && step != 10 && step != 15 && step != 30 ? 1 : step;
        this._step = step;
    }

    private _gr: TimePickerGR = TimeGr.time;

    /**
     * 当前时间选择器的粒度，支持：仅小时、时分、分秒、时分秒这几种用法
     *
     * @NoMarkForCheckRequired
     *
     * $demo = time-picker/gr
     */
    @Input()
    public get gr(): TimePickerGR | string {
        return this._gr;
    }

    public set gr(gr: TimePickerGR | string) {
        if (typeof gr === 'string') {
            gr = TimeGr[gr];
        }
        if (gr != TimeGr.time && gr != TimeGr.time_hour_minute && gr != TimeGr.time_minute_second && gr != TimeGr.time_hour) {
            return;
        }
        this._gr = gr;
        if (this.initialized) {
            this._updateValue.emit();
        }
    }

    /**
     * 时间选择面板的弹出位置，支持向上弹出，向下弹出
     *
     * @NoMarkForCheckRequired
     *
     * $demo = time-picker/pop-up-down
     */
    @Input()
    public popDirection: 'up' | 'down' = 'down';

    private _limitStart: string;

    /**
     * `limitStart` 和 `limitEnd` 用于设定起止可选时间
     *
     * @NoMarkForCheckRequired
     *
     * $demo = time-picker/limit
     */
    @Input()
    public get limitStart(): string {
        return this._limitStart;
    }

    public set limitStart(value: string) {
        if (value == this._limitStart || (value && !TimeService.isMacro(value) && !this._checkLimitValid(value))) {
            return;
        }
        this._limitStart = this._timeFormatter(value);
        if (this.initialized) {
            this.value = this._calValueByLimit(this.value);
        }
    }

    private _limitEnd: string;

    /**
     * 参考 `limitStart`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = time-picker/limit
     */
    @Input()
    public get limitEnd(): string {
        return this._limitEnd;
    }

    public set limitEnd(value: string) {
        if (value == this._limitEnd || (value && !TimeService.isMacro(value) && !this._checkLimitValid(value))) {
            return;
        }
        this._limitEnd = this._timeFormatter(value);
        if (this.initialized) {
            this.value = this._calValueByLimit(this.value);
        }
    }

    /**
     * 当用户选择了时间之后，发出此事件
     * $demo = time-picker/basic
     */
    @Output()
    public valueChange = new EventEmitter<string>();

    @ViewChild('hour')
    private _hourInput: ElementRef;
    @ViewChild('minute')
    private _minuteInput: ElementRef;
    @ViewChild('second')
    private _secondInput: ElementRef;
    @ViewChild(JigsawFloat)
    private _float: JigsawFloat;

    private _hour: string = '00';

    public get _$hour(): string {
        return this._hour;
    }

    public set _$hour(value: string) {
        if (value == this._hour) {
            return;
        }
        if (this._updateHour(value) && this.initialized && this._hour.length > 1) {
            this._updateValue.emit();
            this._switchWhenHour();
        }
    }

    private _switchWhenHour() {
        if (this._$selectMode == 'hour' && (this.gr == TimeGr.time || this.gr == TimeGr.time_hour_minute)) {
            this._$handleSelectMode('minute');
        } else if (this.gr == TimeGr.time_hour) {
            this._$cancelSelect('hour');
        }
    }

    private _minute: string = '00';

    public get _$minute(): string {
        return this._minute;
    }

    public set _$minute(value: string) {
        if (value == this._minute) {
            return;
        }
        if (this._updateMinute(value) && this.initialized && this._minute.length > 1) {
            this._updateValue.emit();
            this._switchWhenMinute();
        }
    }

    private _switchWhenMinute() {
        if (this._$selectMode == 'minute' && (this.gr == TimeGr.time || this.gr == TimeGr.time_minute_second)) {
            this._$handleSelectMode('second');
        } else if (this.gr == TimeGr.time_hour_minute) {
            this._$cancelSelect('minute');
        }
    }

    private _second: string = '00';

    public get _$second(): string {
        return this._second;
    }

    public set _$second(value: string) {
        if (value == this._second) {
            return;
        }
        if (this._updateSecond(value) && this.initialized && this._second.length > 1) {
            this._updateValue.emit();
            this._$cancelSelect('second');
        }
    }

    private _createTime(time: string, gr) {
        let timeArr = time.split(':');
        if (gr == TimeGr.time) {
            [this._hour, this._minute, this._second] = timeArr;
        } else if (gr == TimeGr.time_hour_minute) {
            [this._hour, this._minute] = timeArr;
        } else if (gr == TimeGr.time_minute_second) {
            [this._minute, this._second] = timeArr;
        } else if (gr == TimeGr.time_hour) {
            [this._hour] = timeArr;
        }
    }

    /**
     * @internal
     */
    public _$selectMode: TimeSelectMode | 'none' = 'none';
    /**
     * @internal
     */
    public _$floatTarget = JigsawTimePopup;
    /**
     * @internal
     */
    public _$floatOpen: boolean;
    /**
     * @internal
     */
    public _$floatInitData: any = this._getFloatInitData(this._$selectMode, this._$hour, this.step, this.gr);
    /**
     * @internal
     */
    public _$floatArrowElement: HTMLElement;

    /**
     * @internal
     *
     * 标记是否有过交互，当时间组件存在确认按钮时，只有在人为交互之后，才需要点击确认来更新时间
     * 而有些自动操作，比如设置limit时间之后的自动修正，是不需要点击确认按钮直接更新的
     */
    public _$touched: boolean;

    /**
     * @internal
     */
    public _$handleSelectMode(mode: TimeSelectMode | 'none', isTabSwitch?: boolean) {
        this._$selectMode = mode;
        this._switchPopup.emit(mode != 'none');
        this._$touched = true;
        if (mode == 'hour') {
            if (!isTabSwitch) {
                this._hourInput.nativeElement.select();
            }
            this._$floatInitData = this._getFloatInitData(mode, this._$hour, this.step, this.gr);
            this._$floatArrowElement = this._hourInput.nativeElement;
        } else if (mode == 'minute') {
            if (!isTabSwitch) {
                this._minuteInput.nativeElement.select();
            }
            let minute = this._getStepValue(this._$minute);
            if (Number(minute) != Number(this._minute)) {
                this._minute = minute;
                this._updateValue.emit();
            }
            this._$floatInitData = this._getFloatInitData(mode, this._$minute, this.step, this.gr);
            this._$floatArrowElement = this._minuteInput.nativeElement;
        } else if (mode == 'second') {
            if (!isTabSwitch) {
                this._secondInput.nativeElement.select();
            }
            let second = this._getStepValue(this._$second);
            if (Number(second) != Number(this._second)) {
                this._second = second;
                this._updateValue.emit();
            }
            this._$floatInitData = this._getFloatInitData(mode, this._$second, this.step, this.gr);
            this._$floatArrowElement = this._secondInput.nativeElement;
        }
        if (mode != 'none') {
            this.runAfterMicrotasks(() => {
                this._float.reposition();
            });
        }
    }

    /**
     * @internal
     */
    public _$cancelSelect(mode: TimeSelectMode, checkAll?: boolean) {
        this._checkFormat(mode, checkAll);
        if (this._$selectMode == mode || checkAll) {
            // 让输入框失去焦点，否则再次点击的时候，无法弹出TimePop组件
            this._hourInput?.nativeElement.blur();
            this._minuteInput?.nativeElement.blur();
            this._secondInput?.nativeElement.blur();

            this._$selectMode = 'none';
            this._switchPopup.emit(false);
        }
        this._updateValue.emit();
    }

    private _checkFormat(mode: TimeSelectMode, checkAll?: boolean) {
        if (mode == 'hour' || checkAll) {
            this._$hour = this._autoZero(this._$hour);
        }
        if (mode == 'minute' || checkAll) {
            let value = this._getStepValue(this._$minute);
            this._$minute = this._autoZero(value);
        }
        if (mode == 'second' || checkAll) {
            let value = this._getStepValue(this._$second);
            this._$second = this._autoZero(value);
        }
    }

    private _autoZero(value: any): string {
        const numValue = Number(value);
        return (numValue < 10 ? '0' : '') + numValue;
    }

    /* limitStart & limitEnd 自动补0 */
    private _timeFormatter(value: string): string {
        return value ? value.replace(/(\d{1,2})(:|$)/g, (found, digit, splitter) => (digit.length == 1 ? `0${digit}` : digit) + splitter) : value;
    }

    private _getStepValue(value: any): string {
        return parseInt(Number(value) / this.step + '') * this.step + '';
    }

    private _getStepRangeValue(value: any): string {
        const max = parseInt(59 / this.step + '') * this.step;
        const numValue = Number(value);
        return isNaN(numValue) || numValue < 0 ? '00' : numValue > max ? String(max) : String(value);
    }

    private _getHourRangeValue(value: any): string {
        const numValue = Number(value);
        return isNaN(numValue) || numValue < 0 ? '00' : numValue > 23 ? '23' : String(value);
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
    private _switchPopup = new EventEmitter<boolean>();
    private _removeSwitchPopupSubscriber: Subscription;

    /**
     * @internal
     */
    public _$handleKeyDown($event) {
        if ($event.keyCode == 39) {
            this._$handleCtrlBarClick($event, 1);
        } else if ($event.keyCode == 37) {
            this._$handleCtrlBarClick($event, -1);
        } else if ($event.keyCode == 40) {
            this._$handleCtrlBarClick($event, this.step == 1 ? 9 : 1);
        } else if ($event.keyCode == 38) {
            this._$handleCtrlBarClick($event, this.step == 1 ? -9 : -1);
        } else if ($event.keyCode == 9) {
            if ($event.shiftKey) {
                if (this._$selectMode == 'second') {
                    this._$handleSelectMode('minute', true);
                } else if (this._$selectMode == 'minute' && (this.gr == TimeGr.time || this.gr == TimeGr.time_hour_minute)) {
                    this._$handleSelectMode('hour', true);
                }
            } else {
                if (this._$selectMode == 'hour' && this.gr != TimeGr.time_hour) {
                    this._$handleSelectMode('minute', true);
                } else if (this._$selectMode == 'minute' && (this.gr == TimeGr.time || this.gr == TimeGr.time_minute_second)) {
                    this._$handleSelectMode('second', true);
                }
            }
        }
    }

    private _getValidNumberInRange(num: number | string, min: number, max: number): number {
        num = Math.max(min, Number(num));
        num = Math.min(num, max);
        return num;
    }

    /**
     * @internal
     */
    public _$handleCtrlBarClick($event, add: number) {
        $event.preventDefault();
        $event.stopPropagation();
        if (this._$selectMode == 'hour') {
            let value = Number(this._$hour) + add;
            value = this._getValidNumberInRange(value, 0, 23);
            if (this._updateHour(value)) {
                this._$floatInitData = this._getFloatInitData(this._$selectMode, this._$hour, this.step, this.gr);
            }
        } else if (this._$selectMode == 'minute') {
            add = add * this.step;
            let value = Number(this._getStepValue(this._$minute)) + add;
            value = this._getValidNumberInRange(value, 0, 59);
            if (this._updateMinute(value)) {
                this._$floatInitData = this._getFloatInitData(this._$selectMode, this._$minute, this.step, this.gr);
            }
        } else if (this._$selectMode == 'second') {
            add = add * this.step;
            let value = Number(this._getStepValue(this._$second)) + add;
            value = this._getValidNumberInRange(value, 0, 59);
            if (this._updateSecond(value)) {
                this._$floatInitData = this._getFloatInitData(this._$selectMode, this._$second, this.step, this.gr);
            }
        }
    }

    private _updateHour(value: any): boolean {
        value = this._getHourRangeValue(value);
        if (this._isValueOutOfLimit(value, 'hour')) {
            this._updateInputValue('hour', this._hour);
            return false;
        }
        this._hour = value;
        this._updateInputValue('hour', this._hour);
        return true;
    }

    private _updateMinute(value: any): boolean {
        value = this._getStepRangeValue(value);
        if (this._isValueOutOfLimit(value, 'minute')) {
            this._updateInputValue('minute', this._minute);
            return false;
        }
        this._minute = value;
        this._updateInputValue('minute', this._minute);
        return true;
    }

    private _updateSecond(value: any): boolean {
        value = this._getStepRangeValue(value);
        if (this._isValueOutOfLimit(value, 'second')) {
            this._updateInputValue('second', this._second);
            return false;
        }
        this._second = value;
        this._updateInputValue('second', this._second);
        return true;
    }

    /**
     * @internal
     */
    public _$popupSelect($event: TimePopupValue) {
        let {mode, value} = $event;
        if (mode == 'hour') {
            if (value == 'now') {
                this._$selectMode = 'none';
                [this._$hour, this._$minute, this._$second] = TimeService.convertValue('now', TimeGr.second).split(' ')[1].split(':');
                this._$cancelSelect(mode, true);
            } else {
                if (this._$hour == value) {
                    // 选择原来的值也会切换
                    this._switchWhenHour();
                } else {
                    this._$hour = value;
                }
            }
        } else if (mode == 'minute') {
            if (this._$minute == value) {
                // 选择原来的值也会切换
                this._switchWhenMinute();
            } else {
                this._$minute = value;
            }
        } else if (mode == 'second') {
            this._$second = value;
            this._$floatOpen = false;
        }
    }

    private _calValueByGr(hour: string, minute: string, second: string): string {
        [hour, minute, second] = [this._autoZero(hour), this._autoZero(minute), this._autoZero(second)];
        let value;
        if (this.gr == TimeGr.time) {
            value = [hour, minute, second].join(':')
        } else if (this.gr == TimeGr.time_hour_minute) {
            value = [hour, minute].join(':')
        } else if (this.gr == TimeGr.time_minute_second) {
            value = [minute, second].join(':')
        } else if (this.gr == TimeGr.time_hour) {
            value = hour
        }
        return value;
    }

    private _getTimeLimit(limit: string, add: 1 | -1): string {
        if (!TimeService.isMacro(limit)) {
            return limit;
        }
        let limitDate = TimeService.convertValue(limit, TimeGr.second);
        return TimeService.convertValue(TimeService.addDate(limitDate, add * 5, TimeUnit.m), this._gr);
    }

    private _calValueByLimit(value: string): string {
        if (this.limitStart && value < this._getTimeLimit(this.limitStart, -1)) {
            value = this._getTimeLimit(this.limitStart, -1);
        }
        if (this.limitEnd && value > this._getTimeLimit(this.limitEnd, 1)) {
            value = this._getTimeLimit(this.limitEnd, 1);
        }
        return value
    }

    private _checkLimitValid(limit: string): boolean {
        if (!limit) {
            return false;
        }
        let timeArr = limit.split(':');
        if (this.gr == TimeGr.time) {
            return timeArr.length == 3
        } else if (this.gr == TimeGr.time_hour) {
            return timeArr.length == 1
        } else {
            return timeArr.length == 2
        }
    }

    private _isValueOutOfLimit(value: string, mode?: TimeSelectMode): boolean {
        value = mode ? this._autoZero(value) : value;
        let time;
        if (mode == 'hour') {
            time = this._calValueByGr(value, this._$minute, this._$second);
        } else if (mode == 'minute') {
            time = this._calValueByGr(this._$hour, value, this._$second);
        } else if (mode == 'second') {
            time = this._calValueByGr(this._$hour, this._$minute, value);
        } else {
            time = value;
        }
        return (this.limitStart && time < this._getTimeLimit(this.limitStart, -1)) || (this.limitEnd && time > this._getTimeLimit(this.limitEnd, 1))
    }

    private _getFloatInitData(mode: TimeSelectMode | 'none', value: string, step: TimeStep, gr: TimePickerGR | string): TimePopupValue {
        let list;
        if (mode == 'hour') {
            list = Array.from(new Array(24).keys()).map((h: any) => {
                h = (h < 10 ? '0' : '') + h;
                return {value: h, isSelected: Number(h) == Number(value), disabled: this._isValueOutOfLimit(h, mode)}
            });
        } else if (mode == 'minute' || mode == 'second') {
            list = Array.from(new Array(60 / step).keys()).map((m: any) => {
                m = m * step;
                m = (m < 10 ? '0' : '') + m;
                return {value: m, isSelected: Number(m) == Number(value), disabled: this._isValueOutOfLimit(m, mode)}
            });
        }
        const showNowButton = gr == TimeGr.time;
        return {mode, value, list, showNowButton}
    }

    public writeValue(newValue: string): void {
        newValue = CommonUtils.isUndefined(newValue) ? this._calValueByGr('0', '0', '0') : newValue;
        this._createTime(newValue, this.gr);
        this._value = newValue;
        this.valueChange.emit(newValue);
        this._propagateChange(this._value);
    }

    private _propagateChange: any = () => {
    };
    private _onTouched: any = () => {
    };

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

    public clearTime() {
        if (this.value == '00:00:00') {
            return;
        }
        let value = this._calValueByGr('00', '00', '00');
        this.writeValue(value);
    }

    ngOnInit() {
        super.ngOnInit();
        if (this._isValueOutOfLimit(this.value)) {
            this.runMicrotask(() => {
                this.value = this._calValueByLimit(this.value);
            });
        } else {
            this._createTime(this.value, this.gr);
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeUpdateValueSubscriber) {
            this._removeUpdateValueSubscriber.unsubscribe();
            this._removeUpdateValueSubscriber = null;
        }
        if (this._removeSwitchPopupSubscriber) {
            this._removeSwitchPopupSubscriber.unsubscribe();
            this._removeSwitchPopupSubscriber = null;
        }
    }
}

@WingsTheme('time-pop.scss')
@Component({
    selector: 'jigsaw-time-popup, j-time-popup',
    templateUrl: 'time-pop.html',
    host: {
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-time-popup-host]': 'true',
        '(mousedown)': '_$stopBlur($event)'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawTimePopup extends AbstractJigsawComponent implements IPopupable {
    constructor(private _cdr: ChangeDetectorRef) {
        super();
    }

    private _value: TimePopupValue;

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
        });
    }

    public answer: EventEmitter<any> = new EventEmitter<any>();
    /**
     * @internal
     */
    public _$hourList: TimePopupItem[];
    /**
     * @internal
     */
    public _$minuteList: TimePopupItem[];
    /**
     * @internal
     */
    public _$secondList: TimePopupItem[];

    private _updateList(popupValue: TimePopupValue) {
        let {mode, list} = popupValue;
        if (mode == 'hour') {
            this._$hourList = list;
        } else if (mode == 'minute') {
            this._$minuteList = list;
        } else if (mode == 'second') {
            this._$secondList = list;
        }
        this._cdr.markForCheck();
    }

    /**
     * @internal
     * @param item
     * @private
     */
    public _$select(item: TimePopupItem) {
        if (item.disabled) {
            return;
        }
        this._value.value = String(item.value);
        this.answer.emit(this._value);
    }

    /**
     * @internal
     */
    public _$stopBlur($event) {
        $event.preventDefault();
        $event.stopPropagation()
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawFloatModule, TranslateModule.forChild()],
    declarations: [JigsawTimePicker, JigsawTimePopup],
    exports: [JigsawTimePicker],
})
export class JigsawTimePickerModule {
    constructor() {
        TranslateHelper.initI18n('timePicker', {
            zh: {now: "此刻"}, en: {now: 'Now'}
        });
    }
}
