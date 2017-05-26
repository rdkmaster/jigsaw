import {
    Component, Input, Output, ElementRef, OnInit, EventEmitter, Renderer2, OnDestroy
} from '@angular/core';
import {AbstractRDKComponent} from '../core';
import {TimeGr, TimeService, TimeWeekStart} from "../../service/time.service";
import {PopupInfo, PopupService,PopupPositionType} from "../../service/popup.service";
import {SimpleTooltipComponent} from "../tooltip/tooltip";


export type TimeWeekDay = {
    week: number,
    year: number
}

export type Time = string | Date | TimeWeekDay | Moment;

export type Moment = {
    _isAMomentObject : boolean,
    [prop:string]: any;
}


export type ShortCut = {
    label : string,
    callback : () => [Time,Time];
}

export type GrItem = {
    label: string,
    value: TimeGr,
    span? : string,
    shortCuts? : ShortCut[];
}


export class TimeConvert{
    public static convertValue(value:Time,gr){
        value = TimeConvert.handleWeekValue(value);
        value = TimeService.getFormateDate(value,gr);
        return value;
    }

    private static handleWeekValue(newValue) {
        if (typeof newValue["week"] === 'number') {
            return TimeService.getDateFromYearAndWeek(newValue["year"], newValue["week"])
        }
        return newValue;
    }
}

@Component({
    selector: 'rdk-time',
    templateUrl: 'time.html',
    styleUrls: ['time.scss'],
    host: {
        '[style.width]': 'width'
    }
})

export class RdkTime extends AbstractRDKComponent implements OnInit ,OnDestroy {

    @Output() public grChange = new EventEmitter<TimeGr>();

    private _gr: TimeGr;

    public get gr() : TimeGr|string{
        return (this._gr || this._gr === TimeGr.second) ? this._gr : TimeGr.date;
    }
    //粒度
    @Input()
    public set gr(value: TimeGr | string ) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if(<TimeGr>value != this._gr) {
            this._gr = <TimeGr>value;
            this._value = TimeService.getFormateDate(this._value,this._gr);
            if (this._timepicker) {
                this.initDatePicker();
            }
        }
    }

    private _value: Time;

    //组件暴露出去的时间数值，支持双向绑定
    @Input()
    public get date(): Time {
        return this._value;
    }

    public set date(newValue: Time) {
        if (newValue) {
            newValue = TimeConvert.convertValue(newValue,this.gr);
            if(newValue != this._value){
                if(this._value && this.gr == TimeGr.week){
                    let newValueYear = TimeService.getYear(newValue);
                    let valueYear = TimeService.getYear(this._value);
                    let newValueWeek = TimeService.getWeekofYear(newValue);
                    let valueWeek = TimeService.getWeekofYear(this._value);
                    if(newValueYear== valueYear && newValueWeek==valueWeek) return;
                }
                let [value,] = this.handleValue(newValue);
                this._value = value;
                this.setDate(this._value);
            }
        }
    }


    @Output() public dateChange = new EventEmitter<Time>();


    private _limitStart: Time;

    public get limitStart():Time{
        return this._limitStart && TimeConvert.convertValue(this._limitStart,this.gr);
    }
    @Input()
    public set limitStart(value: Time) {
        if (value) {
            this._limitStart = value;
            this.checkMacro();
            if (this._timepicker) {
                this._timepicker.minDate(this.limitStart);
                this.weekHandle();
                this.handleRecommended(this.el.nativeElement,this.popService);
            }
        }
    }

    private _limitEnd: Time;

    public get limitEnd() :Time{
        return this._limitEnd && TimeConvert.convertValue(this._limitEnd,this.gr)
    }

    @Input()
    public set limitEnd(value: Time) {
        if (value) {
            this._limitEnd = value;
            this.checkMacro();
            if (this._timepicker) {
                this._timepicker.maxDate(this.limitEnd);
                this.weekHandle();
                this.handleRecommended(this.el.nativeElement,this.popService);
            }
        }
    }

    //时间刷新的间隔毫秒数，主要针对startDate或endDate设置为now或now-2h等需要不时刷新的场景
    //@Input("refreshInterval") private _refreshInterval: number;
    private _refreshInterval: number;
    @Input()
    public set refreshInterval(value:number){
        if(value || value==0){
            this._refreshInterval = value;
            this.checkMacro();
        }
    }

    //周开始设置，可选值 sun mon tue wed thu fri sat，默认值是sun
    private _weekStart: TimeWeekStart;
    @Input()
    public set weekStart(value: string | TimeWeekStart) {
        if (value) {
            if (typeof value === 'string') {
                this._weekStart = TimeWeekStart[value];
            } else {
                this._weekStart = value;
            }
            if (this._timepicker) {
                TimeService.setWeekStart(this._weekStart);
                this.initDatePicker();
                this.handleRecommended(this.el.nativeElement,this.popService);
            }
        }
    }

    @Input("grItems") public grItems: GrItem[];

    @Input("recommendedBegin") private _recommendedBegin: Time;

    @Input("recommendedEnd") private _recommendedEnd: Time;


    //time插件容器（jq对象）
    private _timepicker: any;

    //定时器Id
    private _intervalId: number;

    constructor(private el: ElementRef,private renderer: Renderer2,private popService:PopupService) {
        super();
        this._refreshInterval = 0;
        this.weekStart = TimeWeekStart.sun;
    }

    ngOnInit() {
        this.initDatePicker();
        this.checkMacro();

    }

    ngOnDestroy(){
        this.destoryPicker();
    }

    private destoryPicker(){
        if(this._timepicker){
            this._timepicker.destroy();
        }
    }


    private initDatePicker(){
        let insert = this.el.nativeElement.querySelector(".rdk-time-box");
        TimeService.setWeekStart(this._weekStart);
        let [result,isChange] = this.handleValue(this._value);
        if(isChange) {
            this._value = result;
        }
        this.destoryPicker();
        $(insert).datetimepicker({
            inline: true,
            defaultDate: TimeService.getDate(this._value,<TimeGr>this.gr),
            format: TimeService.getFormator(<TimeGr>this.gr),
            minDate: this._limitStart && TimeService.getDate(this.limitStart,<TimeGr>this.gr),
            maxDate: this._limitEnd && TimeService.getDate(this.limitEnd,<TimeGr>this.gr)
        }).on("dp.change", (e) => {
            let changeValue = TimeService.getFormateDate(e.date,this.gr);
            if( this._value!= changeValue){
                this.handleValueChange(changeValue, this.gr);
             }
        });
        this._timepicker = $(insert).data("DateTimePicker");
        this.handleValueChange(this._value, this.gr,true);
    }

    //设置插件选中时间值
    private setDate(value: Time) {
        if (this._timepicker) {
            this._timepicker.date(TimeService.getFormateDate(value));
            this.handleValueChange(this._value, this.gr);
            this.handleRecommended(this.el.nativeElement,this.popService);
        }
    }

    private changeGranularity(select: GrItem) {
        this.gr = select.value;
        this.grChange.emit(this.gr);
    }

    private checkMacro() {
        if (this._intervalId) {
            window.clearInterval(this._intervalId);
        }
        if ((TimeService.isMacro(this._limitStart) || TimeService.isMacro(this._limitEnd)) && this._refreshInterval != 0) {
            this._intervalId = window.setInterval(() => {
                this.handleLimitStartAndEnd();
            }, this._refreshInterval);
        }
    }

    private handleLimitStartAndEnd() {
        if (this._timepicker) {
            this._limitStart && this._timepicker.minDate(TimeService.addDate(this.limitStart,-1,'s'));
            this._limitEnd && this._timepicker.maxDate(TimeService.addDate(this.limitEnd,1,'s'));
            this.weekHandle();
            this.handleRecommended(this.el.nativeElement,this.popService);
        }
    }

    private weekHandle(){
        if (this.gr == TimeGr.week) {
            this.handleWeekSelect();
        }
    }

    private handleValueChange(changeValue, gr,emit?) {
        if (this._value != changeValue || emit) {
            this._value = changeValue;
             setTimeout(() => {
                if (gr != TimeGr.week) {
                    this.dateChange.emit(this._value);
                } else {
                    this.dateChange.emit(this.handleWeekSelect());
                }
                }, 0);
            this.handleRecommended(this.el.nativeElement,this.popService);
         }
    }

    private handleValue(value) : [Time,boolean]{
        if(this._limitStart && value < this.limitStart){
            return [this.limitStart,true];
        }
        if(this._limitEnd && value > this.limitEnd){
            return [this.limitEnd,true];
        }
        return [value,false];
    }


    private handleWeekSelect() {
        let weekNum = TimeService.getWeekofYear(this._value);
        let year = TimeService.getYear(this._value);
        let trNode = this.el.nativeElement.querySelector(".rdk-time-box .datepicker .datepicker-days>table>tbody>tr>td.active").parentNode;
        trNode.classList.add("active");
        return {year: year, week: weekNum};
    }



    private static getDataPickerNode(granularity, nativeElement,isHead?) {
        let selectorBefore = ".rdk-time-box .datepicker .datepicker-";
        let selectorAfter = ">table>tbody>tr>";
        let nodeName = "";
        if (granularity == "years" || granularity == "months") {
            nodeName = "td>span:not(.disabled)";
        } else {
            nodeName = "td:not(.disabled)";
        }
        let selector = selectorBefore + granularity + selectorAfter + nodeName;
        if (!!isHead) {
            let theadNode = ">table>thead>tr>th.picker-switch[colspan]";
            selector = selectorBefore + granularity + theadNode;
            return nativeElement.querySelector(selector);
        }
        return nativeElement.querySelectorAll(selector);
    }

    private tooltipInfo:PopupInfo;

    private  handleRecommended(nativeElement,popService) {
        if (this._recommendedBegin && this._recommendedEnd) {
            this._recommendedBegin = TimeService.getFormateDate(this._recommendedBegin );
            this._recommendedEnd = TimeService.getFormateDate(this._recommendedEnd );
            if (TimeService.getYear(this._recommendedBegin) != TimeService.getYear(this._recommendedEnd)) { //不支持跨年设置
                throw "recommended not support different year times!";
            }
            let monthsNode = RdkTime.getDataPickerNode("months",nativeElement);
            let monthsHeadNode = RdkTime.getDataPickerNode("months",nativeElement, true);
            RdkTime.searchDateForMonth(this._recommendedBegin,this._recommendedEnd, monthsNode, monthsHeadNode);
            let daysNode = RdkTime.getDataPickerNode("days",nativeElement);
            let daysHeadNode = RdkTime.getDataPickerNode("days",nativeElement, true);
            let daysObj = RdkTime.parseDay(daysHeadNode.innerText);
            RdkTime.searchDateForDay(this._recommendedBegin,this._recommendedEnd, daysNode, daysObj);
            nativeElement.querySelectorAll(".rdk-time-box .datepicker .expect-day").forEach( node =>{
                this.renderer.listen(node,"mouseenter",(event) =>{
                    if(this.tooltipInfo){
                        this.tooltipInfo.dispose();
                        this.tooltipInfo = null;
                    }
                    this.tooltipInfo = popService.popup(SimpleTooltipComponent,{
                        modal: false, //是否模态
                        pos: {x:$(event.currentTarget).offset().left , y: $(event.currentTarget).offset().top},
                        posOffset: { //偏移位置
                            top: -40,
                            left: 0
                        },
                        posType: PopupPositionType.absolute, //定位类型
                    }, {
                        message: "Recommended"
                    });
                });
                this.renderer.listen(node,"mouseleave",()=>{
                   if(this.tooltipInfo){
                       this.tooltipInfo.dispose();
                       this.tooltipInfo = null;
                   }
                })
            });
        }
    }


    private static searchDateForDay(begin, end, sourceNodes, headObj) {
        let startMonth = TimeService.getMonth(begin);
        let endMonth = TimeService.getMonth(end);

        let startDate = TimeService.getDay(begin);
        let endDate = TimeService.getDay(end);

        if (TimeService.getYear(begin) == headObj.year &&
            (startMonth == headObj.month || endMonth == headObj.month)) {
            sourceNodes.forEach(node => {
                let text = +node.innerText;
                if (startMonth != endMonth) {
                    if (!node.classList.contains("old") && !node.classList.contains("new")) {
                        if ((startMonth == headObj.month && text >= startDate) ||
                            (endMonth == headObj.month && text >= endDate)) {
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

    private  static parseDay(val) {
        let charToNum = {一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 十一: 11, 十二: 12};
        let enUsToNum = {
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
            val = val.split(/\s+/);
            result["month"] = +enUsToNum[val[0]];
            result["year"] = +val[1];
        } else {
            val = val.split("月");
            result["month"] = charToNum[val[0].trim()];
            result["year"] = +(val[1].trim());
        }
        return result;
    }

    private static parseMonth(val) {
        let enUsSimpleToNum = {
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

    private static searchDateForMonth(begin, end, sourceNodes, headNode) {
        let startMonth = TimeService.getMonth(begin);
        let endMonth = TimeService.getMonth(end);
        if (TimeService.getYear(begin) == headNode.innerText) {
            sourceNodes.forEach( node => {
                if(!node.classList.contains("disabled")){
                    let month = RdkTime.parseMonth(node.innerText);
                    if (month >=startMonth && month <= endMonth){
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

}
