import {Time, Moment, WeekTime} from "./time.types";
import {CommonUtils} from "../core/utils/common-utils";
export enum TimeGr {
    second, minute, hour, date, week, month
}

export enum TimeWeekStart {
    sun, mon, tue, wed, thu, fri, sat
}

export enum TimeUnit{
    s,m,h,d,w,M,y

}

export enum TimeFormatters{
    yyyy_mm_dd_hh_mm_ss,yyyy_mm_dd_hh_mm,yyyy_mm_dd_hh,yyyy_mm_dd,yyyy_mm
}


export class TimeService {
    public static convertValue(value: WeekTime, gr:TimeGr): string {
        value = TimeService.handleWeekValue(value);
        value = TimeService.getFormatDate(<Time>value, gr);
        return <string>value;
    }

    private static handleWeekValue(newValue:WeekTime) : Time{
        if (typeof newValue["week"] === 'number') {
            return TimeService.getDateFromYearAndWeek(newValue["year"], newValue["week"])
        }
        return <Time>newValue;
    }

    private static timeFormattersConvert(formatter : TimeFormatters):string{
        switch (formatter){
            case TimeFormatters.yyyy_mm_dd_hh_mm_ss : return "YYYY-MM-DD, HH:mm:ss";
            case TimeFormatters.yyyy_mm_dd_hh_mm : return "YYYY-MM-DD, HH:mm";
            case TimeFormatters.yyyy_mm_dd_hh : return "YYYY-MM-DD, HH";
            case TimeFormatters.yyyy_mm_dd : return "YYYY-MM-DD";
            case TimeFormatters.yyyy_mm : return "YYYY-MM";
        }
    }

    private static timeFormatMap = new Map([
        [TimeGr.second, TimeService.timeFormattersConvert(TimeFormatters.yyyy_mm_dd_hh_mm_ss)],
        [TimeGr.minute, TimeService.timeFormattersConvert(TimeFormatters.yyyy_mm_dd_hh_mm)],
        [TimeGr.hour, TimeService.timeFormattersConvert(TimeFormatters.yyyy_mm_dd_hh)],
        [TimeGr.date, TimeService.timeFormattersConvert(TimeFormatters.yyyy_mm_dd)],
        [TimeGr.week, TimeService.timeFormattersConvert(TimeFormatters.yyyy_mm_dd)],
        [TimeGr.month, TimeService.timeFormattersConvert(TimeFormatters.yyyy_mm)]
    ]);

    public static timeUnitConvert(unit : TimeUnit):string{
       return TimeUnit[unit];
    }

    private static timeUnitMap = new Map([
        [TimeUnit.s, 'seconds'],
        [TimeUnit.m, 'minutes'],
        [TimeUnit.h, "hours"],
        [TimeUnit.d, 'days'],
        [TimeUnit.w, 'weeks'],
        [TimeUnit.M, 'months'],
        [TimeUnit.y, 'years']
    ]);

    private static initMoment() {
        try {
            moment.suppressDeprecationWarnings = 1;
        }catch(e) {

        }
    }

    private static init = TimeService.initMoment();


    /**
     * 是否是时间宏字符串
     * @param time
     * @returns {boolean}
     */
    public static isMacro(time:Time): boolean {
        if (typeof time === 'string') {
            return !!time.match(/^\s*(now|today|yestoday|tomorrow)\s*([+-]\s*\d+\s*\w+)?\s*$/i);
        }
        return false;
    }

    /**
     * 特殊时间宏的转换
     * @param timeMacro
     * @returns {any}
     */
    private static convertBasicMacro(timeMacro:string): Date|string {
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
     * @param date  时间
     * @param num   数量 负数即为减法
     * @param unit  单位
     */
    public static addDate(date:Time, num:string|number, unit:TimeUnit): Moment {
        return moment(date).add(num, TimeService.timeUnitMap.get(unit));
    }


    /**
     * 根据粒度获取格式化字符串
     * @param gr
     * @returns {string}
     */
    public static getFormatter(gr: TimeGr): string {
        return TimeService.timeFormatMap.has(gr) ? TimeService.timeFormatMap.get(gr) : 'YYYY-MM-DD';
    }


    /**
     * 时间格式化
     * @param date
     * @param formatter
     */
    public static format(date:Time, formatter:string|TimeFormatters): string {
        if(typeof formatter === "number") formatter = TimeService.timeFormattersConvert(formatter);
        return moment(date).format(formatter);
    }

    /**
     * 根据粒度格式化时间
     * @param date
     * @param gr
     */
    public static formatWithGr(date:Time, gr:TimeGr): string {
        let format = TimeService.getFormatter(gr);
        return moment(date).format(format);
    }


    /**
     * 设置默认周开始
     * @param weekStart
     */
    public static setWeekStart(weekStart: TimeWeekStart = TimeWeekStart.sun): void {
        let locale = moment.locale();
        moment.updateLocale(locale, {
            week: {
                dow: weekStart
            }
        });
    }


    public static getWeekOfYear(date:Time): number {
        return moment(date).week();
    }

    public static getYear(date:Time): number {
        return moment(date).year();
    }

    public static getMonth(date:Time): number {
        return moment(date).month() + 1;
    }

    public static getDay(date:Time): number {
        return moment(date).date();
    }


    public static getDateFromYearAndWeek(year: number, week: number): Date {
        return moment().year(year).week(week)
    }

    public static getDate(str:Time, gr: TimeGr): Moment {
        return moment(str, TimeService.getFormatter(gr));
    }

    /**
     * 根据字符串获取真实时间
     * @param time
     * @param gr
     * @returns {any}
     */
    public static getFormatDate(time: Time, gr?: TimeGr): Time {
        let result = time;
        if (TimeService.isMacro(time)) {
            time = (<string>time).replace(/\s+/g, "");
            let fullPara = /([a-z]+)(\+|\-)?([\d]+)([a-z]+)?/i;
            let timeMacroArr = fullPara.exec(time);
            if (timeMacroArr && CommonUtils.isDefined(timeMacroArr[2])) { //有加减 now-2d
                result = TimeService.addDate(
                    TimeService.convertBasicMacro(timeMacroArr[1]),
                    "" + timeMacroArr[2] + timeMacroArr[3],
                    TimeUnit[timeMacroArr[4]]);
            } else { //无加减 now
                result = TimeService.convertBasicMacro(time);
            }
        }
        if (typeof result === 'string') {
            result = new Date(result);
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
