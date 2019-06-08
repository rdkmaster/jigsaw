import {
    Component, ElementRef, EventEmitter, Input, OnDestroy, Renderer2, Output, forwardRef, AfterViewInit
} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subscription} from "rxjs";
import {AbstractJigsawComponent} from "../../common/common";
import {TimeGr, TimeService, TimeUnit, TimeWeekStart} from "../../common/service/time.service";
import {PopupInfo, PopupPositionType, PopupService} from "../../common/service/popup.service";
import {JigsawSimpleTooltipComponent} from "../tooltip/tooltip";
import {Time, WeekTime} from "../../common/service/time.types";
import {TranslateHelper} from "../../common/core/utils/translate-helper";
import {ElementEventHelper, InternalUtils} from "../../common/core/utils/internal-utils";
import {TranslateService} from "@ngx-translate/core";

/**
 * 时间范围生成函数，用于生成自定义的时间范围
 *
 * $demo = range-time/gr-items
 */
export type TimeShortcutFunction = () => [WeekTime, WeekTime]

/**
 * 表示一个自定义的时间范围，一般用于配合`JigsawRangeTime.grItems`属性使用，用于设置某个粒度下快速时间范围选择。
 */
export class Shortcut {
    /**
     * 国际化提示信息，将被直接显示在界面上
     * $demo = range-time/gr-items
     */
    label: string;
    /**
     * 时间范围的起止时间点，可以给出固定值，也可以给一个产生起止时间点的函数
     * $demo = range-time/gr-items
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
     * $demo = range-time/gr-items
     * $demo = time/gr
     */
    value: TimeGr;
    /**
     * 配置当前粒度下，用户能够选择的最大时间跨度。当某些查询请求必须约束用户选择某个范围内的时间时，这个配置项将非常有用。
     * 例如查询银行流水时，我们常常被约束最长只能查询3个月的流水等。
     *
     * 支持时间宏。关于时间宏，请参考这里`TimeUnit`的说明。
     *
     * $demo = range-time/gr-items
     */
    span?: string;
    /**
     * 给出一组预定义的时间范围，这样用户可以通过这些值快速的设置好待选的时间范围，提高易用性。
     * 只在和`JigsawRangeTime`配合使用时才有效
     *
     * 支持时间宏。关于时间宏，请参考这里`TimeUnit`的说明。
     *
     * $demo = range-time/gr-items
     */
    shortcuts?: Shortcut[];
}

/**
 * 用于在界面上提供一个时刻的选择，支持多种时间粒度切换，支持年月日时分秒及其各种组合，如下是一些常见的场景及其建议：
 *
 * - 如果需要选择的是一个时间范围，则请使用`JigsawRangeTime`；
 * - 如果你需要的是一个日历的功能，那请参考[这个demo]($demo=table/calendar)，通过表格+渲染器的方式来模拟；
 * - 时间选择器常常是收纳到下拉框中以解决视图空间，Jigsaw是通过`JigsawComboSelect`来组合使用的，
 * 参考[这个demo]($demo=time/with-combo-select)；
 *
 * 时间控件是对表单友好的，你可以给时间控件编写表单校验器，参考[这个demo]($demo=form/template-driven)。
 *
 * $demo = time/full
 * $demo = time/basic
 */
@Component({
    selector: 'jigsaw-time, j-time',
    templateUrl: 'time.html',
    host: {
        '[style.width]': 'width',
        '[class.jigsaw-time-host]': 'true',
        '[class.jigsaw-time-error]': '!valid',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawTime), multi: true},
    ]
})
export class JigsawTime extends AbstractJigsawComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {

    @Input()
    public valid: boolean = true;

    /**
     * 当时间粒度被用户切换之后，Jigsaw会发出此事件。
     *
     * $demo = time/gr
     *
     * @type {EventEmitter<TimeGr>}
     */
    @Output()
    public grChange = new EventEmitter<TimeGr>();

    /**
     * @internal
     */
    public _$gr: TimeGr = TimeGr.date;

    /**
     * 时间当前的粒度，在双绑模式下改变这值可以让时间控件更换到对应的粒度。
     *
     * $demo = time/gr
     *
     * @return {TimeGr | string}
     */
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

    /**
     * 当前所选中的时刻，在双绑模式下，更新这个值可以让时间控件选中对应的时刻。
     *
     * 支持时间宏。关于时间宏，请参考这里`TimeUnit`的说明。
     *
     * $demo = time/basic
     *
     * @return {WeekTime}
     */
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

    /**
     * 当时间被用户切换之后，Jigsaw会发出此事件。
     *
     * $demo = time/basic
     *
     * @type {EventEmitter<WeekTime>}
     */
    @Output()
    public dateChange = new EventEmitter<WeekTime>();

    private _limitEnd: Time;

    /**
     * 时间控件允许选择的时间截止时刻，默认是无限制的未来。这个约束对所有的粒度都生效。
     *
     * 支持时间宏。关于时间宏，请参考这里`TimeUnit`的说明。
     *
     * $demo = time/limit-start
     * $demo = time/limit-end
     *
     * @return {Time}
     */
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

    /**
     * 时间控件允许选择的时间开始时刻，默认是无限制的过去。这个约束对所有的粒度都生效。
     *
     * 支持时间宏。关于时间宏，请参考这里`TimeUnit`的说明。
     *
     * $demo = time/limit-start
     * $demo = time/limit-end
     *
     * @return {Time}
     */
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

    /**
     * 刷新时间宏的间隔毫秒数，默认不刷新。
     *
     * 解决的场景是：在界面上弄了个时间选择器，页面打开时默认选中当前时刻，并限制了用户只能选择过去3小时的时间，这很快就可以完成，毫无难度。
     * 然而用户使用时是这样的，他打开了页面后，就去处理别的事情去了，几个小时之后再回来想用这个已经打开的页面去查询一些东西，
     * 结果发现界面上时间怎么选都不对（因为那个时刻初始化了一次之后就再也没有更新，还停留在几个小时之前），只好刷新页面，用户常常抱怨这一点。
     *
     * 这个场景下，只要设置一个大于0的数字给时间控件的这个属性即可解决。
     *
     * $demo = time/refresh-interval
     *
     * @return {number}
     */
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

    private _weekStart: TimeWeekStart;

    /**
     * 设置周开始日期，可选值 sun mon tue wed thu fri sat，默认值是sun。
     *
     * $demo = time/week-start
     */
    @Input()
    public get weekStart(): string | TimeWeekStart {
        return this._weekStart;
    }

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

    /**
     * 设置时间控件所支持的粒度。如果你的场景只允许用户选择天、周，则设置了这2个粒度之后，用户无法选择其他的粒度。
     *
     * $demo = time/gr-items
     */
    @Input()
    public grItems: GrItem[];

    /**
     * 有些时候我们需要提示用户选择那些时间是最佳的，可以通过`recommendedBegin`和`recommendedEnd`来设置。
     *
     * $demo = time/recommended
     */
    @Input()
    public recommendedBegin: Time;

    /**
     * 有些时候我们需要提示用户选择那些时间是最佳的，可以通过`recommendedBegin`和`recommendedEnd`来设置。
     *
     * $demo = time/recommended
     */
    @Input()
    public recommendedEnd: Time;

    /**
     * 推荐日期提示标签，默认值是`"推荐日期"`或`"Recommend"`
     */
    @Input()
    public recommendedLabel: String;

    /**
     * time插件容器（jq对象）
     */
    private _timePicker: any;

    //定时器Id
    private _intervalId: number;
    private _langChangeSubscriber: Subscription;

    constructor(private _el: ElementRef, private _renderer: Renderer2,
                private _popService: PopupService, private _translateService: TranslateService) {
        super();
        this._refreshInterval = 0;
        this.weekStart = TimeWeekStart.sun;

        this._langChangeSubscriber = TranslateHelper.languageChangEvent.subscribe(
            langInfo => this._timePicker && this._timePicker.locale(langInfo.curLang));

        InternalUtils.initI18n(_translateService, 'time', {
            zh: {recommendedLabel: '推荐日期'},
            en: {recommendedLabel: 'Recommend'}
        });
        _translateService.setDefaultLang(_translateService.getBrowserLang());

        this._defineLocale();
    }

    ngAfterViewInit() {
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
        window.clearInterval(this._intervalId);
        super.ngOnDestroy();
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
        this._timePicker.locale(this._translateService.currentLang);

        this._handleValueChange(<Time>this.date, <TimeGr>this.gr, true);
    }

    private _bindActiveDayClickHandler(picker) {
        // 等待day.active刷新出来
        this.callLater(() => {
            picker.find('.datepicker-days table tbody tr td.day.active').on('click', () => {
                // 等待点击后的day-btn刷新出来
                this.callLater(() => {
                    // week select
                    this._weekHandle();
                    // recommend select
                    this._handleRecommended(this._el.nativeElement, this._popService);
                    this._bindActiveDayClickHandler(picker);
                });
            });
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
            this.callLater(() => {
                const val = gr == TimeGr.week ? this._handleWeekSelect() : this._value;
                this.dateChange.emit(val);
                this._propagateChange(val);
            });
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
        return {year: year, week: weekNum};
    }

    private _tooltipInfo: PopupInfo;

    private _eventHelper: ElementEventHelper = new ElementEventHelper();

    private _handleRecommended(nativeElement: any, popService: PopupService) {
        if (this.recommendedBegin && this.recommendedEnd) {
            this.recommendedBegin = TimeService.getFormatDate(this.recommendedBegin);
            this.recommendedEnd = TimeService.getFormatDate(this.recommendedEnd);
            if (TimeService.getYear(<string>this.recommendedBegin) != TimeService.getYear(<string>this.recommendedEnd)) { //不支持跨年设置
                throw "recommended not support different year times!";
            }
            const monthsNode: HTMLElement = JigsawTime._getDataPickerNode("months", nativeElement);
            const monthsHeadNode: HTMLElement = JigsawTime._getDataPickerNode("months", nativeElement, true);
            JigsawTime._searchDateForMonth(this.recommendedBegin, this.recommendedEnd, monthsNode, monthsHeadNode);
            const daysNode = JigsawTime._getDataPickerNode("days", nativeElement);
            const daysHeadNode: HTMLElement = JigsawTime._getDataPickerNode("days", nativeElement, true);
            const daysObj = JigsawTime._parseDay(daysHeadNode.innerText);
            JigsawTime._searchDateForDay(this.recommendedBegin, this.recommendedEnd, daysNode, daysObj);
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
                        message: this.recommendedLabel || this._translateService.instant('time.recommendedLabel')
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


    private _propagateChange:any = () => {};

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
