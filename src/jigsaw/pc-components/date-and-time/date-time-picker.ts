import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    HostListener,
    Injector,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {DateTimeCellType, GrItem, JigsawDatePicker, JigsawDatePickerModule, MarkDate} from "./date-picker";
import {JigsawTimePicker, JigsawTimePickerModule, TimeStep} from "./time-picker";
import {JigsawButtonModule} from "../button/button";
import {TimeGr, TimeService, TimeWeekStart} from "../../common/service/time.service";
import {Time, WeekTime} from "../../common/service/time.types";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {TranslateHelper} from "../../common/core/utils/translate-helper";

/**
 * 用于在界面上提供一个时刻选择，支持多种时间粒度切换，支持年月日时分秒及其各种组合，
 * 通过切换不同的粒度，可以控制时刻选择器只能选到年月日时分秒中的任何一段
 * 如下是关于时间的一些常见的场景及其建议：
 *
 * - 如果需要选择的是一个时间范围，则请使用`JigsawRangeDateTimePicker`；
 * - 如果需要选择的是一个时分秒，不带日期，则请使用`JigsawTimePicker`；
 * - 如果你需要的是一个日历的功能，那请参考[这个demo](/#/components/table-renderer?demo=table-renderer-calendar)，通过表格+渲染器的方式来模拟；
 * - 时间选择器常常是收纳到下拉框中以解决视图空间，则请使用 `JigsawDateTimeSelect` 和 `JigsawRangeDateTimeSelect`，
 * 参考[这个demo](/#/components/date-time-picker?demo=date-time-picker-date-time-select)；
 *
 * 时间控件是对表单友好的，你可以给时间控件编写表单校验器。
 *
 */
@WingsTheme('date-time-picker.scss')
@Component({
    selector: 'jigsaw-date-time-picker, j-date-time-picker, jigsaw-time, j-time',
    templateUrl: './date-time-picker.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-date-time-picker-host]': 'true',
        '[class.jigsaw-date-time-picker-error]': '!valid',
        '[class.jigsaw-date-time-picker-disabled]': 'disabled',
    },
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawDateTimePicker), multi: true },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawDateTimePicker extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, OnDestroy {
    constructor(private _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
        this._removeUpdateValueCombineSubscriber = this._updateValueCombine.pipe(debounceTime(300)).subscribe((mode: 'combine' | 'separate') => {
            // click已选日期进行日期重置
            if (this._$date === ""){
                this._date = "";
                this.runMicrotask(() => {
                    this.dateChange.emit(this._date);
                    this._propagateChange(this._date);
                    this._cdr.markForCheck();
                });
            }
            if (!this._$date) {
                return;
            }
            let newDate: WeekTime = TimeService.isWeekDate(this._$date) ? TimeService.convertValue(this._$date, this._gr).split(' ')[0] : this._$date;
            if (this.gr == TimeGr.hour || this.gr == TimeGr.minute || this.gr == TimeGr.second) {
                this._$time = this._$time ? this._$time : this._getDefaultTime();
                newDate += ` ${this._$time}`
            }
            newDate = this.gr == TimeGr.week ? TimeService.getWeekDate(newDate) : newDate;
            this.writeValue(newDate);
        });
        this._removeUpdateValueSeparateSubscriber = this._updateValueSeparate.pipe(debounceTime(300)).subscribe(() => {
            if (!this.date) {
                return;
            }
            let newDate: WeekTime = TimeService.convertValue(this.date, this._gr);
            [this._$date, this._$time] = newDate.split(' ');
            newDate = this.gr == TimeGr.week ? TimeService.getWeekDate(newDate) : newDate;
            this._cdr.markForCheck();
            this.writeValue(newDate);
        })
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
     * 标记当前日期值是否有效，无效时，呈现一个红色框框，常用于表单中配合表单是否有效
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-time-picker/valid
     */
    @Input()
    public valid: boolean = true;

    /**
     * 当时间粒度被用户切换之后，Jigsaw会发出此事件。
     * $demo = date-time-picker/gr
     */
    @Output()
    public grChange = new EventEmitter<TimeGr>();

    /**
     * @internal
     */
    public _$time: string;
    /**
     * @internal
     */
    public _$timeGr: TimeGr.time | TimeGr.time_hour_minute | TimeGr.time_minute_second | TimeGr.time_hour;
    /**
     * @internal
     */
    public _$dateGr: TimeGr.date | TimeGr.month | TimeGr.week;
    private __date: string;
    private _date: WeekTime;
    private _gr: TimeGr = TimeGr.date;

    /**
     * 用于控制时间粒度，支持 这些选项 second, minute, hour, date, week, month, time, time_hour_minute, time_minute_second, time_hour
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-time-picker/gr
     */
    @Input()
    public get gr(): TimeGr | string {
        return this._gr;
    }

    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if (value == this._gr) {
            return;
        }
        this._gr = <TimeGr>value;
        this._calTimeGr(this._gr);
        this._calDateGr(this._gr);
        if (this.initialized && this.date) {
            let newDate = TimeService.convertValue(this.date, this._gr);
            [this._$date, this._$time] = newDate.split(' ');
            this._updateValueSeparate.emit();
        }
    }

    private _calTimeGr(gr: TimeGr) {
        if (gr == TimeGr.hour) {
            this._$timeGr = TimeGr.time_hour;
        } else if (gr == TimeGr.minute) {
            this._$timeGr = TimeGr.time_hour_minute
        } else if (gr == TimeGr.second) {
            this._$timeGr = TimeGr.time
        } else {
            this._$timeGr = null;
        }
    }

    private _calDateGr(gr: TimeGr) {
        if (gr == TimeGr.hour || gr == TimeGr.minute || gr == TimeGr.second) {
            this._$dateGr = TimeGr.date;
        } else {
            this._$dateGr = <TimeGr.date | TimeGr.month | TimeGr.week>gr;
        }
    }

    public get _$date(): string {
        return this.__date;
    }

    public set _$date(d: string) {
        this.__date = d;
        this._updateTimeLimit();
    }

    /**
     * 当前所选中的时刻，在双绑模式下，更新这个值可以让时间控件选中对应的时刻。
     *
     * 支持时间宏。关于时间宏，请参考这里`TimeUnit`的说明。
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-time-picker/basic
     * $demo = date-time-picker/mark
     */
    @Input()
    public get date(): WeekTime {
        return this._date;
    }

    public set date(newValue: WeekTime) {
        if (!newValue || newValue == this._date) {
            return;
        }
        this._date = newValue;
        if (this.initialized) {
            this._updateValueSeparate.emit();
        }
    }

    /**
     * 当时间被用户切换之后，Jigsaw会发出此事件。
     * $demo = date-time-picker/basic
     */
    @Output()
    public dateChange = new EventEmitter<WeekTime>();

    /**
     * 当前日期控件内的内容被点击时，发出此事件，告知点击的日期格的类型
     */
    @Output()
    public dateTimeSelect = new EventEmitter<DateTimeCellType>();

    private _limitStart: Time;
    private _timeLimitStart: string;
    /**
     * @internal
     */
    public _$dateLimitStart: string;
    /**
     * @internal
     */
    public _$timeLimitStartCur: string = '00:00:00';

    /**
     * 时间控件允许选择的时间开始时刻，默认是无限制的过去。这个约束对所有的粒度都生效。
     *
     * 支持时间宏。关于时间宏，请参考这里`TimeUnit`的说明。
     *
     * $demo = date-time-picker/limit
     */
    public get limitStart(): Time {
        return this._limitStart;
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public set limitStart(value: Time) {
        if (value) {
            this._limitStart = TimeService.convertValue(value, <TimeGr>this.gr);
            [this._$dateLimitStart, this._timeLimitStart] = this._limitStart.split(' ');
            if (TimeService.isMacro(value)) {
                this._timeLimitStart = <string>value;
            }
            this._updateTimeLimit();
        } else {
            this._limitStart = null;
            this._$dateLimitStart = null;
            this._timeLimitStart = null;
        }
    }

    /**
     * @internal
     */
    public _$dateLimitEnd: string;
    /**
     * @internal
     */
    public _$timeLimitEndCur: string = "23:59:59";

    private _timeLimitEnd: string;
    private _limitEnd: Time;

    /**
     * 时间控件允许选择的时间截止时刻，默认是无限制的未来。这个约束对所有的粒度都生效。
     *
     * 支持时间宏。关于时间宏，请参考这里`TimeUnit`的说明。
     *
     * $demo = date-time-picker/limit
     */
    public get limitEnd(): Time {
        return this._limitEnd
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public set limitEnd(value: Time) {
        if (value) {
            this._limitEnd = TimeService.convertValue(value, <TimeGr>this.gr);
            [this._$dateLimitEnd, this._timeLimitEnd] = this._limitEnd.split(' ');
            if (TimeService.isMacro(value)) {
                this._timeLimitEnd = <string>value;
            }
            this._updateTimeLimit();
        } else {
            this._limitEnd = null;
            this._$dateLimitEnd = null;
            this._timeLimitEnd = null;
        }
    }

    /**
     * 设置时间控件所支持的粒度。如果你的场景只允许用户选择天、周，则设置了这2个粒度之后，用户无法选择其他的粒度。
     * $demo = date-time-picker/gr-items
     */
    @Input()
    @RequireMarkForCheck()
    public grItems: GrItem[];

    /**
     * 对选定的日期做标记，用于提示用户这些日期具有特定含义
     * $demo = date-time-picker/mark
     */
    @Input()
    @RequireMarkForCheck()
    public markDates: MarkDate[];

    /**
     * @NoMarkForCheckRequired
     * @internal
     */
    @Input()
    public rangeDate: string;

    /**
     * 分钟、秒钟选择面板的默认有60个数字可以挑选，显得比较凌乱，你可以设置此值为5/10来减少面板上的可选项
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-time-picker/step
     */
    @Input()
    public step: TimeStep;

    /**
     * 设置周开始日期，可选值 sun mon tue wed thu fri sat。
     * $demo = date-time-picker/week-start
     */
    @Input()
    @RequireMarkForCheck()
    public weekStart: string | TimeWeekStart;

    /**
     * 设置一年的第一周要包含一月几号
     * $demo = date-time-picker/week-start
     */
    @Input()
    @RequireMarkForCheck()
    public firstWeekMustContains: number;

    /**
     * 是否显示确认按钮
     * @NoMarkForCheckRequired
     */
    @Input()
    public showConfirmButton: boolean = false;

    /**
     * @internal
     */
    @Output()
    public confirm = new EventEmitter();

    /**
     * @internal
     */
    @ViewChild('datePicker')
    public _$datePicker: JigsawDatePicker;

    /**
     * @internal
     */
    @ViewChild('timePicker')
    public _$timePicker: JigsawTimePicker;

    private _updateValueCombine = new EventEmitter();
    private _removeUpdateValueCombineSubscriber: Subscription;
    private _updateValueSeparate = new EventEmitter();
    private _removeUpdateValueSeparateSubscriber: Subscription;

    private _updateTimeLimit() {
        this._$timeLimitStartCur = this._$date == this._$dateLimitStart ? this._timeLimitStart : this._getDefaultLimitStart();
        this._$timeLimitEndCur = this._$date == this._$dateLimitEnd ? this._timeLimitEnd : this._getDefaultLimitEnd();
    }

    /**
     * @internal
     */
    public _$changeGr($event: GrItem) {
        if (!$event) {
            return;
        }
        this.gr = $event.value;
        this.grChange.emit(<TimeGr>this.gr);
        this._cdr.markForCheck();
    }

    /**
     * @internal
     */
    public _$handleDateChange(update?: boolean) {
        if (!update && this.showConfirmButton && !!this._$timeGr && this._$datePicker._$touched) {
            // 确认按钮只有在粒度是 时分秒 的时候起作用
            return;
        }
        this._updateValueCombine.emit();
    }

    /**
     * @internal
     */
    public _$handleTimeChange(update?: boolean) {
        if (!update && this.showConfirmButton && (this._$datePicker._$touched || (this._$timePicker && this._$timePicker._$touched))) {
            return;
        }
        this._updateValueCombine.emit();
    }

    private _getDefaultLimitStart() {
        return this.gr == TimeGr.hour ? '00' : this.gr == TimeGr.minute ? '00:00' : '00:00:00';
    }

    private _getDefaultLimitEnd() {
        return this.gr == TimeGr.hour ? '23' : this.gr == TimeGr.minute ? '23:59' : '23:59:59';
    }

    private _getDefaultTime() {
        return this.gr == TimeGr.hour ? '00' : this.gr == TimeGr.minute ? '00:00' : '00:00:00';
    }

    private _isDateSame(date1, date2) {
        if (!date1 || !date2) {
            return false;
        }
        if (this.gr == TimeGr.week && typeof date1 == 'object' && typeof date2 == 'object') {
            return date1.year == date2.year && date1.week == date2.week
        } else {
            return date1 == date2
        }
    }

    public writeValue(date: WeekTime): void {
        if (this._isDateSame(date, this._date)) {
            return;
        }
        this._date = date;
        this.dateChange.emit(date);
        this._$datePicker._$touched = false;
        if (this._$timePicker) {
            this._$timePicker._$touched = false;
        }
        this._propagateChange(this._date);
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

    /**
     * @internal
     */
    public _$confirm() {
        this._updateValueCombine.emit();
        this.confirm.emit();
    }

    public clearDate() {
        this._$datePicker?.clearDate();
        this._$timePicker?.clearTime();
    }

    ngOnInit() {
        super.ngOnInit();
        this._updateValueSeparate.emit();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeUpdateValueCombineSubscriber) {
            this._removeUpdateValueCombineSubscriber.unsubscribe();
            this._removeUpdateValueCombineSubscriber = null;
        }
        if (this._removeUpdateValueSeparateSubscriber) {
            this._removeUpdateValueSeparateSubscriber.unsubscribe();
            this._removeUpdateValueSeparateSubscriber = null;
        }
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawTimePickerModule, JigsawDatePickerModule, JigsawButtonModule, TranslateModule.forChild()],
    declarations: [JigsawDateTimePicker],
    exports: [JigsawDateTimePicker],
})
export class JigsawDateTimePickerModule {
    constructor() {
        TranslateHelper.initI18n('dateTimePicker', {
            zh: {
                confirm: "确认",
            },
            en: {
                confirm: 'Confirm',
            }
        });
    }
}
