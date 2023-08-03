import {Moment, Time, TimeWeekDay, WeekTime} from "./time.types";
import {CommonUtils} from "../core/utils/common-utils";

declare const moment: any;

/**
 * 时间粒度值
 */
export enum TimeGr {
    second, minute, hour, date, week, month, time, time_hour_minute, time_minute_second, time_hour
}

/**
 * 周起始日期
 */
export enum TimeWeekStart {
    sun, mon, tue, wed, thu, fri, sat
}

/**
 * 关于时间宏：
 *
 * 它通过一些数字，以及语义化的单词作为单位来表示一个时刻，时间宏是一个普通的字符串。
 * 例如`"now"`这个宏表示当前时刻，`JigsawDateTimePicker`将会将其换算为其被初始化的时刻。
 *
 * 此外，时间宏还支持加减运算。例如`"now-1d"`的意思是昨天的这个时候，相应的，明天则是`"now+1d"`，上个月是`"now-1M"`等。
 * 时间宏目前可以支持的时刻是`"now"`，支持的所有单位在这个枚举类型中全部列出了。（注意大小写）
 *
 * 时间宏的换算是由Jigsaw自动完成的，如果你需要获得一个时间宏的值，请调用`TimeService.getFormatDate()`方法。
 *
 * `TimeService`提供了许多有用的时间换算、格式化工具，当你有需要对时间进行运算时，可以参考它的api说。
 */
export enum TimeUnit {
    s, m, h, d, w, M, y
}

/**
 * 常用时间格式，`TimeService.format`可以支持任何格式，我们做这个枚举只是他们太常用了，使用这个枚举+IDE提示，你可以少敲很多次键盘。
 */
export enum TimeFormatters {
    yyyy_mm_dd_hh_mm_ss, yyyy_mm_dd_hh_mm, yyyy_mm_dd_hh, yyyy_mm_dd, yyyy_mm, hh_mm_ss, hh_mm, mm_ss, hh
}

/**
 * 提供了日期运算、格式化、转换等一系列常用的方法，当你需要对时间做任何操作时，它都可以帮到你。
 */
// @dynamic
export class TimeService {
    /**
     * 将一个时刻转成符合改粒度的值，例如
     *
     * ```
     * TimeService.convertValue("now", TimeGr.date); // -> 2018/3/23 00:00:00
     * ```
     *
     * `"now"`的时分秒被切去。
     *
     * @param value 待转换的时刻，支持时间宏，请参考这里`TimeUnit`的说明。
     * @param gr 目标粒度
     * @return 符合粒度格式的时刻
     */
    public static convertValue(value: WeekTime, gr: TimeGr): string {
        if (this.isWeekDate(value)) {
            value = this._handleWeekDateToDate(value, gr);
        } else {
            value = this.getFormatDate(<Time>value, gr);
        }
        return <string>value;
    }

    public static getDateByGr(date: WeekTime, gr: TimeGr): string | TimeWeekDay {
        date = this.convertValue(date, gr);
        return gr == TimeGr.week ? this.getWeekDate(date) : date;
    }

    public static isWeekDate(date: WeekTime) {
        return date && !!date['week'] && !!date['year'];
    }

    private static _handleWeekDateToDate(date: WeekTime, gr: TimeGr) {
        if (!date || typeof date['week'] != 'number') {
            return this.getFormatDate(<Time>date, gr);
        }
        date = this.getDateFromYearAndWeek(date["year"], date["week"]);
        const [dateWeekNum, weekStartNum] = [new Date(date).getDay(), this.getWeekStart()];
        const dateIndex = dateWeekNum - weekStartNum >= 0 ? dateWeekNum - weekStartNum : dateWeekNum - weekStartNum + 7;
        const weekStartDate = this.addDate(date, -dateIndex, TimeUnit.d);
        return this.getFormatDate(weekStartDate, gr);
    }

    private static _timeFormatterConvert(formatter: TimeFormatters): string {
        switch (formatter) {
            case TimeFormatters.yyyy_mm_dd_hh_mm_ss :
                return "YYYY-MM-DD HH:mm:ss";
            case TimeFormatters.yyyy_mm_dd_hh_mm :
                return "YYYY-MM-DD HH:mm";
            case TimeFormatters.yyyy_mm_dd_hh :
                return "YYYY-MM-DD HH";
            case TimeFormatters.yyyy_mm_dd :
                return "YYYY-MM-DD";
            case TimeFormatters.yyyy_mm :
                return "YYYY-MM";
            case TimeFormatters.hh_mm_ss :
                return "HH:mm:ss";
            case TimeFormatters.hh_mm :
                return "HH:mm";
            case TimeFormatters.mm_ss :
                return "mm:ss";
            case TimeFormatters.hh :
                return "HH";
        }
    }

    private static _timeFormatMap = new Map([
        [TimeGr.second, TimeService._timeFormatterConvert(TimeFormatters.yyyy_mm_dd_hh_mm_ss)],
        [TimeGr.minute, TimeService._timeFormatterConvert(TimeFormatters.yyyy_mm_dd_hh_mm)],
        [TimeGr.hour, TimeService._timeFormatterConvert(TimeFormatters.yyyy_mm_dd_hh)],
        [TimeGr.date, TimeService._timeFormatterConvert(TimeFormatters.yyyy_mm_dd)],
        [TimeGr.week, TimeService._timeFormatterConvert(TimeFormatters.yyyy_mm_dd)],
        [TimeGr.month, TimeService._timeFormatterConvert(TimeFormatters.yyyy_mm)],
        [TimeGr.time, TimeService._timeFormatterConvert(TimeFormatters.hh_mm_ss)],
        [TimeGr.time_hour_minute, TimeService._timeFormatterConvert(TimeFormatters.hh_mm)],
        [TimeGr.time_minute_second, TimeService._timeFormatterConvert(TimeFormatters.mm_ss)],
        [TimeGr.time_hour, TimeService._timeFormatterConvert(TimeFormatters.hh)],
    ]);

    /**
     * 时间单位枚举值转对应字符串
     *
     * @param unit 时间单位枚举值
     * @return 返回对应的字符串
     */
    public static timeUnitConvert(unit: TimeUnit): string {
        return TimeUnit[unit];
    }

    private static _timeUnitMap = new Map([
        [TimeUnit.s, 'seconds'],
        [TimeUnit.m, 'minutes'],
        [TimeUnit.h, "hours"],
        [TimeUnit.d, 'days'],
        [TimeUnit.w, 'weeks'],
        [TimeUnit.M, 'months'],
        [TimeUnit.y, 'years']
    ]);

    private static _initMoment() {
        try {
            moment.suppressDeprecationWarnings = 1;
        } catch (e) {
        }
    }

    /**
     * 仅仅是为了初始化moment对象
     *
     */
    private static init = TimeService._initMoment();


    /**
     * 判断给定的时刻值是否是时间宏字符串
     *
     * @param time 给定的时刻值
     * @returns 如果给定的值非字符串，则必然返回false。
     */
    public static isMacro(time: Time): boolean {
        if (typeof time === 'string') {
            return !!time.match(/^\s*(now|today|yestoday|tomorrow)\s*([+-]\s*\d+\s*\w+)?\s*$/i);
        }
        return false;
    }

    /**
     * 特殊时间宏的转换
     * @param timeMacro
     *
     */
    private static _convertBasicMacro(timeMacro: string): Date | string {
        let date;
        switch (timeMacro) {
            case 'now':
                date = new Date();
                break;
            default:
                date = timeMacro;
                break;
        }
        return date;
    }

    /**
     * 时间加减法
     *
     * @param date  时间
     * @param num   数量，为负数即为减法
     * @param unit  单位
     */
    public static addDate(date: Time, num: string | number, unit: TimeUnit): Moment {
        return moment(date).add(num, TimeService._timeUnitMap.get(unit));
    }

    /**
     * 根据粒度获取格式化字符串
     *
     * @param gr
     *
     */
    public static getFormatter(gr: TimeGr): string {
        return TimeService._timeFormatMap.has(gr) ? TimeService._timeFormatMap.get(gr) : 'YYYY-MM-DD';
    }


    /**
     * 时间格式化
     *
     * @param date
     * @param formatter
     */
    public static format(date: Time, formatter: string | TimeFormatters): string {
        if (typeof formatter === "number") formatter = TimeService._timeFormatterConvert(formatter);
        return moment(date).format(formatter);
    }

    /**
     * 根据粒度格式化时间
     *
     * @param date
     * @param gr
     */
    public static formatWithGr(date: Time, gr: TimeGr): string {
        let format = TimeService.getFormatter(gr);
        return moment(date).format(format);
    }

    /**
     * 设置默认周开始，设置之后会影响之后的所有计算结果
     *  https://momentjs.com/docs/#/customization/dow-doy/
     * @param weekStart
     */
    public static setWeekStart(weekStart: TimeWeekStart = TimeWeekStart.sun): void {
        let locale = moment.locale();
        let weekSet = moment.localeData()._week;
        let janX = 7 + weekSet.dow - weekSet.doy;
        moment.updateLocale(locale, {
            week: {
                dow: weekStart,
                doy: 7 + weekStart - janX
            }
        });
    }

    /**
     * 设置一年的第一周要包含一月几号
     *  https://momentjs.com/docs/#/customization/dow-doy/
     * @param janX
     */
    public static setFirstWeekOfYear(janX: number): void {
        let locale = moment.locale();
        let weekSet = moment.localeData()._week;
        moment.updateLocale(locale, {
            week: {
                dow: weekSet.dow,
                doy: 7 + weekSet.dow - janX
            }
        });
    }

    public static getWeekStart() {
        return moment.localeData().firstDayOfWeek()
    }

    public static getWeekdaysMin() {
        return moment.weekdaysMin();
    }

    public static getWeekdaysShort() {
        return moment.weekdaysShort();
    }

    public static getMonthShort() {
        return moment.localeData().monthsShort();
    }

    /**
     * 获取周数对应的年份
     *
     * @param date
     *
     */
    public static getWeekYear(date: Time): number {
        return moment(date).weekYear();
    }

    /**
     * 获取给定时间在当年的周数
     *
     * @param date
     *
     */
    public static getWeekOfYear(date: Time): number {
        return moment(date).week();
    }


    public static getWeekDate(date: Time) {
        return {year: this.getWeekYear(date), week: this.getWeekOfYear(date)};
    }

    /**
     * 获取给定时间的年数值
     *
     * @param date
     *
     */
    public static getYear(date: Time): number {
        return moment(date).year();
    }

    /**
     * 获取给定时间的月数值
     *
     * @param date
     *
     */
    public static getMonth(date: Time): number {
        return moment(date).month() + 1;
    }

    /**
     * 获取给定时间的天数值
     *
     * @param date
     *
     */
    public static getDay(date: Time): number {
        return moment(date).date();
    }

    public static getDateFromYearAndWeek(year: number, week: number): Date {
        return moment().weekYear(year).week(week)
    }

    public static getDate(str: Time, gr: TimeGr): Moment {
        return moment(str, TimeService.getFormatter(gr));
    }

    public static getFirstDateOfMonth(year: number, month: number): Moment {
        return this.getRealDateOfMonth(year, month, 1);
    }

    public static getLastDateOfMonth(year: number, month: number): Moment {
        return this.getRealDateOfMonth(year, month, 31);
    }

    public static getRealDateOfMonth(year: number, month: number, day: number): Moment {
        return moment([year, 0, day]).month(month - 1);
    }

    /**
     * 根据字符串获取真实时间
     *
     * @param time
     * @param gr
     *
     */
    public static getFormatDate(time: Time, gr?: TimeGr): Time {
        let result = time;
        if (TimeService.isMacro(time)) {
            time = (<string>time).replace(/\s+/g, "");
            let fullPara = /([a-z]+)(\+|\-)?([\d]+)([a-z]+)?/i;
            let timeMacroArr = fullPara.exec(time);
            if (timeMacroArr && CommonUtils.isDefined(timeMacroArr[2])) { //有加减 now-2d
                result = TimeService.addDate(
                    TimeService._convertBasicMacro(timeMacroArr[1]),
                    "" + timeMacroArr[2] + timeMacroArr[3],
                    TimeUnit[timeMacroArr[4]]);
            } else { //无加减 now
                result = TimeService._convertBasicMacro(time);
            }
        }
        if (typeof result === 'string') {
            result = TimeService.format(result, TimeService._timeFormatterConvert(TimeFormatters.yyyy_mm_dd_hh_mm_ss));
            result = new Date(moment(result, TimeService._timeFormatterConvert(TimeFormatters.yyyy_mm_dd_hh_mm_ss)));
            result = isNaN(result.valueOf()) ? new Date() : result;
        }
        if (result && (gr || (!gr && gr == 0)) || result instanceof Date || result instanceof moment) {
            if (result instanceof moment) {
                result = TimeService.formatWithGr(result, gr);
            } else {
                result = TimeService.formatWithGr(moment(result, TimeService.getFormatter(gr)), gr);
            }
        }
        return result;
    }

    /**
     * 根据粒度获取单位
     *
     * @param gr
     */
    public static getUnitByGr(gr: TimeGr): TimeUnit {
        let unit: TimeUnit;
        switch (gr) {
            case TimeGr.second:
                unit = TimeUnit.s;
                break;
            case TimeGr.minute:
                unit = TimeUnit.m;
                break;
            case TimeGr.hour:
                unit = TimeUnit.h;
                break;
            case TimeGr.date:
                unit = TimeUnit.d;
                break;
            case TimeGr.week:
                unit = TimeUnit.w;
                break;
            case TimeGr.month:
                unit = TimeUnit.M;
                break;
            case TimeGr.time_hour:
                unit = TimeUnit.h;
                break;
            case TimeGr.time_hour_minute:
                unit = TimeUnit.m;
                break;
            case TimeGr.time_minute_second:
                unit = TimeUnit.s;
                break;
            default:
                unit = TimeUnit.d;
                break;
        }
        return unit;
    }

    /**
     * 转换时间单位
     *
     * @param number
     * @param unit
     * @param newUnit
     */
    public static convertTimeUnit(number: number, unit: TimeUnit, newUnit: TimeUnit): number {
        const units = {
            [TimeUnit.s]: 1,
            [TimeUnit.m]: 60,
            [TimeUnit.h]: 3600,
            [TimeUnit.d]: 86400,
            [TimeUnit.w]: 604800,
            [TimeUnit.M]: 2629800,
            [TimeUnit.y]: 31557600
        };

        if (unit == newUnit) {
            return Math.ceil(number); // 向上取整
        }

        if (!units[unit] || !units[newUnit]) {
            return NaN; // 如果输入的单位无效，则返回 NaN 或其他你认为合适的值
        }

        const seconds = number * units[unit];
        return Math.floor(seconds / units[newUnit]);
    }

    // @ignoring-i18n-check-start
    public static deFineZhLocale() {
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
    // @ignoring-i18n-check-end

    public static setLocale(lang: string) {
        moment.locale(lang);
    }
}
