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
    mark?: { type: string, label?: string },
    isInRange?: boolean
};
export type MonthCell = { month: number, label: string, isSelected?: boolean, isDisabled?: boolean, };
export type YearCell = { year: number, isSelected: boolean, isDisabled?: boolean, };
export type MarkDate = { date: Time | Time[] | MarkRange, mark: MarkDateType, label?: string };
export type MarkRange = { from: Time, to: Time };

export enum MarkDateType {
    'none', 'recommend', 'warn', 'error'
}

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
        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(langInfo => {
            moment.locale(langInfo.curLang);
            if (this.initialized) {
                this._createCalendar(this._$curYear, this._$curMonth.month);
            }
        });
        InternalUtils.initI18n(_translateService, 'time', {
            zh: {recommendedLabel: '推荐日期'},
            en: {recommendedLabel: 'Recommend'}
        });
        this._defineLocale();
        let browserLang = _translateService.getBrowserLang();
        _translateService.setDefaultLang(browserLang);
        moment.locale(browserLang);
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
        if (!year || !month) {
            let date = TimeService.convertValue(this.date, TimeGr.date);
            // 没有date会生成当前时间
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
            while (index < this._YEAR_CAL_COL) {
                rowArr[index] = {year: yearCount, isSelected: yearCount == curYear, isDisabled: this._isYearDisabled(yearCount)};
                index++;
                yearCount++;
            }
            return rowArr;
        });
    }

    private _isYearDisabled(year: number) {
        return (this.limitStart && year < TimeService.getYear(this.limitStart)) || (this.limitEnd && year > TimeService.getYear(this.limitEnd))
    }

    /**
     * @internal
     */
    public _$showYearList() {
        this._$selectMode = this._$selectMode != 'year' ? 'year' : this.gr == TimeGr.month ? 'month' : 'day';
    }

    /**
     * @internal
     */
    public _$selectYear(yearCell: YearCell) {
        if (yearCell.isDisabled) {
            return;
        }
        if (this.date) {
            let date = TimeService.getRealDateOfMonth(yearCell.year, this._$curMonth.month, TimeService.getDay(TimeService.convertValue(this.date, TimeGr.date)));
            this.writeValue(date);
        } else {
            this._createCalendar(yearCell.year, this._$curMonth.month);
        }
        this._$selectMode = this.gr == TimeGr.month ? 'month' : 'day';
    }

    private _createMonthCal(month: number) {
        this._$monthList = this._createMonthList(month);
    }

    private _createMonthList(month: number): MonthCell[][] {
        let monthList: MonthCell[] = TimeService.getMonthShort().map((m, i) => ({
            month: i + 1,
            label: m,
            isSelected: month == i + 1 && this.date,
            isDisabled: this._isMonthDisabled(i + 1)
        }));
        let monthIndex = 0;
        return Array.from(new Array(this._MONTH_CAL_ROW).keys()).map(row => {
            let rowArr = [];
            let index = 0;
            while (index < this._MONTH_CAL_COL) {
                rowArr[index] = monthList[monthIndex];
                index++;
                monthIndex++;
            }
            return rowArr;
        })
    }

    private _isMonthDisabled(month: number) {
        return (this.limitStart && month < TimeService.getMonth(this.limitStart)) || (this.limitEnd && month > TimeService.getMonth(this.limitEnd));
    }

    /**
     * @internal
     */
    public _$showMonthList() {
        this._$selectMode = this._$selectMode != 'month' || this.gr == TimeGr.month ? 'month' : 'day';
    }

    /**
     * @internal
     */
    public _$selectMonth(monthCell: MonthCell) {
        if (monthCell.isDisabled) {
            return;
        }
        if (this.date || this.gr == TimeGr.month) {
            let date = TimeService.getRealDateOfMonth(this._$curYear, monthCell.month, TimeService.getDay(TimeService.convertValue(this.date, TimeGr.date)));
            this.writeValue(date);
        } else {
            this._createCalendar(this._$curYear, monthCell.month);
        }
        if (this.gr != TimeGr.month) {
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
            if (week > this._DAY_CAL_COL - 1) {
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
        let [firstDate, lastDate] = [TimeService.convertValue(TimeService.getFirstDateOfMonth(year, month), TimeGr.date),
            TimeService.convertValue(TimeService.getLastDateOfMonth(year, month), TimeGr.date)];
        let [countDayNum, maxDayNum, countNextMonthDayNum] = [1, TimeService.getDay(TimeService.getLastDateOfMonth(year, month)), 1];
        let firstDayWeek = new Date(firstDate).getDay();
        let firstDayWeekPos = weekPos.findIndex(w => w === firstDayWeek);
        return Array.from(new Array(this._DAY_CAL_ROW).keys()).map(row => {
            let index = row == 0 ? firstDayWeekPos : 0;
            let rowArr: DayCell[] = Array.from(new Array(this._DAY_CAL_COL).keys()).map(num => ({day: -1}));
            while (index < rowArr.length && countDayNum <= maxDayNum) {
                rowArr[index] = {
                    day: countDayNum,
                    isToday: this._isToday(year, month, countDayNum),
                    isSelected: this._isDaySelected(year, month, countDayNum),
                    isDisabled: this._isDayDisabled(year, month, countDayNum),
                    mark: this._getDayMark(year, month, countDayNum),
                    isInRange: this._isDayInRange(year, month, countDayNum)
                };
                index++;
                countDayNum++;
            }
            if (row == 0 && firstDayWeekPos > 0) {
                index = firstDayWeekPos - 1;
                let addDay = -1;
                while (index >= 0) {
                    let date = TimeService.addDate(firstDate, addDay, TimeUnit.d);
                    let [y, m, d] = [TimeService.getYear(date), TimeService.getMonth(date), TimeService.getDay(date)];
                    rowArr[index] = {
                        day: d,
                        isOwnPrevMonth: true,
                        isSelected: this._isDaySelected(y, m, d),
                        isDisabled: this._isDayDisabled(y, m, d),
                        mark: this._getDayMark(y, m, d)
                    };
                    addDay--;
                    index--;
                }
            }
            if (countDayNum > maxDayNum) {
                while (index < rowArr.length) {
                    let date = TimeService.addDate(lastDate, countNextMonthDayNum, TimeUnit.d);
                    let [y, m, d] = [TimeService.getYear(date), TimeService.getMonth(date), TimeService.getDay(date)];
                    rowArr[index] = {
                        day: d,
                        isOwnNextMonth: true,
                        isSelected: this._isDaySelected(y, m, d),
                        isDisabled: this._isDayDisabled(y, m, d),
                        mark: this._getDayMark(y, m, d)
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
        if (!this.date) {
            return false;
        }
        if (this.gr == TimeGr.week) {
            let date = this._getWeekDate(`${year}-${month}-${day}`);
            return this._isSameWeek(<TimeWeekDay>this.date, date);
        } else {
            let date = TimeService.convertValue(this.date, TimeGr.date);
            return TimeService.getYear(date) == year && TimeService.getMonth(date) == month && TimeService.getDay(date) == day
        }
    }

    private _isDayDisabled(year: number, month: number, day: number) {
        let date = TimeService.convertValue(`${year}-${month}-${day}`, TimeGr.date);
        return (this.limitStart && date < this.limitStart) || (this.limitEnd && date > this.limitEnd)
    }

    private _getDayMark(year: number, month: number, day: number): { type: string, label?: string } {
        if (!(this.markDates instanceof Array)) {
            return {type: 'none', label: ''};
        }
        let compareDate = TimeService.convertValue(`${year}-${month}-${day}`, TimeGr.date);
        let [mark, label] = [MarkDateType[MarkDateType.none], ''];
        this.markDates.find(markDate => {
            let date: any = markDate.date;
            let founded;
            if (typeof date == 'object' && date.hasOwnProperty('from') && date.hasOwnProperty('to')) {
                let [start, end] = [TimeService.convertValue((<MarkRange>date).from, TimeGr.date), TimeService.convertValue((<MarkRange>date).to, TimeGr.date)];
                founded = compareDate >= start && compareDate <= end;
            } else {
                date = date instanceof Array ? date : [date];
                founded = !!date.find(d => TimeService.convertValue(d, TimeGr.date) == compareDate);
            }
            if (founded) {
                mark = typeof markDate.mark == 'string' ? markDate.mark : MarkDateType[markDate.mark];
                label = markDate.label;
                return true;
            }
            return false;
        });
        return {type: mark, label: label};
    }

    private _isDayInRange(year: number, month: number, day: number): boolean {
        if(!this.date || !this.rangeDate) return false;
        let date = TimeService.convertValue(`${year}-${month}-${day}`, TimeGr.date);
        let selectDate = TimeService.convertValue(this.date, TimeGr.date);
        let rangeDate = TimeService.convertValue(this.rangeDate, TimeGr.date);
        return (date > selectDate && date <= rangeDate) || (date >= rangeDate && date < selectDate)
    }

    /**
     * @internal
     */
    public _$selectDay(dayCell: DayCell) {
        if (dayCell.isDisabled) {
            return;
        }
        let [year, month, day] = [this._$curYear, this._$curMonth.month, dayCell.day];
        if (dayCell.isOwnPrevMonth || dayCell.isOwnNextMonth) {
            let date = TimeService.addDate(`${year}-${month}`, dayCell.isOwnPrevMonth ? -1 : 1, TimeUnit.M);
            [year, month] = [TimeService.getYear(date), TimeService.getMonth(date)];
        }
        this.writeValue(`${year}-${month}-${day}`);
    }

    /**
     * @internal
     */
    public _$handleCtrlBar(num: number) {
        if (this._$selectMode == 'day' || this._$selectMode == 'month') {
            if (this.date) {
                let date = TimeService.addDate(TimeService.convertValue(this.date, TimeGr.date), num, TimeUnit.M);
                this.writeValue(date);
            } else {
                let date = TimeService.convertValue(TimeService.addDate(`${this._$curYear}-${this._$curMonth.month}`, num, TimeUnit.M), TimeGr.month);
                this._createCalendar(TimeService.getYear(date), TimeService.getMonth(date));
            }
        }
        if (this._$selectMode == 'year') {
            this._createYearCal(this._$curYear, this._$yearList[0][0].year + this._YEAR_CAL_ROW * this._YEAR_CAL_COL * num);
        }
    }

    private _langChangeSubscriber: Subscription;

    @Input()
    public valid: boolean = true;

    @Output()
    public grChange = new EventEmitter<TimeGr>();

    private _gr: TimeGr = TimeGr.date;

    @Input()
    public get gr(): TimeGr | string {
        return this._gr;
    }

    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if (<TimeGr>value != this._gr) {
            this._gr = <TimeGr>value;
            this._$selectMode = TimeGr[this._gr] == 'month' ? 'month' : 'day';
            if (this.initialized) {
                if (this.date) {
                    this.writeValue(TimeService.handleWeekDateToDate(this.date, this._gr));
                } else {
                    this._createCalendar();
                }
            }
        }
    }

    private _date: WeekTime;

    @Input()
    public get date(): WeekTime {
        return this._date;
    }

    public set date(newValue: WeekTime) {
        if (this.initialized) {
            this.writeValue(newValue);
        } else {
            this._date = newValue;
        }
    }

    @Output()
    public dateChange = new EventEmitter<WeekTime>();

    private _limitStart: Time;

    public get limitStart(): Time {
        return this._limitStart;
    }

    @Input()
    public set limitStart(value: Time) {
        this._limitStart = value ? TimeService.convertValue(value, <TimeGr>this.gr) : null;
        if (this.initialized && this.date) {
            this.writeValue(this.date);
        }
        //this._checkMacro();
    }

    private _limitEnd: Time;

    public get limitEnd(): Time {
        return this._limitEnd
    }

    @Input()
    public set limitEnd(value: Time) {
        this._limitEnd = value ? TimeService.convertValue(value, <TimeGr>this.gr) : null;
        if (this.initialized && this.date) {
            this.writeValue(this.date);
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
            this._checkMacro();
        }
    }

    @Input()
    public grItems: GrItem[];

    @Input()
    markDates: MarkDate[];

    private _rangeDate: string;
    @Input()
    public get rangeDate(): string {
        return this._rangeDate
    }

    public set rangeDate(date: string) {
        if(date == this._rangeDate) return;
        this._rangeDate = date;
        this._createCalendar();
    }

    private _intervalId: number;

    private _checkMacro() {
        if (this._intervalId) {
            window.clearInterval(this._intervalId);
        }
        if ((TimeService.isMacro(<string>this._limitStart) || TimeService.isMacro(<string>this._limitEnd)) && this._refreshInterval != 0) {
            this._intervalId = window.setInterval(() => {
                this._handleRefresh();
            }, this._refreshInterval);
        }
    }

    private _handleRefresh() {

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

    public _$changeGr($event: GrItem) {
        if (!$event) {
            return;
        }
        this.gr = $event.value;
        this.grChange.emit(<TimeGr>this.gr);
        this._changeDetectorRef.markForCheck();
    }

    private _isSameWeek(date1: TimeWeekDay, date2: TimeWeekDay): boolean {
        return date1.year == date2.year && date1.week == date2.week;
    }

    private _getWeekDate(date: Time) {
        return {year: TimeService.getWeekYear(date), week: TimeService.getWeekOfYear(date)};
    }

    private _isValueChanged(newValue) {
        let changed = true;
        if (this.gr == TimeGr.week) {
            if (this._date && this._isSameWeek(<TimeWeekDay>this._date, newValue)) {
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
        if (this._isValueChanged(newValue)) {
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
        if (this.date) {
            this.writeValue(this.date);
        } else {
            this._createCalendar();
        }
    }

    ngOnDestroy() {
        window.clearInterval(this._intervalId);
        super.ngOnDestroy();
        this._langChangeSubscriber.unsubscribe();
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
}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawDatePicker],
    exports: [JigsawDatePicker]
})
export class JigsawDatePickerModule {

}
