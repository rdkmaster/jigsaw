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
import {JigsawTimePickerModule} from "./time-picker";
import {TimeGr, TimeService} from "../../common/service/time.service";
import {Time, WeekTime} from "../../common/service/time.types";
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'jigsaw-date-time-picker, j-date-time-picker, jigsaw-time, j-time',
    templateUrl: './date-time-picker.html',
    host: {
        '[class.jigsaw-date-time-picker]': 'true',
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

    @Input()
    public valid: boolean = true;

    @Output()
    public grChange = new EventEmitter<TimeGr>();

    public _$timeGr: TimeGr.time | TimeGr.time_hour_minute | TimeGr.time_minute_second | TimeGr.time_hour;
    public _$dateGr: TimeGr.date | TimeGr.month | TimeGr.week;
    private _gr: TimeGr = TimeGr.date;

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

    private _date: WeekTime;
    public _$time: string;
    private __date: string;

    public get _$date(): string {
        return this.__date;
    }

    public set _$date(d: string) {
        this.__date = d;
        this._updateTimeLimit();
    }

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

    @Output()
    public dateChange = new EventEmitter<WeekTime>();

    private _limitStart: Time;
    public _$dateLimitStart: string;
    private _timeLimitStart: string;
    public _$timeLimitStartCur: string = '00:00:00';

    public get limitStart(): Time {
        return this._limitStart;
    }

    @Input()
    public set limitStart(value: Time) {
        if (value) {
            this._limitStart = TimeService.convertValue(value, <TimeGr>this.gr);
            [this._$dateLimitStart, this._timeLimitStart] = this._limitStart.split(' ');
            this._updateTimeLimit();
        } else {
            this._limitStart = null;
            this._$dateLimitStart = null;
            this._timeLimitStart = null;
        }
        //this._checkMacro();
    }

    private _limitEnd: Time;
    public _$dateLimitEnd: string;
    private _timeLimitEnd: string;
    public _$timeLimitEndCur: string = "23:59:59";

    public get limitEnd(): Time {
        return this._limitEnd
    }

    @Input()
    public set limitEnd(value: Time) {
        if (value) {
            this._limitEnd = TimeService.convertValue(value, <TimeGr>this.gr);
            [this._$dateLimitEnd, this._timeLimitEnd] = this._limitEnd.split(' ');
            this._updateTimeLimit();
        } else {
            this._limitEnd = null;
            this._$dateLimitEnd = null;
            this._timeLimitEnd = null;
        }
        //this._checkMacro();
    }

    private _refreshInterval: number;

    @Input()
    public get refreshInterval(): number {
        return this._refreshInterval;
    }

    public set refreshInterval(value: number) {
        if (value || value == 0) {
            this._refreshInterval = value;
        }
    }

    @Input()
    public grItems: GrItem[];

    @Input()
    public markDates: MarkDate[];

    @Input()
    public rangeDate: string;

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

    public _$handleDateChange($event) {
        this._updateValue.emit('combine');
    }

    public _$handleTimeChange($event) {
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
