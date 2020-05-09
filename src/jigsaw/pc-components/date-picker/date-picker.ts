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
import {Time, WeekTime} from "../../common/service/time.types";
import {GrItem} from "../time";
import {PopupService} from "../../common/service/popup.service";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import {InternalUtils} from "../../common/core/utils/internal-utils";
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

declare const moment: any;

export type DateCell = {date: number; isToday?: boolean, isOwnPrevMonth?: boolean, isOwnNextMonth?: boolean};

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

    public _$curMonth: number; _$curYear: number; _$dayList: DateCell[][] = []; _$monthList: number[] = [];
    _$yearList: number[] = []; _$weekList: string[] = [];
    private _weekPos: number[];

    private _WEEK_NUM = 7;
    private _CALENDAR_NUM = 6;
    private _FIRST_DAY_NUM = 1;

    private _createCalendar() {
        this._updateHead();
        this._weekPos = this._getWeekPos();
        this._$weekList = this._createWeekList();
        this._$dayList = this._createDayList();
    }

    private _updateHead() {
        let curDate = TimeService.convertValue(this.date, TimeGr.date);
        this._$curMonth = TimeService.getMonthShort()[TimeService.getMonth(curDate) - 1];
        this._$curYear = TimeService.getYear(curDate);
    }

    private _getWeekPos(): number[] {
        let weekStart = TimeService.getWeekStart();
        let week;
        return Array.from(new Array(this._WEEK_NUM).keys()).map(num => {
            week = num == 0 ? weekStart : week;
            let weekCur = week;
            week++;
            if(week > this._WEEK_NUM - 1) {
                week = 0;
            }
            return weekCur;
        });
    }

    private _createWeekList(): string[] {
        let weekdays = TimeService.getWeekdaysMin();
        return this._weekPos.map(pos => weekdays[pos]);
    }

    private _createDayList(): DateCell[][] {
        let date = TimeService.convertValue(this.date, TimeGr.date);
        let [year, month] = [TimeService.getYear(date), TimeService.getMonth(date)];
        let [firstDate,lastDate] = [TimeService.convertValue(TimeService.getFirstDateOfMonth(date), TimeGr.date),
            TimeService.convertValue(TimeService.getLastDateOfMonth(date), TimeGr.date)];
        console.log('firstDate,lastDate',firstDate, lastDate);
        let [countDayNum, maxDayNum, countNextMonthDayNum] = [this._FIRST_DAY_NUM, TimeService.getDay(TimeService.getLastDateOfMonth(date)), this._FIRST_DAY_NUM];
        let firstDayWeek = new Date(firstDate).getDay();
        let firstDayWeekPos = this._weekPos.findIndex(w => w === firstDayWeek);
        console.log('weekPos',this._weekPos);
        console.log('weekOfFirstDay',firstDayWeek);
        console.log('firstDayWeekPos',firstDayWeekPos);

        return Array.from(new Array(this._CALENDAR_NUM).keys()).map(row => {
            let index = row == 0 ? firstDayWeekPos : 0;
            let rowArr: DateCell[] = Array.from(new Array(this._WEEK_NUM).keys()).map(num => ({date: -1}));
            while(index < rowArr.length && countDayNum <= maxDayNum) {
                rowArr[index] = {date: countDayNum, isToday: this._isToday(year, month, countDayNum)};
                index++;
                countDayNum++;
            }
            if (row == 0 && firstDayWeekPos > 0) {
                index = firstDayWeekPos - 1;
                let addDay = -1;
                while(index >= 0) {
                    rowArr[index] = {date: TimeService.getDay(TimeService.addDate(firstDate, addDay, TimeUnit.d)), isOwnPrevMonth: true};
                    addDay--;
                    index--;
                }
            }
            if(countDayNum > maxDayNum) {
                while(index < rowArr.length) {
                    rowArr[index] = {date: TimeService.getDay(TimeService.addDate(lastDate, countNextMonthDayNum, TimeUnit.d)), isOwnNextMonth: true};
                    countNextMonthDayNum++;
                    index++;
                }
            }
            return rowArr;
        })
    }

    private _isToday(year: number, month: number, date: number) {
        let today = TimeService.convertValue('now', TimeGr.date);
        return TimeService.getYear(today) == year && TimeService.getMonth(today) == month && TimeService.getDay(today) == date
    }

    /**
     * @internal
     */
    public _$handleCtrlBar(num: number) {
        this.date = TimeService.convertValue(TimeService.addDate(TimeService.convertValue(this.date, TimeGr.date), num, TimeUnit.M), <TimeGr>this.gr);
        this._updateHead();
        this._$dayList = this._createDayList();
    }

    public _$selectDate(day: DateCell) {
        
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
            this._value = TimeService.getFormatDate(this._value, this._$gr);

        }
    }

    private _value: Time;

    @Input()
    public get date(): WeekTime {
        return this._value ? this._value : TimeService.convertValue(new Date(), <TimeGr>this.gr);
    }

    public set date(newValue: WeekTime) {
        this.writeValue(newValue);
        if (newValue && newValue != this._value) {
            this._propagateChange(this._value);
        }
    }

    @Output()
    public dateChange = new EventEmitter<WeekTime>();

    private _limitEnd: Time;

    public get limitEnd(): Time {
        return this._limitEnd && TimeService.convertValue(this._limitEnd, <TimeGr>this.gr)
    }

    @Input()
    public set limitEnd(value: Time) {
        if (value) {
            this._limitEnd = value;
            this._checkMacro();
            // if (this._timePicker) {
            //     if (this._timePicker.minDate() && this._timePicker.minDate() > TimeService.getDate(this.limitEnd, <TimeGr>this.gr)) {
            //         this._timePicker.minDate(this.limitEnd)
            //     }
            //     this._timePicker.maxDate(this.limitEnd);
                this._weekHandle();
                this._handleRecommended(this._el.nativeElement, this._popService);
            }
        //}
    }

    private _limitStart: Time;

    public get limitStart(): Time {
        return this._limitStart && TimeService.convertValue(this._limitStart, <TimeGr>this.gr);
    }

    @Input()
    public set limitStart(value: Time) {
        if (value) {
            this._limitStart = value;
            this._checkMacro();
            // if (this._timePicker) {
            //     if (this._timePicker.maxDate() && this._timePicker.maxDate() < TimeService.getDate(this.limitStart, <TimeGr>this.gr)) {
            //         this._timePicker.maxDate(this.limitStart)
            //     }
            //     this._timePicker.minDate(this.limitStart);
                this._weekHandle();
                this._handleRecommended(this._el.nativeElement, this._popService);
            //}
        }
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

    private _handleValue(value: Time): [Time, boolean] {
        if (this._limitStart && value < this.limitStart) {
            return [this.limitStart, true];
        }
        if (this._limitEnd && value > this.limitEnd) {
            return [this.limitEnd, true];
        }
        this._changeDetectorRef.markForCheck();
        return [value, false];
    }

    private _setDate(value: Time) {
        // if (this._timePicker) {
            this._handleValueChange(value, <TimeGr>this.gr);
        //     this._timePicker.date(TimeService.getFormatDate(value, <TimeGr>this.gr));
            this._weekHandle();
            this._handleRecommended(this._el.nativeElement, this._popService);
            this._changeDetectorRef.markForCheck();
        //}
    }

    private _handleValueChange(changeValue: Time, gr: TimeGr, emit?: boolean) {
        if (this.date != changeValue || emit) {
            this._value = changeValue;
            this.runMicrotask(() => {
                const val = gr == TimeGr.week ? this._handleWeekSelect() : this._value;
                this.dateChange.emit(val);
                this._propagateChange(val);
            });
            this._handleRecommended(this._el.nativeElement, this._popService);
        }
    }

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

    public writeValue(newValue: any): void {
        if (!newValue || newValue == this._value) {
            // 此处也会过滤掉newValue是格式化过的，并且与_value相等的情况
            return;
        }
        newValue = TimeService.convertValue(newValue, <TimeGr>this.gr);
        if (newValue == this._value) {
            // 此处把newValue格式化后，与_value比较，过滤掉相等的情况
            return;
        }
        if (this._value && this.gr == TimeGr.week) {
            let newValueYear = TimeService.getWeekYear(<string>newValue);
            let valueYear = TimeService.getWeekYear(<string>this._value);
            let newValueWeek = TimeService.getWeekOfYear(<string>newValue);
            let valueWeek = TimeService.getWeekOfYear(<string>this._value);
            if (newValueYear == valueYear && newValueWeek == valueWeek) return;
        }
        let [value,] = this._handleValue(newValue);
        this._setDate(value);
        this._value = newValue;
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
        this._createCalendar();
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
