import {Time, Moment, WeekTime, TimeWeekDay} from "./time.types";
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
    yyyy_mm_dd_hh_mm_ss, yyyy_mm_dd_hh_mm, yyyy_mm_dd_hh, yyyy_mm_dd, yyyy_mm, hh_mm_ss, hh_mm, mm_ss
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
        let [dateWeekNum, weekStartNum] = [new Date(date).getDay(), this.getWeekStart()];
        let dateIndex = dateWeekNum - weekStartNum >= 0 ? dateWeekNum - weekStartNum : dateWeekNum - weekStartNum + 7;
        let [weekStartDate, weekEndDate] = [this.addDate(date, -dateIndex, TimeUnit.d),
            this.addDate(date, 6 - dateIndex, TimeUnit.d)];
        let [weekStartMonth, weekEndMonth] = [this.getMonth(weekStartDate), this.getMonth(weekEndDate)];
        if (weekStartMonth == weekEndMonth) {
            return this.getFormatDate(weekStartDate, gr);
        } else {
            return this.getFormatDate(`${this.getYear(weekEndDate)}-${weekEndMonth}-01`, gr);
        }
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

    public static getWeekStart() {
        return moment.localeData().firstDayOfWeek()
    }

    public static getWeekdaysMin() {
        return moment.weekdaysMin();
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
}
