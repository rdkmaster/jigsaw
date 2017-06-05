export enum TimeGr {
    second, minute, hour, date, week, month
}

export enum TimeWeekStart {
    sun, mon, tue, wed, thu, fri, sat
}

export type TimeWeekDay = {
    week: number,
    year: number
}

export type Moment = {
    _isAMomentObject: boolean,
    [prop: string]: any;
}

export type Time = Date|string|Moment|TimeWeekDay;


export class TimeService {

    private static timeFormatMap = new Map([
        [TimeGr.second, 'YYYY-MM-DD, HH:mm:ss'],
        [TimeGr.minute, 'YYYY-MM-DD, HH:mm'],
        [TimeGr.hour, 'YYYY-MM-DD, HH'],
        [TimeGr.date, 'YYYY-MM-DD'],
        [TimeGr.week, 'YYYY-MM-DD'],
        [TimeGr.month, 'YYYY-MM']
    ]);

    private static timeUnitMap = new Map([
        ['s', 'seconds'],
        ['m', 'minutes'],
        ['h', "hours"],
        ['d', 'days'],
        ['w', 'weeks'],
        ['M', 'months'],
        ['y', 'years']
    ]);

    private static initMoment() {
        moment.suppressDeprecationWarnings = 1;
    }

    private static init = TimeService.initMoment();


    /**
     * 是否是时间宏字符串
     * @param time
     * @returns {boolean}
     */
    public static isMacro(time:Time): boolean {
        if (typeof time === 'string') {
            const hasLetter = /^[a-z]/i;
            return hasLetter.test(time);
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
    public static addDate(date:Time, num:string|number, unit:string): Moment {
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
    public static format(date:Time, formatter:string): string {
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
            if (timeMacroArr && timeMacroArr[2] != undefined) { //有加减 now-2d
                result = TimeService.addDate(TimeService.convertBasicMacro(timeMacroArr[1]), "" + timeMacroArr[2] + timeMacroArr[3], timeMacroArr[4]);
            } else { //无加减 now
                result = TimeService.convertBasicMacro(time);
            }
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
