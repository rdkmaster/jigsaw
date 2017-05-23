import {
    Component, Input, Output, ElementRef, OnInit, EventEmitter, Renderer2, ChangeDetectorRef
} from '@angular/core';
import {AbstractRDKComponent} from '../core';
import {TimeGr, TimeService, TimeWeekStart} from "../../service/time.service";
import {PopupInfo, PopupService,PopupPositionType} from "../../service/popup.service";
import {SimpleTooltipComponent} from "../tooltip/tooltip";


export type TimeWeekDay = {
    week: number,
    year: number
}

export type Time = string | Date | TimeWeekDay;

export type grItem = {
    label: string,
    value: TimeGr
}

@Component({
    selector: 'rdk-time',
    templateUrl: 'time.html',
    styleUrls: ['time.scss'],
    host: {
        '[style.width]': 'width'
    }
})

export class RdkTime extends AbstractRDKComponent implements OnInit {


    private _value: Time;

    //组件暴露出去的时间数值，支持双向绑定
    @Input()
    public get date(): Time {
        return this._value;
    }

    public set date(newValue: Time) {
        if (newValue && TimeService.getDate(this._value) != TimeService.getDate(newValue)) {
            this._value = RdkTime.handleWeekValue(newValue);
            this.setDate(this._value);
        }
    }

    @Output() public dateChange = new EventEmitter<Time>();


    private _limitStart: string;

    @Input()
    public set limitStart(value: string) {
        if (value) {
            this._limitStart = value;
            this.checkMacro();
            if (this._timepicker) {
                this._timepicker.minDate(TimeService.getDate(this._limitStart));
            }
        }
    }

    private _limitEnd: string;

    @Input()
    public set limitEnd(value: string) {
        if (value) {
            this._limitEnd = value;
            this.checkMacro();
            if (this._timepicker) {
                this._timepicker.maxDate(TimeService.getDate(this._limitEnd));
            }
        }
    }

    //时间刷新的间隔毫秒数，主要针对startDate或endDate设置为now或now-2h等需要不时刷新的场景
    @Input("refreshInterval") private _refreshInterval: number;

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
                this._timepicker.destroy();
                this.initDatePicker();
                this.handleRecommended(this._recommended,this.el.nativeElement,this.popService);
            }
        }
    }

    private _gr: TimeGr;
    //粒度
    @Input()
    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        this._gr = <TimeGr>value;

        if (this._timepicker) {
            this._timepicker.destroy();
            this.initDatePicker();
        }

    }

    @Input("grItems") private _grItems: grItem[];

    @Input("recommended") private _recommended: string[];

    //time插件容器（jq对象）
    private _timepicker: any;

    //定时器Id
    private _intervalId: number;

    constructor(private el: ElementRef,private renderer: Renderer2,private popService:PopupService) {
        super();
        this.gr = TimeGr.date;
        this._value = 'now';
        this._refreshInterval = 0;
        this.weekStart = TimeWeekStart.sun;
    }

    ngOnInit() {
        this.initDatePicker();
        this.checkMacro();

    }

    private initDatePicker(){
        let insert = this.el.nativeElement.querySelector(".rdk-time-box");
        TimeService.setWeekStart(this._weekStart);
        $(insert).datetimepicker({
            inline: true,
            defaultDate: TimeService.getDate(this._value,this._gr),
            format: TimeService.getFormator(this._gr),
            minDate: TimeService.getDate(this._limitStart),
            maxDate: TimeService.getDate(this._limitEnd)
        }).on("dp.change", (e) => {
            if(TimeService.formatWithGr(TimeService.getDate(this._value,this._gr), this._gr) !=
                TimeService.formatWithGr(TimeService.getDate(e.date,this._gr), this._gr)){
                this.handleValueChange(e.date, this._gr);
             }
        });
        this._timepicker = $(insert).data("DateTimePicker");
        this.handleValueChange(this._value, this._gr ,true);
    }

    //设置插件选中时间值
    private setDate(value: Time) {
        if (this._timepicker) {
            this._timepicker.date(TimeService.getDate(value));
            this.handleValueChange(this._value, this._gr);
        }
    }

    private changeGranularity(select: grItem) {
        this.gr = select.value;
    }

    private checkMacro() {
        if (this._intervalId) {
            window.clearInterval(this._intervalId);
        }
        if ((TimeService.isMacro(this._limitStart) || TimeService.isMacro(this._limitEnd)) && this._refreshInterval != 0) {
            this._intervalId = window.setInterval(() => {
                this.handleLimitStartAndEnd(this._limitStart, this._limitEnd);
            }, this._refreshInterval);
        }
    }

    private handleLimitStartAndEnd(start, end) {
        if (this._timepicker) {
            start && this._timepicker.minDate(TimeService.getDate(start));
            end && this._timepicker.maxDate(TimeService.getDate(end));
            if (this._gr == TimeGr.week) {
                this.handleWeekSelect();
            }
        }
    }

    private handleValueChange(date, gr,emit?) {
        date = RdkTime.handleWeekValue(date);
        let changeValue = TimeService.formatWithGr(TimeService.getDate(date,gr), gr);
        if (this._value != changeValue || emit) {
            this._value = changeValue;
            setTimeout(() => {
                if (this._gr != TimeGr.week) {
                    this.dateChange.emit(this._value);
                } else {
                    this.handleWeekSelect();
                    this.dateChange.emit(this._value);
                }
            }, 0);
            this.handleRecommended(this._recommended,this.el.nativeElement,this.popService);
         }
    }


    private handleWeekSelect() {
        let weekNum = TimeService.getWeekofYear(this._value);
        let year = TimeService.getYear(this._value);
        this._value = {year: year, week: weekNum};
        let trNode = this.el.nativeElement.querySelector(".rdk-time-box .datepicker .datepicker-days>table>tbody>tr>td.active").parentNode;
        trNode.classList.add("active");
    }

    private static handleWeekValue(newValue) {
        if (typeof newValue["week"] === 'number') {
            return TimeService.getDateFromYearAndWeek(newValue["year"], newValue["week"])
        }
        return newValue;
    }

    private static getDataPickerNode(granularity, nativeElement,isHead?) {
        let selectorBefore = ".rdk-time-box .datepicker .datepicker-";
        let selectorAfter = ">table>tbody>tr>";
        let nodeName = "";
        if (granularity == "years" || granularity == "months") {
            nodeName = "td>span";
        } else {
            nodeName = "td";
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

    private  handleRecommended(value,nativeElement,popService) {
        if (value && value.length == 2) {
            value[0] = TimeService.getDate(value[0]);
            value[1] = TimeService.getDate(value[1]);
            if (TimeService.getYear(value[0]) != TimeService.getYear(value[1])) { //不支持跨年设置
                throw "recommended not support different year times!";
            }
            let monthsNode = RdkTime.getDataPickerNode("months",nativeElement);
            let monthsHeadNode = RdkTime.getDataPickerNode("months",nativeElement, true);
            RdkTime.searchDateForMonth(value, monthsNode, monthsHeadNode);
            let daysNode = RdkTime.getDataPickerNode("days",nativeElement);
            let daysHeadNode = RdkTime.getDataPickerNode("days",nativeElement, true);
            let daysObj = RdkTime.parseDay(daysHeadNode.innerText);
            RdkTime.searchDateForDay(value, daysNode, daysObj);
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
                        posType: PopupPositionType.fixed, //定位类型
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


    private static searchDateForDay(targetObj, sourceNodes, headObj) {
        let startMonth = TimeService.getMonth(targetObj[0]);
        let endMonth = TimeService.getMonth(targetObj[1]);

        let startDate = TimeService.getDay(targetObj[0]);
        let endDate = TimeService.getDay(targetObj[1]);

        if (TimeService.getYear(targetObj[0]) == headObj.year &&
            (startMonth == headObj.month || endMonth == headObj.month)) {
            sourceNodes.forEach(node => {
                let text = +node.innerText;
                if (TimeService.getMonth(targetObj[0]) != TimeService.getMonth(targetObj[1])) {
                    if (!node.classList.contains("old") && node.classList.contains("new")) {
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

    private static searchDateForMonth(targetObj, sourceNodes, headNode) {
        if (TimeService.getYear(targetObj[0]) == headNode.innerText) {
            sourceNodes.forEach( node => {
                if (TimeService.getMonth(targetObj[0]) == RdkTime.parseMonth(node.innerText) ||
                    TimeService.getMonth(targetObj[1]) == RdkTime.parseMonth(node.innerText)) {
                    if (!node.classList.contains("disabled")) {
                        node.classList.add("expect-day");
                    }
                }
            })
        }
    }

}
