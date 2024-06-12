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
    Renderer2,
    Injector,
    HostListener
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {TimeGr, TimeService, TimeUnit, TimeWeekStart} from "../../common/service/time.service";
import {Time, TimeWeekDay, WeekTime} from "../../common/service/time.types";
import {PopupService} from "../../common/service/popup.service";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {CommonUtils} from "../../common/core/utils/common-utils";

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
export type YearCell = { year: number, isSelected: boolean, isDisabled?: boolean, isOwnPrevOrNext?: boolean };
export type MarkDate = { date: Time | Time[] | MarkRange, mark: MarkDateType, label?: string };
export type MarkRange = { from: Time, to: Time };
export type MarkDateType = 'none' | 'recommend' | 'warn' | 'error';
export type DateTimeCellType = 'day' | 'month' | 'year';

const DAY_CAL_COL = 7;
const DAY_CAL_ROW = 6;
const MONTH_CAL_COL = 3;
const MONTH_CAL_ROW = 4;
const YEAR_CAL_COL = 3;
const YEAR_CAL_ROW = 4;

/**
 * 时间范围生成函数，用于生成自定义的时间范围
 *
 * $demo = date-time-picker/gr-items
 */
export type TimeShortcutFunction = () => [WeekTime, WeekTime]

/**
 * 表示一个自定义的时间范围，一般用于配合`JigsawRangeDateTimePicker.grItems`属性使用，用于设置某个粒度下快速时间范围选择。
 */
export class Shortcut {
    /**
     * 国际化提示信息，将被直接显示在界面上
     * $demo = date-time-picker/gr-items
     */
    label: string;
    /**
     * 时间范围的起止时间点，可以给出固定值，也可以给一个产生起止时间点的函数
     * $demo = date-time-picker/gr-items
     */
    dateRange: [WeekTime, WeekTime] | TimeShortcutFunction;
}

/**
 * 一个时间粒度
 */
export class GrItem {
    /**
     * 国际化提示信息，将被直接显示在界面上
     */
    label: string;
    /**
     * 粒度值
     *
     * $demo = date-time-picker/gr-items
     * $demo = date-time-picker/gr
     */
    value: TimeGr;
    /**
     * 配置当前粒度下，用户能够选择的最大时间跨度。当某些查询请求必须约束用户选择某个范围内的时间时，这个配置项将非常有用。
     * 例如查询银行流水时，我们常常被约束最长只能查询3个月的流水等。
     *
     * 支持时间宏。关于时间宏，请参考这里`TimeUnit`的说明。
     *
     * $demo = date-time-picker/gr-items
     */
    span?: string;
    /**
     * 给出一组预定义的时间范围，这样用户可以通过这些值快速的设置好待选的时间范围，提高易用性。
     * 只在和`JigsawRangeDateTimePicker`配合使用时才有效
     *
     * 支持时间宏。关于时间宏，请参考这里`TimeUnit`的说明。
     *
     * $demo = date-time-picker/gr-items
     */
    shortcuts?: Shortcut[];
}

@WingsTheme('date-picker.scss')
@Component({
    selector: 'jigsaw-date-picker, j-date-picker',
    templateUrl: './date-picker.html',
    host: {
        '[style.width]': 'width',
        '[style.height]': 'height',
        '[attr.data-theme]': 'theme',
        '[attr.tabindex]': '0',
        '[class.jigsaw-date-picker-host]': 'true',
        '[class.jigsaw-date-picker-error]': '!valid',
        '[class.jigsaw-date-picker-disabled]': 'disabled',
        '(keydown)': '_$handleKeyDown($event)'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawDatePicker), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawDatePicker extends AbstractJigsawComponent implements ControlValueAccessor {
    constructor(private _el: ElementRef, private _renderer: Renderer2,
                private _popService: PopupService, private _translateService: TranslateService,
                private _changeDetectorRef: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(langInfo => {
            TimeService.setLocale(langInfo.curLang);
            if (this.initialized) {
                this._createCalendar(this._$curYear, this._$curMonth.month);
            }
        });
        const currentLang = _translateService.currentLang ? _translateService.currentLang : _translateService.getBrowserLang();
        TimeService.setLocale(currentLang);
    }

    /**
     * @internal
     */
    public _$curMonth: MonthCell;
    /**
     * @internal
     */
    public _$monthList: MonthCell[][] = [];
    /**
     * @internal
     */
    public _$curYear: number;
    /**
     * @internal
     */
    public _$rangeYear: string;
    /**
     * @internal
     */
    public _$yearList: YearCell[][] = [];
    /**
     * @internal
     */
    public _$dayList: DayCell[][] = [];
    /**
     * @internal
     */
    public _$weekList: string[] = [];
    /**
     * @internal
     */
    public _$selectMode: 'day' | 'month' | 'year' = 'day';

    /**
     * @internal
     *
     * 标记是否有过交互，当时间组件存在确认按钮时，只有在人为交互之后，才需要点击确认来更新时间
     * 而有些自动操作，比如设置limit时间之后的自动修正，是不需要点击确认按钮直接更新的
     */
    public _$touched: boolean;

    private _langChangeSubscriber: Subscription;
    private _weekPos: number[];

    private _createCalendar(year?: number, month?: number) {
        if (!year || !month) {
            let date = TimeService.convertValue(this.date, TimeGr.date);
            // 没有date会生成当前时间
            [year, month] = [TimeService.getYear(date), TimeService.getMonth(date)];
        }
        this._updateHead(year, month);
        this._createMonthCal(year);
        this._createYearCal(year);
        this._createDayCal(year, month);
        this._changeDetectorRef.markForCheck();
    }

    private _updateHead(year: number, month: number) {
        this._$curMonth = {month: month, label: TimeService.getMonthShort()[month - 1]};
        this._$curYear = year;
    }

    private _createYearCal(year: number) {
        this._verifyLimit();
        let startYear = year - year % 10 - 1;
        let endYear = startYear + (YEAR_CAL_COL * YEAR_CAL_ROW - 1);
        this._$yearList = this._createYearList(startYear, endYear);
        this._$rangeYear = `${startYear + 1} - ${endYear - 1}`
    }

    private _createYearList(startYear: number, endYear: number): YearCell[][] {
        let yearCount = startYear;
        return Array.from(new Array(YEAR_CAL_ROW).keys()).map(() => {
            let rowArr = [];
            let index = 0;
            while (index < YEAR_CAL_COL) {
                rowArr[index] = {
                    year: yearCount,
                    isSelected: this._isYearSelected(yearCount),
                    isDisabled: this._isYearDisabled(yearCount),
                    isOwnPrevOrNext: this._isYearOwnPrevOrNext(yearCount, startYear, endYear)
                };
                index++;
                yearCount++;
            }
            return rowArr;
        });
    }

    private _isYearSelected(year: number) {
        return this.date && TimeService.getYear(TimeService.convertValue(this.date, this._gr)) == year;
    }

    private _isYearDisabled(year: number) {
        return (this.limitStart && year < TimeService.getYear(this.limitStart)) || (this.limitEnd && year > TimeService.getYear(this.limitEnd))
    }

    private _isYearOwnPrevOrNext(year: number, startYear: number, endYear: number): boolean {
        return year <= startYear || year >= endYear
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
        this.dateSelect.emit('year');
        if (this.date) {
            let date = TimeService.getRealDateOfMonth(yearCell.year, this._$curMonth.month, TimeService.getDay(TimeService.convertValue(this.date, TimeGr.date)));
            this.writeValue(date);
        } else {
            this._createCalendar(yearCell.year, this._$curMonth.month);
        }
        this._$selectMode = this.gr == TimeGr.month ? 'month' : 'day';
        this._$touched = true;
    }

    private _createMonthCal(year: number) {
        this._verifyLimit();
        this._$monthList = this._createMonthList(year);
        this._$curYear = year;
    }

    private _createMonthList(year: number): MonthCell[][] {
        let monthList: MonthCell[] = TimeService.getMonthShort().map((m, i) => ({
            month: i + 1,
            label: m,
            isSelected: this._isMonthSelected(i + 1, year),
            isDisabled: this._isMonthDisabled(i + 1, year)
        }));
        let monthIndex = 0;
        return Array.from(new Array(MONTH_CAL_ROW).keys()).map(() => {
            let rowArr = [];
            let index = 0;
            while (index < MONTH_CAL_COL) {
                rowArr[index] = monthList[monthIndex];
                index++;
                monthIndex++;
            }
            return rowArr;
        })
    }

    private _isMonthSelected(month: number, year: number): boolean {
        if (!this.date) return false;
        let date = TimeService.convertValue(this.date, this._gr);
        return TimeService.getYear(date) == year && TimeService.getMonth(date) == month;
    }

    private _isMonthDisabled(month: number, year: number) {
        return (this.limitStart && (year < TimeService.getYear(this.limitStart) || (year == TimeService.getYear(this.limitStart) && month < TimeService.getMonth(this.limitStart)))) ||
            (this.limitEnd && (year > TimeService.getYear(this.limitEnd) || (year == TimeService.getYear(this.limitEnd) && month > TimeService.getMonth(this.limitEnd))));
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
        this.dateSelect.emit('month');
        if (this.clearOnReselect && monthCell.isSelected && TimeGr[this._gr] === 'month') {
            this.clearDate();
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
        this._$touched = true;
    }

    private _createDayCal(year: number, month: number) {
        this._verifyLimit();
        this._weekPos = this._getWeekPos();
        this._$weekList = this._createWeekList(this._weekPos);
        this._$dayList = this._createDayList(this._weekPos, year, month);
    }

    private _getWeekPos(): number[] {
        const weekStart = TimeService.getWeekStart();
        let week;
        return Array.from(new Array(DAY_CAL_COL).keys()).map(num => {
            week = num == 0 ? weekStart : week;
            let weekCur = week;
            week++;
            if (week > DAY_CAL_COL - 1) {
                week = 0;
            }
            return weekCur;
        });
    }

    private _createWeekList(weekPos: number[]): string[] {
        const weekdays = TimeService.getWeekdaysMin();
        return weekPos.map(pos => weekdays[pos]);
    }

    private _createDayList(weekPos: number[], year: number, month: number): DayCell[][] {
        const [firstDate, lastDate] = [TimeService.convertValue(TimeService.getFirstDateOfMonth(year, month), TimeGr.date),
            TimeService.convertValue(TimeService.getLastDateOfMonth(year, month), TimeGr.date)];
        let [countDayNum, maxDayNum, countNextMonthDayNum] = [1, TimeService.getDay(TimeService.getLastDateOfMonth(year, month)), 1];
        const firstDayWeek = new Date(firstDate).getDay();
        const firstDayWeekPos = weekPos.findIndex(w => w === firstDayWeek);
        return Array.from(new Array(DAY_CAL_ROW).keys()).map(row => {
            let index = row == 0 ? firstDayWeekPos : 0;
            let rowArr: DayCell[] = Array.from(new Array(DAY_CAL_COL).keys()).map(num => ({day: -1}));
            while (index < rowArr.length && countDayNum <= maxDayNum) {
                rowArr[index] = this._getDayCell(year, month, countDayNum, 'cur');
                index++;
                countDayNum++;
            }
            if (row == 0 && firstDayWeekPos > 0) {
                index = firstDayWeekPos - 1;
                let addDay = -1;
                while (index >= 0) {
                    let date = TimeService.addDate(firstDate, addDay, TimeUnit.d);
                    let [y, m, d] = [TimeService.getYear(date), TimeService.getMonth(date), TimeService.getDay(date)];
                    rowArr[index] = this._getDayCell(y, m, d, 'prev');
                    addDay--;
                    index--;
                }
            }
            if (countDayNum > maxDayNum) {
                while (index < rowArr.length) {
                    let date = TimeService.addDate(lastDate, countNextMonthDayNum, TimeUnit.d);
                    let [y, m, d] = [TimeService.getYear(date), TimeService.getMonth(date), TimeService.getDay(date)];
                    rowArr[index] = this._getDayCell(y, m, d, 'next');
                    countNextMonthDayNum++;
                    index++;
                }
            }
            return rowArr;
        });
    }

    private _getDayCell(year: number, month: number, day: number, type: 'cur' | 'prev' | 'next'): DayCell {
        let dayCell: DayCell = {
            day: day,
            isSelected: this._isDaySelected(year, month, day),
            isDisabled: this._isDayDisabled(year, month, day),
            mark: this._getDayMark(year, month, day),
        };
        if (type == 'cur') {
            dayCell.isToday = this._isToday(year, month, day);
            dayCell.isInRange = this._isDayInRange(year, month, day);
        } else if (type == 'prev') {
            dayCell.isOwnPrevMonth = true;
        } else if (type == 'next') {
            dayCell.isOwnNextMonth = true;
        }
        return dayCell;
    }

    private _isToday(year: number, month: number, day: number) {
        const date = new Date(`${year}/${month}/${day} 00:00:00`);
        const ts1 = +date, ts2 = +new Date;
        return ts1 < ts2 && ts2 - ts1 < 86400000;
    }

    private _isDaySelected(year: number, month: number, day: number): boolean {
        if (!this.date) {
            return false;
        }
        if (this.gr == TimeGr.week) {
            const date = TimeService.getWeekDate(`${year}-${month}-${day}`);
            return this._isSameWeek(<TimeWeekDay>this.date, date);
        } else {
            const date = TimeService.convertValue(this.date, TimeGr.date);
            return TimeService.getYear(date) == year && TimeService.getMonth(date) == month && TimeService.getDay(date) == day
        }
    }

    private _isDayDisabled(year: number, month: number, day: number) {
        const date = TimeService.convertValue(`${year}-${month}-${day}`, TimeGr.date);
        return (this.limitStart && date < this.limitStart) || (this.limitEnd && date > this.limitEnd)
    }

    private _getDayMark(year: number, month: number, day: number): { type: string, label?: string } {
        if (!(this.markDates instanceof Array)) {
            return {type: 'none', label: ''};
        }
        const compareDate = TimeService.convertValue(`${year}-${month}-${day}`, TimeGr.date);
        let [mark, label] = ['none', ''];
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
                mark = markDate.mark;
                label = markDate.label;
                return true;
            }
            return false;
        });
        return {type: mark, label: label};
    }

    private _isDayInRange(year: number, month: number, day: number): boolean {
        if (!this.date || !this.rangeDate) return false;
        const date = TimeService.convertValue(`${year}-${month}-${day}`, TimeGr.date);
        const selectDate = TimeService.convertValue(this.date, TimeGr.date);
        const rangeDate = TimeService.convertValue(this.rangeDate, TimeGr.date);
        return (date > selectDate && date <= rangeDate) || (date >= rangeDate && date < selectDate)
    }

    /**
     * 是否再次点击时清除数据
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public clearOnReselect: boolean = true;

    /**
     * @internal
     */
    public _$selectDay(dayCell: DayCell) {
        if (dayCell.isDisabled) {
            return;
        }
        this.dateSelect.emit('day');
        if (this.clearOnReselect && dayCell.isSelected) {
            this.clearDate();
            return;
        }
        let [year, month, day] = [this._$curYear, this._$curMonth.month, dayCell.day];
        if (dayCell.isOwnPrevMonth || dayCell.isOwnNextMonth) {
            let date = TimeService.addDate(`${year}-${month}`, dayCell.isOwnPrevMonth ? -1 : 1, TimeUnit.M);
            [year, month] = [TimeService.getYear(date), TimeService.getMonth(date)];
        }
        this.writeValue(`${year}-${month}-${day}`);
        this._$touched = true;
    }

    public clearDate() {
        if (this._date == "") {
            return;
        }
        let [year, month] = [this._$curYear, this._$curMonth.month];
        this._date = "";
        this.runMicrotask(() => {
            this.dateChange.emit(this._date);
            this._propagateChange(this._date);
            this._changeDetectorRef.markForCheck();
        });
        this._createCalendar(year, month);
    }

    /**
     * @internal
     */
    public _$handleCtrlBar(num: number) {
        if (this._$selectMode == 'day') {
            const date = TimeService.convertValue(TimeService.addDate(`${this._$curYear}-${this._$curMonth.month}`, num, TimeUnit.M), TimeGr.month);
            this._createCalendar(TimeService.getYear(date), TimeService.getMonth(date));
        } else if (this._$selectMode == 'month') {
            this._$curYear = this._$curYear + num;
            this._createMonthCal(this._$curYear);
            this._createYearCal(this._$curYear);
        } else if (this._$selectMode == 'year') {
            this._$curYear = this._$curYear + 10 * num;
            this._createYearCal(this._$curYear);
        }
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

    /**
     * 当前日期控件的粒度发生变化时，发出此事件
     * $demo = date-picker/gr
     */
    @Output()
    public grChange = new EventEmitter<TimeGr>();

    private _gr: TimeGr = TimeGr.date;

    /**
     * 获取或者设置当前日期控件的粒度粒度
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-picker/gr
     */
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
                    this.writeValue(TimeService.convertValue(this.date, this._gr));
                } else {
                    this._createCalendar();
                }
            }
        }
    }

    private _date: WeekTime;

    /**
     * 获取或者设置当前日期控件的值
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-picker/basic
     */
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

    /**
     * 当前日期控件的值发生变化时，发出此事件
     * $demo = date-picker/basic
     */
    @Output()
    public dateChange = new EventEmitter<WeekTime>();

    /**
     * 当前日期控件内的内容被点击时，发出此事件，告知点击的日期格的类型
     */
    @Output()
    public dateSelect = new EventEmitter<DateTimeCellType>();

    private _limitStart: Time;

    /**
     * `limitStart` 和 `limitEnd` 用于设定起止可选时间
     * $demo = date-picker/limit
     */
    public get limitStart(): Time {
        return this._limitStart;
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public set limitStart(value: Time) {
        this._limitStart = value ? TimeService.convertValue(value, <TimeGr>this.gr) : null;
        this._changeDetectorRef.markForCheck();
        if (!this.initialized) {
            return
        }
        if (this.date) {
            this.writeValue(this.date);
        } else {
            this._createCalendar(this._$curYear, this._$curMonth?.month);
        }
    }

    private _limitEnd: Time;

    /**
     * 参考 `limitStart`
     * $demo = date-picker/limit
     */
    public get limitEnd(): Time {
        return this._limitEnd
    }

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public set limitEnd(value: Time) {
        this._limitEnd = value ? TimeService.convertValue(value, <TimeGr>this.gr) : null;
        if (!this.initialized) {
            return
        }
        if (this.date) {
            this.writeValue(this.date);
        } else {
            this._createCalendar(this._$curYear, this._$curMonth?.month);
        }
    }

    /**
     * 设置时间控件所支持的粒度。如果你的场景只允许用户选择天、周，则设置了这2个粒度之后，用户无法选择其他的粒度。
     * $demo = date-picker/gr
     */
    @Input()
    @RequireMarkForCheck()
    public grItems: GrItem[];

    private _markDates: MarkDate[];

    /**
     * 对选定的日期做标记，用于提示用户这些日期具有特定含义
     * $demo = date-picker/mark
     */
    @Input()
    @RequireMarkForCheck()
    public get markDates(): MarkDate[] {
        return this._markDates;
    }

    public set markDates(newValue: MarkDate[]) {
        if (!newValue) {
            return;
        }
        this._markDates = newValue;
        if (this.initialized) {
            this._createCalendar();
        }
    }

    private _rangeDate: string;

    /**
     * @NoMarkForCheckRequired
     *
     * @internal
     */
    @Input()
    public get rangeDate(): string {
        return this._rangeDate
    }

    public set rangeDate(date: string) {
        if (date == this._rangeDate) return;
        this._rangeDate = date;
        this._createCalendar(this._$curYear, this._$curMonth?.month);
    }

    private _handleLimit(value: Time): Time {
        this._verifyLimit();
        if (this._limitStart && value < this.limitStart) {
            return this.limitStart;
        }
        if (this._limitEnd && value > this.limitEnd) {
            return this.limitEnd;
        }
        return value;
    }

    private _verifyLimit() {
        if(!this.limitStart || !this.limitEnd) return;
        if(this.limitEnd < this.limitStart) {
            this._limitEnd = this.limitStart;
        }
    }

    private _weekStart: TimeWeekStart;

    /**
     * 设置周开始日期，可选值 sun mon tue wed thu fri sat。
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-picker/week-start
     */
    @Input()
    public get weekStart(): string | TimeWeekStart {
        return this._weekStart;
    }

    public set weekStart(value: string | TimeWeekStart) {
        if(CommonUtils.isUndefined(value)) return;
        if (typeof value === 'string') {
            this._weekStart = TimeWeekStart[value];
        } else {
            this._weekStart = value;
        }
        TimeService.setWeekStart(this._weekStart);
        if(this.initialized) {
            if(this.date && this.gr == TimeGr.week) {
                // weekStart/janX改变时，在跨年时之前的weekDate可能会无效，需要重新计算
                this.date = TimeService.getDateByGr(this.date, this.gr)
            }
            this._createCalendar();
        }
    }

    private _firstWeekMustContains: number;
    /**
     * 设置一年的第一周要包含一月几号
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-picker/week-start
     */
    @Input()
    public get firstWeekMustContains(): number {
        return this._firstWeekMustContains;
    }

    public set firstWeekMustContains(value: number) {
        if(CommonUtils.isUndefined(value)) return;
        value = isNaN(value) || Number(value) < 1 ? 1 : Number(value);
        this._firstWeekMustContains = value;
        TimeService.setFirstWeekOfYear(this._firstWeekMustContains);
        if(this.initialized) {
            if(this.date && this.gr == TimeGr.week) {
                // weekStart/janX改变时，在跨年时之前的weekDate可能会无效，需要重新计算
                this.date = TimeService.getDateByGr(this.date, this.gr)
            }
            this._createCalendar();
        }
    }

    selectedRowIndex: number = 0;
    selectedColIndex: number = 0;

    public _$handleKeyDown($event) {
        console.log($event)
        console.log(this._$selectMode);
        console.log(this._$dayList);
        // this._$dayList[1][1].isSelected=true;
        if ($event.key === 'ArrowUp') {
            this._moveSelection(-1, 0, this._$dayList);
        } else if ($event.key === 'ArrowDown') {
            this._moveSelection(1, 0, this._$dayList);
        } else if ($event.key === 'ArrowLeft') {
            this._moveSelection(0, -1, this._$dayList);
        } else if ($event.key === 'ArrowRight') {
            this._moveSelection(0, 1, this._$dayList);
        }
    }

    private _moveSelection(rowChange: number, colChange: number, grid) {
        const newRow = this.selectedRowIndex + rowChange;
        const newCol = this.selectedColIndex + colChange;

        if (
            newRow >= 0 &&
            newRow < grid.length &&
            newCol >= 0 &&
            newCol < grid[0].length &&
            grid[newRow][newCol].isDisabled
        ) {
            grid[this.selectedRowIndex][this.selectedColIndex].isSelected = false;
            this.selectedRowIndex = newRow;
            this.selectedColIndex = newCol;
            grid[this.selectedRowIndex][this.selectedColIndex].isSelected = true;
        }
    }

    private _getPreselectIndex(num, min, max) {
        return Math.min(Math.max(num, min), max);
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
        this._changeDetectorRef.markForCheck();
    }

    private _isSameWeek(date1: TimeWeekDay, date2: TimeWeekDay): boolean {
        return date1.year == date2.year && date1.week == date2.week;
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
        newValue = this.gr == TimeGr.week ? TimeService.getWeekDate(newValue) : newValue;
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
        super.ngOnDestroy();
        this._langChangeSubscriber.unsubscribe();
    }

}

@NgModule({
    imports: [CommonModule],
    declarations: [JigsawDatePicker],
    exports: [JigsawDatePicker]
})
export class JigsawDatePickerModule {
    constructor() {
        TimeService.deFineZhLocale();
    }
}
