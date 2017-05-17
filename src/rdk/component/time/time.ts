import {NgModule, Component, Input, Output, ElementRef, OnInit, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AbstractRDKComponent} from '../core';
import {TimeGr, TimeService, TimeWeekStart} from "./time-api";

export type TimeWeekDay ={
    week : number,
    year:number
}

export type Time = string | Date | TimeWeekDay;

export type grItem = {
    label : string,
    value : TimeGr
}

@Component({
    selector: 'rdk-time',
    templateUrl: 'time.html',
    styleUrls: ['time.scss'],
    providers: [TimeService],
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
        if (newValue && this._value !=newValue) {
            this._value = this.handleWeekValue(newValue);
            this.setDate(this._value);
        }
    }

    @Output() public dateChange = new EventEmitter<Time>();


    private _limitStart : string;

    @Input()
    public set limitStart(value : string){
        if(value) {
            this._limitStart = value;
            this.checkMacro();
            if(this._timepicker){
                this._timepicker.maxDate(TimeService.getDate(this._limitStart));
            }
        }
    }

    private _limitEnd : string;

    @Input()
    public set limitEnd(value : string){
        if(value){
            this._limitEnd = value;
            this.checkMacro();
            if(this._timepicker){
                this._timepicker.maxDate(TimeService.getDate(this._limitEnd));
            }
        }
    }

    //时间刷新的间隔毫秒数，主要针对startDate或endDate设置为now或now-2h等需要不时刷新的场景
    @Input() public refreshInterval:number;

     //周开始设置，可选值 sun mon tue wed thu fri sat，默认值是sun
     private _weekStart:TimeWeekStart;
    @Input()
    public set weekStart(value :string|TimeWeekStart){
        if(value){
            if (typeof value  === 'string'){
                this._weekStart = TimeWeekStart[value];
            }else{
                this._weekStart = value;
            }
        }
    }

    private _gr : TimeGr;
    //粒度
    @Input()
    public set gr (value : TimeGr|string){
        if(typeof value === 'string'){
            value = TimeGr[value];
        }
        if(this._timepicker){
            this._timepicker.format(TimeService.getFormator(<TimeGr>value));
            //handleViewMode
            if(value == TimeGr.month){
                this._timepicker.viewMode("months");
            }else{
                this._timepicker.viewMode("days");
            }
            this.handleValueChange(this._value,value);
        }
        this._gr =<TimeGr>value;
    }

    @Input() private grItems : grItem[];

    //time插件容器（jq对象）
    private _timepicker: any;

    //定时器Id
    private _IntervalId : number;

    constructor(private el: ElementRef) {
        super();
        this.gr = TimeGr.date;
        this._value = 'now';
        this.refreshInterval = 0;
        this.weekStart = TimeWeekStart.sun;
    }

    ngOnInit() {
            let insert = this.el.nativeElement.querySelector(".time-box");
            TimeService.setWeekStart(this._weekStart);
            $(insert).datetimepicker({
                inline: true,
                defaultDate: TimeService.getDate(this._value),
                format: TimeService.getFormator(this._gr),
                minDate:TimeService.getDate(this._limitStart),
                maxDate:TimeService.getDate(this._limitEnd),
            }).on("dp.change", (e) => {
                this.handleValueChange(e.date,this._gr);
            });
            this._timepicker = $(insert).data("DateTimePicker");
            this.checkMacro();
            this.handleValueChange(this._value,this._gr);
    }

    //设置插件选中时间值
    private setDate(value : Time) {
        if(this._timepicker) {
            this._timepicker.date(TimeService.getDate(value));
            this.handleValueChange(this._value,this._gr);
        }
    }

    private changeGranularity (select : grItem){
        this.gr = select.value;
    }

    public checkMacro(){
        if(this._IntervalId) {
            window.clearInterval(this._IntervalId);
        }
        if((TimeService.isMacro(this._limitStart) || TimeService.isMacro(this._limitEnd)) && this.refreshInterval!=0){
            this._IntervalId = window.setInterval(() => {
                this.handleLimitStartAndEnd(this._limitStart,this._limitEnd);
            },this.refreshInterval);
        }
    }

    public handleLimitStartAndEnd(start,end){
        if(this._timepicker){
            start&&this._timepicker.minDate(TimeService.getDate(start));
            end&&this._timepicker.maxDate(TimeService.getDate(end));
            if(this._gr== TimeGr.week){
                this.handleWeekSelect();
            }
        }
    }

    private handleValueChange(date ,gr ){
        date = this.handleWeekValue(date);
        let changeValue = TimeService.formatWithGr(TimeService.getDate(date),gr);
        if (this._value != changeValue || this._gr !=gr) {
            this._value = changeValue;
            if(gr!= TimeGr.week){
                this.dateChange.emit(this._value);
            }else{
                this.handleWeekSelect();
                this.dateChange.emit(this._value);
            }
        }
    }

    private handleWeekSelect(){
        let weekNum = TimeService.getWeekofYear(this._value);
        let year = TimeService.getYear(this._value);
        this._value = {year:year,week:weekNum};
        let trNode = this.el.nativeElement.querySelector(".time-box .datepicker .datepicker-days>table>tbody>tr>td.active").parentNode;
        trNode.classList.add("active");
    }

    private handleWeekValue(newValue){
        if(typeof newValue["week"] === 'number') {
            return TimeService.getDateFromYearAndWeek(newValue["year"],newValue["week"])
        }
        return newValue;
    }

}
