import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AbstractJigsawComponent} from "../common";
import {TimeGr, TimeService, TimeUnit, TimeWeekStart} from "../../service/time.service";
import {GrItem, JigsawTime, Shortcut} from "../time/time";
import {WeekTime} from "../../service/time.types";

/**
 * 用于在界面上提供一个时间范围的选择，支持多种时间粒度切换，支持年月日时分秒及其各种组合，如下是一些常见的场景及其建议：
 *
 * - 如果需要选择的是一个时刻，则请使用`JigsawTime`；
 * - 如果你需要的是一个日历的功能，那请参考[这个demo]($demo/time/calendar)，通过表格+渲染器的方式来模拟；
 * - 时间选择器常常是收纳到下拉框中以解决视图空间，Jigsaw是通过`JigsawComboSelect`来组合使用的，
 * 参考[这个demo]($demo/range-time/with-combo-select)；
 *
 * 时间控件是对表单友好的，你可以给时间控件编写表单校验器，参考[这个demo]($demo/form/template-driven)。
 *
 * $demo = range-time/full
 * $demo = range-time/basic
 */
@Component({
    selector: 'jigsaw-range-time, j-range-time',
    templateUrl: 'range-time.html',
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRangeTime), multi: true},
    ],
    host: {
        '[class.jigsaw-range-time-host]': 'true'
    }
})
export class JigsawRangeTime extends AbstractJigsawComponent implements ControlValueAccessor, OnInit {

    @ViewChild("timeStart") private _timeStart: JigsawTime;

    /**
     * @internal
     */
    public _$gr: TimeGr = TimeGr.date;

    /**
     * 参考`JigsawTime.gr`
     *
     * $demo = range-time/gr
     *
     * @return {TimeGr | string}
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
     * @type {EventEmitter<TimeGr>}
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
     * @return {WeekTime}
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
     * @return {WeekTime}
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
     * @return {WeekTime}
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
     * 参考`JigsawTime.weekStart`
     *
     * $demo = range-time/week-start
     */
    @Input()
    public weekStart: TimeWeekStart | string;

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

    /**
     * 参考`JigsawTime.recommendedBegin`
     *
     * $demo = range-time/recommended
     */
    @Input()
    public recommendedBegin: WeekTime;

    /**
     * 参考`JigsawTime.recommendedEnd`
     *
     * $demo = range-time/recommended
     */
    @Input()
    public recommendedEnd: WeekTime;

    /**
     * 参考`JigsawTime.recommendedLabel`
     *
     * $demo = range-time/recommended
     */
    @Input()
    public recommendedLabel: String;

    /**
     * 当用户选择时间时，Jigsaw发出此事件。
     *
     * $demo = range-time/with-combo-select
     *
     * @type {EventEmitter<any>}
     */
    @Output()
    public change = new EventEmitter<any>();

    /**
     * 当开始时间被用户切换之后，Jigsaw会发出此事件。
     *
     * $demo = range-time/basic
     *
     * @type {EventEmitter<WeekTime>}
     */
    @Output()
    public beginDateChange = new EventEmitter<WeekTime>();

    /**
     * 当结束时间被用户切换之后，Jigsaw会发出此事件。
     *
     * $demo = range-time/basic
     *
     * @type {EventEmitter<WeekTime>}
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

    ngOnInit() {
        this.callLater(this._init, this);
    }

    private _init() {
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
            let calculateTime: WeekTime = JigsawRangeTime._calculateLimitEnd(TimeService.convertValue(this._beginDate,
                <TimeGr>this._timeStart.gr), item.span, <TimeGr>this._timeStart.gr);
            calculateTime = TimeService.getDate(calculateTime, <TimeGr>this._timeStart.gr);
            if (!endTime || endTime > calculateTime) {
                endTime = calculateTime;
            }
        }
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
    }

    private _changeShortcut(selectedShortcut: Shortcut) {
        if (selectedShortcut.dateRange) {
            let [beginDate, endDate] = typeof  selectedShortcut.dateRange === "function" ? selectedShortcut.dateRange.call(this) : selectedShortcut.dateRange;

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
            this.callLater(() => this._endDate = endDate);
        }
    }

    private _handleWeekSelect(date: string) {
        let weekNum = TimeService.getWeekOfYear(date);
        let year = TimeService.getYear(date);
        return {year: year, week: weekNum};
    }

    private _propagateChange: any = () => {
    };

    public writeValue(value: any): void {
        if (!value) {
            return;
        }
        if (value.hasOwnProperty('beginDate') && this._beginDate != value.beginDate) {
            this.callLater(() => {
                if (value.fromTimeComponent) {
                    // 从time控件来时，直接使用
                    this._beginDate = value.beginDate;
                } else {
                    // 从外部来需要转换
                    this._beginDate = this.gr == TimeGr.week ? this._handleWeekSelect(value) : TimeService.convertValue(value.beginDate, <TimeGr>this.gr);
                }
                this._$endTimeLimitEnd = this._calculateLimitEnd();
                this._startTimeLimitEnd = this._beginDate;
                this.beginDateChange.emit(this._beginDate);
                this.change.emit({"beginDate": this._beginDate, "endDate": this._endDate});
            });
        }
        if (value.hasOwnProperty('endDate') && this._endDate != value.endDate) {
            this.callLater(() => {
                if (value.fromTimeComponent) {
                    // 从time控件来时，直接使用
                    this._endDate = value.endDate;
                } else {
                    // 从外部来需要转换
                    this._endDate = this.gr == TimeGr.week ? this._handleWeekSelect(value) : TimeService.convertValue(value.endDate, <TimeGr>this.gr);
                }
                this.endDateChange.emit(this._endDate);
                this.change.emit({"beginDate": this._beginDate, "endDate": this._endDate});
            });
        }
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}
