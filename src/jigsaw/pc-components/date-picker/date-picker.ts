import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    Output,
    Renderer2
} from '@angular/core';
import {AbstractJigsawComponent} from "../../common/common";
import {JigsawButtonBarModule} from "../list-and-tile/button-bar";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TimeGr, TimeService, TimeUnit} from "../../common/service/time.service";
import {Time, TimeWeekDay, WeekTime} from "../../common/service/time.types";
import {GrItem} from "../time";
import {PopupService} from "../../common/service/popup.service";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

declare const moment: any;

export type DayCell = {
    day: number;
    isToday?: boolean;
    isOwnPrevMonth?: boolean;
    isOwnNextMonth?: boolean;
    isSelected?: boolean,
    isDisabled?: boolean,
};

export type MonthCell = {month: number, label: string, isSelected?: boolean};
export type YearCell = {year: number, isSelected: boolean};

@Component({
    selector: 'jigsaw-date-picker, j-date-picker',
    templateUrl: './date-picker.html',
    host: {
        '[class.jigsaw-date-picker]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawDatePicker), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawDatePicker extends AbstractJigsawComponent implements ControlValueAccessor {
    constructor(private _el: ElementRef, private _renderer: Renderer2,
                private _popService: PopupService, private _translateService: TranslateService,
                private _changeDetectorRef: ChangeDetectorRef) {
        super();
        this._refreshInterval = 0;
        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(langInfo => {});
        InternalUtils.initI18n(_translateService, 'time', {
            zh: {recommendedLabel: '推荐日期'},
            en: {recommendedLabel: 'Recommend'}
        });
        _translateService.setDefaultLang(_translateService.getBrowserLang());

        this._defineLocale();
        // defineLocale会使moment设置locale，需要重置为浏览器默认值
        moment.locale(_translateService.getBrowserLang());
    }

    public _$curMonth: MonthCell;
    public _$monthList: MonthCell[][] = [];
    public _$curYear: number;
    public _$yearList: YearCell[][] = [];
    public _$dayList: DayCell[][] = [];
    public _$weekList: string[] = [];
    public _$selectMode: 'day' | 'month' | 'year' = 'day';

    private _weekPos: number[];

    private _DAY_CAL_COL = 7;
    private _DAY_CAL_ROW = 6;
    private _MONTH_CAL_COL = 3;
    private _MONTH_CAL_ROW = 4;
    private _YEAR_CAL_COL = 3;
    private _YEAR_CAL_ROW = 4;
    private _CUR_YEAR_POS = 4;

    private _createCalendar(year?: number, month?: number) {
        if(!year || !month) {
            let date = TimeService.convertValue(this.date, TimeGr.date);
            [year, month] = [TimeService.getYear(date), TimeService.getMonth(date)];
        }
        this._updateHead(year, month);
        this._createMonthCal(month);
        this._createYearCal(year);
        this._createDayCal(year, month);
    }

    private _updateHead(year: number, month: number) {
        this._$curMonth = {month: month, label: TimeService.getMonthShort()[month - 1]};
        this._$curYear = year;
    }

    private _createYearCal(year: number, startYear?: number) {
        this._$yearList = this._createYearList(year, startYear);
    }

    private _createYearList(curYear: number, startYear?: number): YearCell[][] {
        startYear = startYear ? startYear : curYear - this._CUR_YEAR_POS;
        let yearCount = startYear;
        return Array.from(new Array(this._YEAR_CAL_ROW).keys()).map(row => {
            let rowArr = [];
            let index = 0;
            while(index < this._YEAR_CAL_COL) {
                rowArr[index] = {year: yearCount, isSelected: yearCount == curYear};
                index++;
                yearCount++;
            }
            return rowArr;
        });
    }

    /**
     * @internal
     */
    public _$showYearList() {
        this._$selectMode = this._$selectMode != 'year' ? 'year' : this._$gr == TimeGr.month ? 'month' : 'day';
    }

    /**
     * @internal
     */
    public _$selectYear(yearCell: YearCell) {
        if(this.date) {
            let date = TimeService.getRealDateOfMonth(yearCell.year, this._$curMonth.month, TimeService.getDay(TimeService.convertValue(this.date, TimeGr.date)));
            this.date = TimeService.convertValue(date, <TimeGr>this.gr);
        } else {
            this._createCalendar(yearCell.year, this._$curMonth.month);
        }
        this._$selectMode = this._$gr == TimeGr.month ? 'month' : 'day';
    }

    private _createMonthCal(month: number) {
        this._$monthList = this._createMonthList(month);
    }

    private _createMonthList(month: number): MonthCell[][] {
        let monthList: MonthCell[] = TimeService.getMonthShort().map((m, i) => ({month: i + 1, label: m, isSelected: month == i + 1}));
        let monthIndex = 0;
        return Array.from(new Array(this._MONTH_CAL_ROW).keys()).map(row => {
            let rowArr = [];
            let index = 0;
            while(index < this._MONTH_CAL_COL) {
                rowArr[index] = monthList[monthIndex];
                index++;
                monthIndex++;
            }
            return rowArr;
        })
    }

    /**
     * @internal
     */
    public _$showMonthList() {
        this._$selectMode = this._$selectMode != 'month' || this._$gr == TimeGr.month ? 'month' : 'day';
    }

    /**
     * @internal
     */
    public _$selectMonth(monthCell: MonthCell) {
        if(this.date) {
            let date = TimeService.getRealDateOfMonth(this._$curYear, monthCell.month, TimeService.getDay(TimeService.convertValue(this.date, TimeGr.date)));
            this.date = TimeService.convertValue(date, <TimeGr>this.gr);
        } else {
            this._createCalendar(this._$curYear, monthCell.month);
        }
        if(this._$gr != TimeGr.month) {
            this._$selectMode = 'day';
        }
    }

    private _createDayCal(year: number, month: number) {
        this._weekPos = this._getWeekPos();
        this._$weekList = this._createWeekList(this._weekPos);
        this._$dayList = this._createDayList(this._weekPos, year, month);
    }

    private _getWeekPos(): number[] {
        let weekStart = TimeService.getWeekStart();
        let week;
        return Array.from(new Array(this._DAY_CAL_COL).keys()).map(num => {
            week = num == 0 ? weekStart : week;
            let weekCur = week;
            week++;
            if(week > this._DAY_CAL_COL - 1) {
                week = 0;
            }
            return weekCur;
        });
    }

    private _createWeekList(weekPos: number[]): string[] {
        let weekdays = TimeService.getWeekdaysMin();
        return weekPos.map(pos => weekdays[pos]);
    }

    private _createDayList(weekPos: number[], year: number, month: number): DayCell[][] {
        let [firstDate,lastDate] = [TimeService.convertValue(TimeService.getFirstDateOfMonth(year, month), TimeGr.date),
            TimeService.convertValue(TimeService.getLastDateOfMonth(year, month), TimeGr.date)];
        let [countDayNum, maxDayNum, countNextMonthDayNum] = [1, TimeService.getDay(TimeService.getLastDateOfMonth(year, month)), 1];
        let firstDayWeek = new Date(firstDate).getDay();
        let firstDayWeekPos = weekPos.findIndex(w => w === firstDayWeek);
        return Array.from(new Array(this._DAY_CAL_ROW).keys()).map(row => {
            let index = row == 0 ? firstDayWeekPos : 0;
            let rowArr: DayCell[] = Array.from(new Array(this._DAY_CAL_COL).keys()).map(num => ({day: -1}));
            while(index < rowArr.length && countDayNum <= maxDayNum) {
                rowArr[index] = {
                    day: countDayNum,
                    isToday: this._isToday(year, month, countDayNum),
                    isSelected: this._isDaySelected(year, month, countDayNum),
                    isDisabled: this._isDayDisabled(year, month, countDayNum)
                };
                index++;
                countDayNum++;
            }
            if (row == 0 && firstDayWeekPos > 0) {
                index = firstDayWeekPos - 1;
                let addDay = -1;
                while(index >= 0) {
                    let date = TimeService.addDate(firstDate, addDay, TimeUnit.d);
                    let [y, m, d] = [TimeService.getYear(date), TimeService.getMonth(date), TimeService.getDay(date)];
                    rowArr[index] = {
                        day: d,
                        isOwnPrevMonth: true,
                        isSelected: this._isDaySelected(y, m, d),
                        isDisabled: this._isDayDisabled(y, m, d)
                    };
                    addDay--;
                    index--;
                }
            }
            if(countDayNum > maxDayNum) {
                while(index < rowArr.length) {
                    let date = TimeService.addDate(lastDate, countNextMonthDayNum, TimeUnit.d);
                    let [y, m, d] = [TimeService.getYear(date), TimeService.getMonth(date), TimeService.getDay(date)];
                    rowArr[index] = {
                        day: d,
                        isOwnNextMonth: true,
                        isSelected: this._isDaySelected(y, m, d),
                        isDisabled: this._isDayDisabled(y, m, d)
                    };
                    countNextMonthDayNum++;
                    index++;
                }
            }
            return rowArr;
        })
    }

    private _isToday(year: number, month: number, day: number) {
        let today = TimeService.convertValue('now', TimeGr.date);
        return TimeService.getYear(today) == year && TimeService.getMonth(today) == month && TimeService.getDay(today) == day
    }

    private _isDaySelected(year: number, month: number, day: number): boolean {
        if(!this.date) return false;
        if(this.gr == TimeGr.week) {
            let date = this._getWeekDate(`${year}-${month}-${day}`);
            return this._isSameWeek(<TimeWeekDay>this.date, date);
        } else {
            let date = TimeService.convertValue(this.date, TimeGr.date);
            return TimeService.getYear(date) == year && TimeService.getMonth(date) == month && TimeService.getDay(date) == day
        }
    }

    private _isDayDisabled(year: number, month: number, day: number) {
        let date = TimeService.convertValue(`${year}-${month}-${day}`, <TimeGr>this.gr);
        return (this.limitStart && date < this.limitStart) || (this.limitEnd && date > this.limitEnd)
    }

    /**
     * @internal
     */
    public _$selectDay(dayCell: DayCell) {
        if(dayCell.isDisabled) return;
        let [year, month, day] = [this._$curYear, this._$curMonth.month, dayCell.day];
        if(dayCell.isOwnPrevMonth || dayCell.isOwnNextMonth) {
            let date = TimeService.addDate(`${year}-${month}`, dayCell.isOwnPrevMonth ? -1 : 1, TimeUnit.M);
            [year, month] = [TimeService.getYear(date), TimeService.getMonth(date)];
        }
        this.date = TimeService.convertValue(`${year}-${month}-${day}`, <TimeGr>this.gr);
    }

    /**
     * @internal
     */
    public _$handleCtrlBar(num: number) {
        if(this._$selectMode == 'day' || this._$selectMode == 'month') {
            if(this.date) {
                this.date = TimeService.convertValue(TimeService.addDate(TimeService.convertValue(this.date, TimeGr.date), num, TimeUnit.M), <TimeGr>this.gr);
            } else {
                let date = TimeService.convertValue(TimeService.addDate(`${this._$curYear}-${this._$curMonth.month}`, num, TimeUnit.M), TimeGr.month);
                this._createCalendar(TimeService.getYear(date), TimeService.getMonth(date));
            }
        }
        if(this._$selectMode == 'year') {
            this._createYearCal(this._$curYear, this._$yearList[0][0].year + this._YEAR_CAL_ROW*this._YEAR_CAL_COL*num);
        }
    }

    private _langChangeSubscriber: Subscription;

    @Input()
    public valid: boolean = true;

    @Output()
    public grChange = new EventEmitter<TimeGr>();

    public _$gr: TimeGr = TimeGr.date;

    @Input()
    public get gr(): TimeGr | string {
        return this._$gr;
    }

    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if (<TimeGr>value != this._$gr) {
            this._$gr = <TimeGr>value;
            this._$selectMode = TimeGr[this._$gr] == 'month' ? 'month' : 'day';
            if(this.initialized && this.date) {
                this.writeValue(this.date);
            }
        }
    }

    private _date: WeekTime;
    private _dateInitBak: WeekTime;

    @Input()
    public get date(): WeekTime {
        return this._date;
    }

    public set date(newValue: WeekTime) {
        if(this.initialized) {
            this.writeValue(newValue);
        } else {
            this._dateInitBak = newValue
        }
    }

    @Output()
    public dateChange = new EventEmitter<WeekTime>();

    private _limitEnd: Time;

    public get limitEnd(): Time {
        return this._limitEnd
    }

    @Input()
    public set limitEnd(value: Time) {
        if(!value) return;
        this._limitEnd = TimeService.convertValue(value, <TimeGr>this.gr);
        if(this.initialized && this.date) {
            this.writeValue(this.date);
        }
        //this._checkMacro();
        // if (this._timePicker) {
        //     if (this._timePicker.minDate() && this._timePicker.minDate() > TimeService.getDate(this.limitEnd, <TimeGr>this.gr)) {
        //         this._timePicker.minDate(this.limitEnd)
        //     }
        //     this._timePicker.maxDate(this.limitEnd);
        // this._weekHandle();
        // this._handleRecommended(this._el.nativeElement, this._popService);
    }

    private _limitStart: Time;

    public get limitStart(): Time {
        return this._limitStart;
    }

    @Input()
    public set limitStart(value: Time) {
        if (!value) return;
        this._limitStart = TimeService.convertValue(value, <TimeGr>this.gr);
        if(this.initialized && this.date) {
            this.writeValue(this.date);
        }
        //this._checkMacro();
        // if (this._timePicker) {
        //     if (this._timePicker.maxDate() && this._timePicker.maxDate() < TimeService.getDate(this.limitStart, <TimeGr>this.gr)) {
        //         this._timePicker.maxDate(this.limitStart)
        //     }
        //     this._timePicker.minDate(this.limitStart);
            //this._weekHandle();
           // this._handleRecommended(this._el.nativeElement, this._popService);
        //}
    }

    private _refreshInterval: number;

    @Input()
    public get refreshInterval(): number {
        return this._refreshInterval;
    }

    public set refreshInterval(value: number) {
        if (value || value == 0) {
            this._refreshInterval = value;
            this._checkMacro();
        }
    }

    @Input()
    public grItems: GrItem[];

    @Input()
    public recommendedBegin: Time;

    @Input()
    public recommendedEnd: Time;

    @Input()
    public recommendedLabel: String;

    private _intervalId: number;
    private _checkMacro() {
        if (this._intervalId) {
            window.clearInterval(this._intervalId);
        }
        if ((TimeService.isMacro(<string>this._limitStart) || TimeService.isMacro(<string>this._limitEnd)) && this._refreshInterval != 0) {
            this._intervalId = window.setInterval(() => {
                this._handleLimitStartAndEnd();
            }, this._refreshInterval);
        }
    }

    private _handleLimitStartAndEnd() {
        // if (this._timePicker) {
        //     this._limitStart && this._timePicker.minDate(TimeService.addDate(<string>this.limitStart, -1, TimeUnit.s));
        //     this._limitEnd && this._timePicker.maxDate(TimeService.addDate(<string>this.limitEnd, 1, TimeUnit.s));
            this._weekHandle();
            this._handleRecommended(this._el.nativeElement, this._popService);
        //}
    }

    private _weekHandle() {
        if (this.gr == TimeGr.week) {
            this._handleWeekSelect();
        }
    }

    private _handleWeekSelect() {
        let weekNum = TimeService.getWeekOfYear(<string>this.date);
        let year = TimeService.getWeekYear(<string>this.date);
        // const tdActive = this._el.nativeElement.querySelector(".jigsaw-time-box .datepicker .datepicker-days>table>tbody>tr>td.active");
        // if (tdActive) {
        //     tdActive.parentNode.classList.add("active");
        // }
        this._changeDetectorRef.markForCheck();
        return {year: year, week: weekNum};
    }

    private _handleRecommended(nativeElement: any, popService: PopupService) {

    }

    private _handleLimit(value: Time): Time {
        if (this._limitStart && value < this.limitStart) {
            return this.limitStart;
        }
        if (this._limitEnd && value > this.limitEnd) {
            return this.limitEnd;
        }
        return value;
    }

    // private _setDate(value: Time) {
    //     // if (this._timePicker) {
    //         this._handleValueChange(value, <TimeGr>this.gr);
    //     //     this._timePicker.date(TimeService.getFormatDate(value, <TimeGr>this.gr));
    //         this._weekHandle();
    //         this._handleRecommended(this._el.nativeElement, this._popService);
    //         this._changeDetectorRef.markForCheck();
    //     //}
    // }

    // private _handleValueChange(changeValue: Time, gr: TimeGr, emit?: boolean) {
    //     if (this.date != changeValue || emit) {
    //         this._date = changeValue;
    //         this.runMicrotask(() => {
    //             const val = gr == TimeGr.week ? this._handleWeekSelect() : this._date;
    //             this.dateChange.emit(val);
    //             this._propagateChange(val);
    //         });
    //         this._handleRecommended(this._el.nativeElement, this._popService);
    //     }
    // }

    public _$changeGranularity($event: GrItem[]) {
        if(!($event instanceof Array)) return;
        this.gr = $event[0].value;
        this.grChange.emit(this.gr);
        this._changeDetectorRef.markForCheck();
    }

    private _defineLocale() {
        moment.defineLocale('zh', {
            months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
            monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
            weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
            weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
            weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'YYYY年MMMD日',
                LL: 'YYYY年MMMD日',
                LLL: 'YYYY年MMMD日Ah点mm分',
                LLLL: 'YYYY年MMMD日ddddAh点mm分',
                l: 'YYYY年MMMD日',
                ll: 'YYYY年MMMD日',
                lll: 'YYYY年MMMD日 HH:mm',
                llll: 'YYYY年MMMD日dddd HH:mm'
            },
            meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
            meridiemHour: function (hour, meridiem) {
                if (hour === 12) {
                    hour = 0;
                }
                if (meridiem === '凌晨' || meridiem === '早上' ||
                    meridiem === '上午') {
                    return hour;
                } else if (meridiem === '下午' || meridiem === '晚上') {
                    return hour + 12;
                } else {
                    // '中午'
                    return hour >= 11 ? hour : hour + 12;
                }
            },
            meridiem: function (hour, minute, isLower) {
                let hm = hour * 100 + minute;
                if (hm < 600) {
                    return '凌晨';
                } else if (hm < 900) {
                    return '早上';
                } else if (hm < 1130) {
                    return '上午';
                } else if (hm < 1230) {
                    return '中午';
                } else if (hm < 1800) {
                    return '下午';
                } else {
                    return '晚上';
                }
            },
            calendar: {
                sameDay: '[今天]LT',
                nextDay: '[明天]LT',
                nextWeek: '[下]ddddLT',
                lastDay: '[昨天]LT',
                lastWeek: '[上]ddddLT',
                sameElse: 'L'
            },
            dayOfMonthOrdinalParse: /\d{1,2}([日月周])/,
            ordinal: function (number, period) {
                switch (period) {
                    case 'd':
                    case 'D':
                    case 'DDD':
                        return number + '日';
                    case 'M':
                        return number + '月';
                    case 'w':
                    case 'W':
                        return number + '周';
                    default:
                        return number;
                }
            },
            relativeTime: {
                future: '%s内',
                past: '%s前',
                s: '几秒',
                m: '1 分钟',
                mm: '%d 分钟',
                h: '1 小时',
                hh: '%d 小时',
                d: '1 天',
                dd: '%d 天',
                M: '1 个月',
                MM: '%d 个月',
                y: '1 年',
                yy: '%d 年'
            },
            week: {
                // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
                dow: 1, // Monday is the first day of the week.
                doy: 4  // The week that contains Jan 4th is the first week of the year.
            }
        });
    }

    private _isSameWeek(date1: TimeWeekDay, date2: TimeWeekDay): boolean {
        return date1.year == date2.year && date1.week == date2.week;
    }

    private _getWeekDate(date: Time) {
        return {year: TimeService.getWeekYear(date), week: TimeService.getWeekOfYear(date)};
    }

    private _isValueChanged(newValue) {
        let changed = true;
        if(this.gr == TimeGr.week) {
            if(this._date && this._isSameWeek(<TimeWeekDay>this._date, newValue)) {
                changed = false
            }
        } else if (newValue == this._date) {
            changed = false
        }
        return changed;
    }

    private _getValidDate(newValue) {
        newValue = this._handleLimit(TimeService.convertValue(newValue, <TimeGr>this.gr));
        newValue = this.gr == TimeGr.week ? this._getWeekDate(newValue) : newValue;
        return newValue;
    }

    public writeValue(newValue: any): void {
        if (!newValue) {
            return;
        }
        newValue = this._getValidDate(newValue);
        if(this._isValueChanged(newValue)) {
            this._date = newValue;
            this.runMicrotask(() => {
                this.dateChange.emit(this._date);
                this._propagateChange(this._date);
                this._changeDetectorRef.markForCheck();
            });
        }
        // 根据this.date创建日历
        this._createCalendar();
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
        if(this._dateInitBak) {
            this.writeValue(this._dateInitBak);
        } else {
            this._createCalendar();
        }
    }

    ngOnDestroy() {
        window.clearInterval(this._intervalId);
        super.ngOnDestroy();
        //this._destroyPicker();
        this._langChangeSubscriber.unsubscribe();
    }
}

@NgModule({
    imports: [CommonModule, JigsawButtonBarModule],
    declarations: [JigsawDatePicker],
    exports: [JigsawDatePicker]
})
export class JigsawDatePickerModule {

}
