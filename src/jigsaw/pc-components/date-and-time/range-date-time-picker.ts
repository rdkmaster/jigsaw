import {AbstractJigsawComponent} from "../../common/common";
import {
    Component,
    forwardRef,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ViewChild,
    ChangeDetectorRef,
    NgZone,
    NgModule
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule} from '@angular/forms';
import {GrItem, MarkDate, Shortcut} from "./date-picker";
import {CommonModule} from '@angular/common';
import {TimeGr, TimeService, TimeUnit, TimeWeekDayStart, TimeWeekStart} from "../../common/service/time.service";
import {WeekTime} from "../../common/service/time.types";
import {JigsawDateTimePicker, JigsawDateTimePickerModule} from "./date-time-picker";

declare const moment: any;

@Component({
    selector: 'jigsaw-range-date-time-picker, j-range-date-time-picker, jigsaw-range-time, j-range-time',
    templateUrl: './range-date-time-picker.html',
    host: {
        '[class.jigsaw-range-date-time-picker-host]': 'true',
        '[class.jigsaw-range-date-time-picker-error]': '!valid'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRangeDateTimePicker), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawRangeDateTimePicker extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, OnDestroy {
    constructor(protected _zone: NgZone, private _cdr: ChangeDetectorRef) {
        super(_zone);
    }

    @Input()
    public valid: boolean = true;

    @ViewChild("timeStart", {static: true}) private _timeStart: JigsawDateTimePicker;

    /**
     * @internal
     */
    public _$gr: TimeGr = TimeGr.date;

    /**
     * 参考`JigsawTime.gr`
     *
     * $demo = range-time/gr
     *
     *
     */
    @Input("gr")
    public get gr(): TimeGr | string {
        return (this._$gr || this._$gr === 0) ? this._$gr : TimeGr.date;
    }

    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if (<TimeGr>value != this._$gr) {
            this._$gr = <TimeGr>value;
            this.grChange.emit(this._$gr);
        }
    }

    /**
     * 参考`JigsawTime.grChange`
     *
     * $demo = range-time/gr
     *
     */
    @Output()
    public grChange = new EventEmitter<TimeGr>();

    /**
     * @internal
     */
    public _$dateChange(key: string, value: WeekTime) {
        // 标记beginDate,endDate从time控件来
        const val = {fromTimeComponent: true};
        val[key] = value;
        this.writeValue(val);
        this._propagateChange({"beginDate": this._beginDate, "endDate": this._endDate});
        this._cdr.markForCheck();
    }

    private _beginDate: WeekTime;

    /**
     * 时间段的开始时刻，在双绑模式下，更新这个值可以让时间控件选中对应的时刻。
     *
     * $demo = range-time/basic
     */
    @Input()
    public get beginDate(): WeekTime {
        return this._beginDate;
    }

    public set beginDate(value: WeekTime) {
        this.writeValue({beginDate: value});
        this._propagateChange({"beginDate": this._beginDate, "endDate": this._endDate});
    }

    private _endDate: WeekTime;

    /**
     * 时间段的结束时刻，在双绑模式下，更新这个值可以让时间控件选中对应的时刻。
     *
     * $demo = range-time/basic
     *
     *
     */
    @Input()
    public get endDate(): WeekTime {
        return this._endDate;
    }

    public set endDate(value: WeekTime) {
        this.writeValue({endDate: value});
        this._propagateChange({"beginDate": this._beginDate, "endDate": this._endDate});
    }

    /**
     * @internal
     */
    public _$limitStart: WeekTime;

    /**
     * 参考`JigsawTime.limitStart`
     *
     * $demo = range-time/limit-start
     * $demo = range-time/limit-end
     *
     *
     */
    @Input()
    public get limitStart(): WeekTime {
        return this._$limitStart;
    }

    public set limitStart(value: WeekTime) {
        if (value) {
            this._$limitStart = value;
        }
    }

    /**
     * @internal
     */
    public _$limitEnd: WeekTime;

    /**
     * 参考`JigsawTime.limitEnd`
     *
     * $demo = range-time/limit-start
     * $demo = range-time/limit-end
     *
     *
     */
    @Input()
    public get limitEnd(): WeekTime {
        return this._$limitEnd;
    }

    public set limitEnd(value: WeekTime) {
        if (value) {
            this._$limitEnd = value;
            this._$endTimeLimitEnd = this._calculateLimitEnd();
        }
    }

    /**
     * @internal
     */
    @Input()
    public weekStart: TimeWeekStart | string;

    /**
     * @internal
     */
    @Input()
    public weekDayStart: TimeWeekDayStart | string;

    /**
     * 参考`JigsawTime.grItems`
     *
     * $demo = range-time/gr-items
     */
    @Input()
    public grItems: GrItem[];

    /**
     * 参考`JigsawTime.refreshInterval`
     *
     * $demo = range-time/refresh-interval
     */
    @Input()
    public refreshInterval: number;

    @Input()
    markDates: MarkDate[];

    /**
     * 当用户选择时间时，Jigsaw发出此事件。
     *
     * $demo = time/with-combo-select
     *
     */
    @Output()
    public change = new EventEmitter<any>();

    /**
     * 当开始时间被用户切换之后，Jigsaw会发出此事件。
     *
     * $demo = range-time/basic
     *
     */
    @Output()
    public beginDateChange = new EventEmitter<WeekTime>();

    /**
     * 当结束时间被用户切换之后，Jigsaw会发出此事件。
     *
     * $demo = range-time/basic
     *
     */
    @Output()
    public endDateChange = new EventEmitter<WeekTime>();

    /**
     * @internal
     */
    public _$shortcuts: Shortcut[];

    /**
     * @internal
     */
    public _$endTimeLimitEnd: WeekTime;

    private _startTimeLimitEnd: WeekTime;

    private _startTimeLimitStart: WeekTime;

    private _init() {
        this._cdr.markForCheck();
        this._$shortcuts = this._getShortcuts();
        this._$endTimeLimitEnd = this._calculateLimitEnd();
    }

    private _calculateLimitEnd(): WeekTime {
        let item: GrItem = this.grItems && this.grItems.find(item => item.value == this._timeStart.gr);
        let endTime: WeekTime = null;
        if (this._$limitEnd) {
            endTime = TimeService.getDate(TimeService.convertValue(
                this._$limitEnd, <TimeGr>this._timeStart.gr), <TimeGr>this._timeStart.gr);
        }
        if (item && item.span) {
            let calculateTime: WeekTime = JigsawRangeDateTimePicker._calculateLimitEnd(TimeService.convertValue(this._beginDate,
                <TimeGr>this._timeStart.gr), item.span, <TimeGr>this._timeStart.gr);
            calculateTime = TimeService.getDate(calculateTime, <TimeGr>this._timeStart.gr);
            if (!endTime || endTime > calculateTime) {
                endTime = calculateTime;
            }
        }
        this._cdr.markForCheck();
        return endTime;
    }

    private static _calculateLimitEnd(startDate: string, span: string, gr: TimeGr): Date {
        let endTime: Date = new Date(TimeService.format(TimeService.getDate(startDate, gr), 'YYYY-MM-DD'));
        endTime.setHours(23);
        endTime.setMinutes(59);
        endTime.setSeconds(59);
        switch (span) {
            case "inday":
                break;
            case "inweek":
                endTime.setDate(endTime.getDate() + 6 - endTime.getDay());
                break;
            case "inmonth":
                endTime.setMonth(endTime.getMonth() + 1);
                endTime.setDate(1);
                endTime.setDate(endTime.getDate() - 1);
                break;
            case "inyear":
                endTime.setMonth(11);
                endTime.setDate(31);
                break;
            default:
                let spanReg: RegExp = /([\d]+)([a-z]+)?/i;
                span = span.replace(/\s+/g, "");
                let gapArr: string[] = spanReg.exec(span);
                let endTimeFormat = TimeService.format(TimeService.addDate(endTime, gapArr[1], TimeUnit[gapArr[2].toLowerCase()]), 'YYYY-MM-DD,HH:mm:ss');
                let endTimeParse = moment(endTimeFormat, "YYYY-MM-DD HH:mm:ss");
                endTime = new Date(endTimeParse);
                switch (gapArr[2]) {
                    case "d":
                    case "D":
                        break;
                    case "w":
                    case "W":
                        endTime.setDate(endTime.getDate() - 1 - endTime.getDay());
                        break;
                    case "m":
                    case "M":
                        endTime.setDate(1);
                        endTime.setDate(endTime.getDate() - 1);
                        break;
                    case "y":
                    case "Y":
                        endTime.setMonth(0);
                        endTime.setDate(1);
                        endTime.setDate(endTime.getDate() - 1);
                        break;
                }
        }
        return endTime;
    }

    private _getShortcuts(): Shortcut[] {
        let item: GrItem = this.grItems && this.grItems.find(item => item.value == this._timeStart.gr);
        if (item && item.shortcuts && item.shortcuts.length != 0) {
            return item.shortcuts;
        }
        return null;
    }

    /**
     * @internal
     */
    public _$grChange(value: TimeGr) {
        this._init();
        this.grChange.emit(value);
        this._cdr.markForCheck();
    }

    /**
     * @internal
     */
    public _changeShortcut(selectedShortcut: Shortcut) {
        if (selectedShortcut.dateRange) {
            let [beginDate, endDate] = typeof selectedShortcut.dateRange === "function" ? selectedShortcut.dateRange.call(this) : selectedShortcut.dateRange;

            beginDate = TimeService.convertValue(beginDate, <TimeGr>this._timeStart.gr);
            let limitStart = this._$limitStart && TimeService.convertValue(this._$limitStart, <TimeGr>this._timeStart.gr);
            let limitEnd = this._$limitEnd && TimeService.convertValue(this._$limitEnd, <TimeGr>this._timeStart.gr);
            if (!((limitStart && beginDate < limitStart) || (limitEnd && beginDate > limitEnd))) {
                this._beginDate = beginDate;
            } else {
                this._beginDate = limitStart;
            }

            this._$endTimeLimitEnd = this._calculateLimitEnd();

            //先设置好limit，再设置date
            this.runMicrotask(() => this._endDate = endDate);
            this._cdr.markForCheck();
        }
    }

    private _handleWeekSelect(date: string) {
        let weekNum = TimeService.getWeekOfYear(date);
        let year = TimeService.getWeekYear(date);
        this._cdr.markForCheck();
        return {year: year, week: weekNum};
    }

    public writeValue(value: any): void {
        if (!value) {
            return;
        }
        if (value.hasOwnProperty('beginDate') && this._beginDate != value.beginDate) {
            this.runMicrotask(() => {
                if (value.fromTimeComponent) {
                    // 从time控件来时，直接使用
                    this._beginDate = value.beginDate;
                } else {
                    // 从外部来需要转换
                    let timeStr = TimeService.convertValue(value.beginDate, <TimeGr>this.gr);
                    this._beginDate = this.gr == TimeGr.week ? this._handleWeekSelect(timeStr) : timeStr;
                }
                this._$endTimeLimitEnd = this._calculateLimitEnd();
                this._startTimeLimitEnd = this._beginDate;
                this.beginDateChange.emit(this._beginDate);
                this.change.emit({"beginDate": this._beginDate, "endDate": this._endDate});
                // 这里给this._beginDate赋的值（为了避免循环调用writeValue），所有要加detectChanges执行子组件的变更检查
                this._cdr.detectChanges();
            });
        }
        if (value.hasOwnProperty('endDate') && this._endDate != value.endDate) {
            this.runMicrotask(() => {
                if (value.fromTimeComponent) {
                    // 从time控件来时，直接使用
                    this._endDate = value.endDate;
                } else {
                    // 从外部来需要转换
                    let timeStr = TimeService.convertValue(value.endDate, <TimeGr>this.gr);
                    this._endDate = this.gr == TimeGr.week ? this._handleWeekSelect(timeStr) : timeStr;
                }
                this.endDateChange.emit(this._endDate);
                this.change.emit({"beginDate": this._beginDate, "endDate": this._endDate});
                // 这里给this._beginDate赋的值（为了避免循环调用writeValue），所有要加detectChanges执行子组件的变更检查
                this._cdr.detectChanges();
            });
        }
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
        this.runMicrotask(this._init, this);
    }

    ngOnDestroy() {
        super.ngOnDestroy();

    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawDateTimePickerModule],
    declarations: [JigsawRangeDateTimePicker],
    exports: [JigsawRangeDateTimePicker],
})
export class JigsawRangeDateTimePickerModule {

}
