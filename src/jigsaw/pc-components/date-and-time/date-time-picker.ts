import {AbstractJigsawComponent} from "../../common/common";
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {GrItem, JigsawDatePickerModule, MarkDate} from "./date-picker";
import {JigsawTimePickerModule, TimeStep} from "./time-picker";
import {TimeGr, TimeService} from "../../common/service/time.service";
import {Time, WeekTime} from "../../common/service/time.types";
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'jigsaw-date-time-picker, j-date-time-picker, jigsaw-time, j-time',
    templateUrl: './date-time-picker.html',
    host: {
        '[class.jigsaw-date-time-picker]': 'true',
        '[class.jigsaw-date-time-picker-error]': '!valid',
        '[class.jigsaw-date-time-picker-disabled]': 'disabled',
        '[style.width]': 'width',
        '[style.height]': 'height',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawDateTimePicker), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawDateTimePicker extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, OnDestroy {
    constructor(private _cdr: ChangeDetectorRef) {
        super();
        this._removeUpdateValueSubscriber = this._updateValue.pipe(debounceTime(300)).subscribe((mode: 'combine' | 'separate') => {
            let newDate;
            if (mode == 'separate') {
                if (!this.date) return;
                newDate = TimeService.convertValue(this.date, this._gr);
                [this._$date, this._$time] = newDate.split(' ');
                this._cdr.markForCheck();
            } else if(mode == 'combine') {
                if (!this._$date) return;
                newDate = this._$date;
                if (this.gr == TimeGr.hour || this.gr == TimeGr.minute || this.gr == TimeGr.second) {
                    this._$time = this._$time ? this._$time : this._getDefaultTime();
                    newDate += ` ${this._$time}`
                }
            }
            this.writeValue(newDate);
        })
    }

    /**
     * 参考`JigsawDateTimePicker.disabled`
     * $demo = date-time-picker/disabled
     */
    @Input()
    public disabled: boolean;

    /**
     * 标记当前日期值是否有效，无效时，呈现一个红色框框，常用于表单中配合表单是否有效
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
        if (value == this._gr) return;
        this._gr = <TimeGr>value;
        this._calTimeGr(this._gr);
        this._calDateGr(this._gr);
        if (this.initialized && this.date) {
            let newDate = TimeService.handleWeekDateToDate(this.date, this._gr);
            [this._$date, this._$time] = newDate.split(' ');
            this._updateValue.emit('separate');
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
     * $demo = date-time-picker/basic
     * $demo = date-time-picker/mark
     */
    @Input()
    public get date(): WeekTime {
        return this._date;
    }

    public set date(newValue: WeekTime) {
        if (!newValue || newValue == this._date) return;
        this._date = newValue;
        if (this.initialized) {
            this._updateValue.emit('separate');
        }
    }

    /**
     * 当时间被用户切换之后，Jigsaw会发出此事件。
     * $demo = date-time-picker/basic
     */
    @Output()
    public dateChange = new EventEmitter<WeekTime>();

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

    @Input()
    public set limitStart(value: Time) {
        if (value) {
            this._limitStart = TimeService.convertValue(value, <TimeGr>this.gr);
            [this._$dateLimitStart, this._timeLimitStart] = this._limitStart.split(' ');
            if(TimeService.isMacro(value)) {
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

    @Input()
    public set limitEnd(value: Time) {
        if (value) {
            this._limitEnd = TimeService.convertValue(value, <TimeGr>this.gr);
            [this._$dateLimitEnd, this._timeLimitEnd] = this._limitEnd.split(' ');
            if(TimeService.isMacro(value)) {
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
     *
     * $demo = date-time-picker/gr-items
     */
    @Input()
    public grItems: GrItem[];

    /**
     * 对选定的日期做标记，用于提示用户这些日期具有特定含义
     * $demo = date-time-picker/mark
     */
    @Input()
    public markDates: MarkDate[];

    /**
     * @internal
     */
    @Input()
    public rangeDate: string;

    /**
     * 分钟、秒钟选择面板的默认有60个数字可以挑选，显得比较凌乱，你可以设置此值为5/10来减少面板上的可选项
     * $demo = date-time-picker/step
     */
    @Input()
    public step: TimeStep;

    private _updateValue = new EventEmitter();
    private _removeUpdateValueSubscriber: Subscription;

    private _updateTimeLimit() {
        this._$timeLimitStartCur = this._$date == this._$dateLimitStart ? this._timeLimitStart : this._getDefaultLimitStart();
        this._$timeLimitEndCur = this._$date == this._$dateLimitEnd ? this._timeLimitEnd : this._getDefaultLimitEnd();
    }

    public _$changeGr($event: GrItem) {
        if (!$event) {
            return;
        }
        this.gr = $event.value;
        this.grChange.emit(<TimeGr>this.gr);
        this._cdr.markForCheck();
    }

    public _$handleDateChange() {
        this._updateValue.emit('combine');
    }

    public _$handleTimeChange() {
        this._updateValue.emit('combine');
    }

    private _getDefaultLimitStart() {
        return this.gr == TimeGr.hour ? '00' : this.gr == TimeGr.time_hour_minute ? '00:00' : '00:00:00';
    }

    private _getDefaultLimitEnd() {
        return  this.gr == TimeGr.hour ? '23' : this.gr == TimeGr.time_hour_minute ? '23:59' : '23:59:59';
    }

    private _getDefaultTime() {
        return this.gr == TimeGr.hour ? '00' : this.gr == TimeGr.time_hour_minute ? '00:00' : '00:00:00';
    }

    public writeValue(date: string): void {
        if (this._date == date) return;
        this._date = date;
        this.dateChange.emit(date);
        this._propagateChange();
    }

    private _propagateChange: any = () => {
    };

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    ngOnInit() {
        super.ngOnInit();
        this._updateValue.emit('separate');
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeUpdateValueSubscriber) {
            this._removeUpdateValueSubscriber.unsubscribe();
            this._removeUpdateValueSubscriber = null;
        }
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawTimePickerModule, JigsawDatePickerModule],
    declarations: [JigsawDateTimePicker],
    exports: [JigsawDateTimePicker],
})
export class JigsawDateTimePickerModule {
}
