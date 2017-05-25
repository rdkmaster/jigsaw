

export enum TimeGr {
    second,minute,hour,date,week,month
}

export enum TimeWeekStart {
    sun ,mon ,tue ,wed ,thu ,fri ,sat
}


export class TimeService {

    private static timeFormatMap = new Map([[TimeGr.second,'YYYY-MM-DD,HH:mm:ss'], [TimeGr.minute,'YYYY-MM-DD,HH:mm'],
        [TimeGr.hour,'YYYY-MM-DD,HH'],[TimeGr.date,'YYYY-MM-DD'],
        [TimeGr.week,'YYYY-MM-DD'],[TimeGr.month,'YYYY-MM']]);

    private static timeUnitMap = new Map([['s','seconds'],['m','minutes'],['h',"hours"],['d','days'],['w','weeks'],['M','months'],['y','years']]);

    private static init = TimeService.initMoment();


    private static initMoment(){
        moment.suppressDeprecationWarnings = 1;
    }

    /**
     * 是否是时间宏字符串
     * @param str
     * @returns {boolean}
     */
    public static isMacro(str) : boolean{
        if(typeof str === 'string'){
            let hasLetter = /^[a-z]/i;
            if(hasLetter.test(str)) return true;
        }
        return false;
    }

    /**
     * 特殊时间宏的转换
     * @param timeMacro
     * @returns {any}
     */
    private static timeMacroConvert(timeMacro): any {
        var date;
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
    public static addDate(date, num, unit): string {
        return moment(date).add(num, TimeService.timeUnitMap.get(unit));
    }


    /**
     * 根据粒度获取格式化字符串
     * @param gr
     * @returns {string}
     */
    public static getFormator(gr:TimeGr): string {
        return TimeService.timeFormatMap.has(gr)?TimeService.timeFormatMap.get(gr) : 'YYYY-MM-DD';
    }


    /**
     * 时间格式化
     * @param date
     * @param formator
     */
    public static format(date, formator): string {
        return moment(date).format(formator);
    }

    /**
     * 根据粒度格式化时间
     * @param date
     * @param gr
     */
    public static formatWithGr(date, gr): string {
        let format = TimeService.getFormator(gr);
        return moment(date).format(format);
    }


    /**
     * 设置默认周开始
     * @param weekStart
     */
    public static setWeekStart(weekStart:TimeWeekStart = TimeWeekStart.sun){
        let locale = moment.locale();
        moment.updateLocale(locale, {
            week : {
                dow : weekStart
            }
        });
    }



    public static getWeekofYear(date) : number{
        return moment(date).week();
    }

    public static getYear(date) : number{
        return moment(date).year();
    }

    public static getMonth(date) : number{
        return moment(date).month()+1;
    }

    public static getDay(date) : number{
        return moment(date).date();
    }


    public static getDateFromYearAndWeek(year:number,week:number): Date{
        return moment().year(year).week(week)
    }

    public static getDate(str,gr:TimeGr){
        return moment(str,TimeService.getFormator(gr));
    }

    /**
     * 根据字符串获取真实时间
     * @param str
     * @returns {any}
     */
    public static getFormateDate(str,gr?): any {
        let result = str ;
        if (TimeService.isMacro(str)) {
            str = str.replace(/\s+/g, "");
            let fullPara = /([a-z]+)(\+|\-)?([\d]+)([a-z]+)?/i;
            let timeMacroArr = fullPara.exec(str);
            if (timeMacroArr && timeMacroArr[2] != undefined) { //有加减 now-2d
                result= TimeService.addDate(TimeService.timeMacroConvert(timeMacroArr[1]), "" + timeMacroArr[2] + timeMacroArr[3], timeMacroArr[4]);
            } else { //无加减 now
                result= TimeService.timeMacroConvert(str);
            }
        }
        if(result && (gr || (!gr &&gr==0)) || result instanceof Date){
            result = TimeService.formatWithGr(moment(result,TimeService.getFormator(gr)),gr);
        }
        return result;
    }
}
