import {
    Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Renderer2, Output, forwardRef
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subscriber} from "rxjs/Subscriber";
import {AbstractJigsawComponent} from "../common";
import {TimeGr, TimeService, TimeUnit, TimeWeekStart} from "../../service/time.service";
import {PopupInfo, PopupPositionType, PopupService} from "../../service/popup.service";
import {JigsawSimpleTooltipComponent} from "../tooltip/tooltip";
import {Time, WeekTime} from "../../service/time.types";
import {TranslateHelper} from "../../core/utils/translate-helper";
import {ElementEventHelper, CommonUtils} from "../../core/utils/common-utils";


export type TimeShortcutFunction = () => [WeekTime, WeekTime]

export class Shortcut {
    label: string;
    dateRange: [WeekTime, WeekTime] | TimeShortcutFunction;
}

export class GrItem {
    label: string;
    value: TimeGr;
    span?: string;
    shortcuts?: Shortcut[];
}

@Component({
    selector: 'jigsaw-time, j-time',
    templateUrl: 'time.html',
    host: {
        '[style.width]': 'width',
        '[class.jigsaw-time-host]': 'true'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTime), multi: true},
    ]
})
export class JigsawTime extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, OnDestroy {

    @Output() public grChange = new EventEmitter<TimeGr>();

    /**
     * @internal
     */
    public _$gr: TimeGr = TimeGr.date;

    public get gr(): TimeGr | string {
        return this._$gr;
    }

    //粒度
    @Input()
    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if (<TimeGr>value != this._$gr) {
            this._$gr = <TimeGr>value;
            this._value = TimeService.getFormatDate(this._value, this._$gr);
            if (this._timePicker) {
                this._initDatePicker();
            }
        }
    }

    private _value: Time;

    //组件暴露出去的时间数值，支持双向绑定
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

    @Output() public dateChange = new EventEmitter<WeekTime>();

    private _limitEnd: Time;

    public get limitEnd(): Time {
        return this._limitEnd && TimeService.convertValue(this._limitEnd, <TimeGr>this.gr)
    }

    @Input()
    public set limitEnd(value: Time) {
        if (value) {
            this._limitEnd = value;
            this._checkMacro();
            if (this._timePicker) {
                if (this._timePicker.minDate() && this._timePicker.minDate() > TimeService.getDate(this.limitEnd, <TimeGr>this.gr)) {
                    this._timePicker.minDate(this.limitEnd)
                }
                this._timePicker.maxDate(this.limitEnd);
                this._weekHandle();
                this._handleRecommended(this._el.nativeElement, this._popService);
            }
        }
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
            if (this._timePicker) {
                if (this._timePicker.maxDate() && this._timePicker.maxDate() < TimeService.getDate(this.limitStart, <TimeGr>this.gr)) {
                    this._timePicker.maxDate(this.limitStart)
                }
                this._timePicker.minDate(this.limitStart);
                this._weekHandle();
                this._handleRecommended(this._el.nativeElement, this._popService);
            }
        }
    }


    /**
     * 时间刷新的间隔毫秒数，主要针对startDate或endDate设置为now或now-2h等需要不时刷新的场景
     */
    private _refreshInterval: number;
    @Input()
    public set refreshInterval(value: number) {
        if (value || value == 0) {
            this._refreshInterval = value;
            this._checkMacro();
        }
    }

    /**
     * 周开始设置，可选值 sun mon tue wed thu fri sat，默认值是sun
     */
    private _weekStart: TimeWeekStart;
    @Input()
    public set weekStart(value: string | TimeWeekStart) {
        if (value) {
            if (typeof value === 'string') {
                this._weekStart = TimeWeekStart[value];
            } else {
                this._weekStart = value;
            }
            if (this._timePicker) {
                TimeService.setWeekStart(this._weekStart);
                this._initDatePicker();
                this._handleRecommended(this._el.nativeElement, this._popService);
            }
        }
    }

    @Input("grItems") public grItems: GrItem[];

    @Input("recommendedBegin") private _recommendedBegin: Time;

    @Input("recommendedEnd") private _recommendedEnd: Time;


    /**
     * time插件容器（jq对象）
     */
    private _timePicker: any;

    //定时器Id
    private _intervalId: number;
    private _langChangeSubscriber: Subscriber<any>;

    constructor(private _el: ElementRef, private _renderer: Renderer2,
                private _popService: PopupService) {
        super();
        this._refreshInterval = 0;
        this.weekStart = TimeWeekStart.sun;

        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(
            langInfo => this._timePicker && this._timePicker.locale(langInfo.curLang));
    }

    ngOnInit() {
        this._defineLocale();
        this._initDatePicker();
        this._checkMacro();
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

    ngOnDestroy() {
        this._destroyPicker();
        this._langChangeSubscriber.unsubscribe();
    }

    private _destroyPicker() {
        if (this._timePicker) {
            this._timePicker.destroy();
        }
    }

    private _initDatePicker() {
        const insert = this._el.nativeElement.querySelector(".jigsaw-time-box");
        TimeService.setWeekStart(this._weekStart);
        let [result, isChange] = this._handleValue(<Time>this.date);
        if (isChange) {
            this._value = result;
        }
        this._destroyPicker();
        const picker = $(insert).datetimepicker({
            inline: true,
            defaultDate: TimeService.getDate(<string>this.date, <TimeGr>this.gr),
            format: TimeService.getFormatter(<TimeGr>this.gr),
            minDate: this._limitStart && TimeService.getDate(<string>this.limitStart, <TimeGr>this.gr),
            maxDate: this._limitEnd && TimeService.getDate(<string>this.limitEnd, <TimeGr>this.gr)
        });
        picker.off('dp.change');
        picker.on("dp.change", (e) => {
            let changeValue = TimeService.getFormatDate(e.date, <TimeGr>this.gr);
            if (this.date != changeValue) {
                this._handleValueChange(changeValue, <TimeGr>this.gr);
            }
            this._bindActiveDayClickHandler(picker);

            // 选择了日期，让recommend的tooltip的销毁
            if (this._tooltipInfo) {
                this._tooltipInfo.dispose();
                this._tooltipInfo = null;
            }
        });

        picker.on("dp.update", () => {
            // Fired (in most cases) when the viewDate changes. E.g. Next and Previous buttons, selecting a year.
            this._weekHandle();
            this._handleRecommended(this._el.nativeElement, this._popService);
        });

        // 点击day.active会重新渲染day table，但不会触发dp.change，此函数用于填补日期插件的坑
        this._bindActiveDayClickHandler(picker);

        this._timePicker = $(insert).data("DateTimePicker");
        this._timePicker.locale(CommonUtils.getBrowserLang());

        this._handleValueChange(<Time>this.date, <TimeGr>this.gr, true);
    }

    private _bindActiveDayClickHandler(picker) {
        // 等待day.active刷新出来
        setTimeout(() => {
            picker.find('.datepicker-days table tbody tr td.day.active').on('click', () => {
                // 等待点击后的day-btn刷新出来
                setTimeout(() => {
                    // week select
                    this._weekHandle();
                    // recommend select
                    this._handleRecommended(this._el.nativeElement, this._popService);
                    this._bindActiveDayClickHandler(picker);
                })
            })
        });
    }

    //设置插件选中时间值
    private _setDate(value: Time) {
        if (this._timePicker) {
            this._handleValueChange(value, <TimeGr>this.gr);
            this._timePicker.date(TimeService.getFormatDate(value, <TimeGr>this.gr));
            this._weekHandle();
            this._handleRecommended(this._el.nativeElement, this._popService);
        }
    }

    /**
     * @internal
     */
    public _$changeGranularity(select: GrItem) {
        this.gr = select.value;
        this.grChange.emit(this.gr);
    }

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
        if (this._timePicker) {
            this._limitStart && this._timePicker.minDate(TimeService.addDate(<string>this.limitStart, -1, TimeUnit.s));
            this._limitEnd && this._timePicker.maxDate(TimeService.addDate(<string>this.limitEnd, 1, TimeUnit.s));
            this._weekHandle();
            this._handleRecommended(this._el.nativeElement, this._popService);
        }
    }

    private _weekHandle() {
        if (this.gr == TimeGr.week) {
            this._handleWeekSelect();
        }
    }

    private _handleValueChange(changeValue: Time, gr: TimeGr, emit?: boolean) {
        if (this.date != changeValue || emit) {
            this._value = changeValue;
            setTimeout(() => {
                const val = gr == TimeGr.week ? this._handleWeekSelect() : this._value;
                this.dateChange.emit(val);
                this._propagateChange(val);
            }, 0);
            this._handleRecommended(this._el.nativeElement, this._popService);
        }
    }

    private _handleValue(value: Time): [Time, boolean] {
        if (this._limitStart && value < this.limitStart) {
            return [this.limitStart, true];
        }
        if (this._limitEnd && value > this.limitEnd) {
            return [this.limitEnd, true];
        }
        return [value, false];
    }

    private _handleWeekSelect() {
        let weekNum = TimeService.getWeekOfYear(<string>this.date);
        let year = TimeService.getYear(<string>this.date);
        const tdActive = this._el.nativeElement.querySelector(".jigsaw-time-box .datepicker .datepicker-days>table>tbody>tr>td.active");
        if (tdActive) {
            tdActive.parentNode.classList.add("active");
        }
        if (CommonUtils.isIE()) {
            window.resizeBy(-20);
            window.resizeBy(20);
        }
        return {year: year, week: weekNum};
    }

    private _tooltipInfo: PopupInfo;

    private _eventHelper: ElementEventHelper = new ElementEventHelper();

    private _handleRecommended(nativeElement: any, popService: PopupService) {
        if (this._recommendedBegin && this._recommendedEnd) {
            this._recommendedBegin = TimeService.getFormatDate(this._recommendedBegin);
            this._recommendedEnd = TimeService.getFormatDate(this._recommendedEnd);
            if (TimeService.getYear(<string>this._recommendedBegin) != TimeService.getYear(<string>this._recommendedEnd)) { //不支持跨年设置
                throw "recommended not support different year times!";
            }
            const monthsNode: HTMLElement = JigsawTime._getDataPickerNode("months", nativeElement);
            const monthsHeadNode: HTMLElement = JigsawTime._getDataPickerNode("months", nativeElement, true);
            JigsawTime._searchDateForMonth(this._recommendedBegin, this._recommendedEnd, monthsNode, monthsHeadNode);
            const daysNode = JigsawTime._getDataPickerNode("days", nativeElement);
            const daysHeadNode: HTMLElement = JigsawTime._getDataPickerNode("days", nativeElement, true);
            const daysObj = JigsawTime._parseDay(daysHeadNode.innerText);
            JigsawTime._searchDateForDay(this._recommendedBegin, this._recommendedEnd, daysNode, daysObj);
            nativeElement.querySelectorAll(".jigsaw-time-box .datepicker .expect-day").forEach(node => {

                // #239 移除已经注册的事件. 点击事件会触发此操作, 造成重复注册事件. 引起tooltips 不能销毁.
                const removeMouseEnterListeners = this._eventHelper.get(node, 'mouseenter');
                if (removeMouseEnterListeners instanceof Array) {
                    removeMouseEnterListeners.forEach(removeMouseenterListener => {
                        removeMouseenterListener();
                        this._eventHelper.del(node, 'mouseenter', removeMouseenterListener);
                    })
                }
                const removeMouseLeaveListeners = this._eventHelper.get(node, 'mouseleave');
                if (removeMouseLeaveListeners instanceof Array) {
                    removeMouseLeaveListeners.forEach(removeMouseleaveListener => {
                        removeMouseleaveListener();
                        this._eventHelper.del(node, 'mouseleave', removeMouseleaveListener);
                    })
                }

                const removeMouseEnterListener = this._renderer.listen(node, "mouseenter", (event) => {
                    if (this._tooltipInfo) {
                        this._tooltipInfo.dispose();
                        this._tooltipInfo = null;
                    }
                    this._tooltipInfo = popService.popup(JigsawSimpleTooltipComponent, {
                        modal: false, //是否模态
                        pos: {x: $(event.currentTarget).offset().left, y: $(event.currentTarget).offset().top},
                        posOffset: { //偏移位置
                            top: -40,
                            left: 0
                        },
                        posType: PopupPositionType.absolute, //定位类型
                    }, {
                        message: "Recommended"
                    });
                });
                this._eventHelper.put(node, "mouseenter", removeMouseEnterListener);

                const removeMouseleaveListener = this._renderer.listen(node, "mouseleave", () => {
                    if (this._tooltipInfo) {
                        this._tooltipInfo.dispose();
                        this._tooltipInfo = null;
                    }
                });
                this._eventHelper.put(node, "mouseleave", removeMouseleaveListener);
            });
        }
    }

    private static _searchDateForDay(begin: Time, end: Time, sourceNodes: HTMLElement[], headObj: any) {
        const startMonth = TimeService.getMonth(begin);
        const endMonth = TimeService.getMonth(end);

        const startDate = TimeService.getDay(begin);
        const endDate = TimeService.getDay(end);

        if (TimeService.getYear(begin) == headObj.year &&
            (startMonth == headObj.month || endMonth == headObj.month)) {
            sourceNodes.forEach(node => {
                const text = +node.innerText;
                if (startMonth != endMonth) {
                    if (!node.classList.contains("old") && !node.classList.contains("new")) {
                        if ((startMonth == headObj.month && text >= startDate) ||
                            (endMonth == headObj.month && text <= endDate)) {
                            node.classList.add("expect-day");
                        }
                        if (text == startDate) {
                            node.classList.add("border-left");
                        }
                        if (text == endDate) {
                            node.classList.add("border-right");
                        }
                    } else if (node.classList.contains("new")) {
                        if (startMonth == headObj.month && text <= endDate) {
                            node.classList.add("expect-day");
                        }
                        if (text == endDate) {
                            node.classList.add("border-right");
                        }
                    } else if (node.classList.contains("old")) {
                        if (endMonth == headObj.month && text >= startDate) {
                            node.classList.add("expect-day");
                        }
                    }
                } else {
                    if (!node.classList.contains("old") && !node.classList.contains("new")) {
                        if (text >= startDate && text <= endDate) {
                            node.classList.add("expect-day");
                        }
                        if (text == startDate) {
                            node.classList.add("border-left");
                        }
                        if (text == endDate) {
                            node.classList.add("border-right");
                        }
                    }
                }
            })
        }
    }

    private static _parseDay(val: string) {
        const charToNum = {一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 十一: 11, 十二: 12};
        const enUsToNum = {
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12
        };
        let result = {};
        if (val.indexOf("月") == -1) {
            const valArr = val.split(/\s+/);
            result["month"] = +enUsToNum[valArr[0]];
            result["year"] = +valArr[1];
        } else {
            const valArr = val.split("月");
            result["month"] = charToNum[valArr[0].trim()];
            result["year"] = +(valArr[1].trim());
        }
        return result;
    }

    private static _parseMonth(val: string) {
        const enUsSimpleToNum = {
            Jan: 1,
            Feb: 2,
            Mar: 3,
            Apr: 4,
            May: 5,
            Jun: 6,
            Jul: 7,
            Aug: 8,
            Sep: 9,
            Oct: 10,
            Nov: 11,
            Dec: 12
        };
        if (val.indexOf("月") == -1) {
            return enUsSimpleToNum[val];
        } else {
            return val.replace("月", '');
        }
    }

    private static _searchDateForMonth(begin: Time, end: Time, sourceNodes: any, headNode: any) {
        const startMonth = TimeService.getMonth(begin);
        const endMonth = TimeService.getMonth(end);
        if (TimeService.getYear(begin) == headNode.innerText) {
            sourceNodes.forEach(node => {
                if (!node.classList.contains("disabled")) {
                    const month = JigsawTime._parseMonth(node.innerText);
                    if (month >= startMonth && month <= endMonth) {
                        node.classList.add("expect-day");
                    }
                    if (month == startMonth) {
                        node.classList.add("border-left");
                    }
                    if (month == endMonth) {
                        node.classList.add("border-right");
                    }
                }
            })
        }
    }

    private static _getDataPickerNode(granularity: string, nativeElement: any, isHead?: boolean) {
        const selectorBefore: string = ".jigsaw-time-box .datepicker .datepicker-";
        const selectorAfter: string = ">table>tbody>tr>";
        let nodeName = "";
        if (granularity == "years" || granularity == "months") {
            nodeName = "td>span:not(.disabled)";
        } else {
            nodeName = "td:not(.disabled)";
        }
        let selector = selectorBefore + granularity + selectorAfter + nodeName;
        if (isHead) {
            const theadNode = ">table>thead>tr>th.picker-switch[colspan]";
            selector = selectorBefore + granularity + theadNode;
            return nativeElement.querySelector(selector);
        }
        return nativeElement.querySelectorAll(selector);
    }


    private _propagateChange: any = () => {
    };

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
            let newValueYear = TimeService.getYear(<string>newValue);
            let valueYear = TimeService.getYear(<string>this._value);
            let newValueWeek = TimeService.getWeekOfYear(<string>newValue);
            let valueWeek = TimeService.getWeekOfYear(<string>this._value);
            if (newValueYear == valueYear && newValueWeek == valueWeek) return;
        }
        let [value,] = this._handleValue(newValue);
        this._setDate(value);
        this._value = newValue;
    }

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}
