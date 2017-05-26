import {
    Component, OnInit, Input, EventEmitter, Output, ViewChild
} from '@angular/core';
import {AbstractRDKComponent} from '../core';
import {TimeGr, TimeService, TimeWeekStart} from "../../service/time.service";
import {GrItem, ShortCut, TimeWeekDay, TimeConvert, RdkTime, Moment} from "../time/time";


type Time = string | Date | TimeWeekDay | Moment;

@Component({
    selector: 'rdk-range-time',
    templateUrl: 'range-time.html',
    styleUrls: ['range-time.scss'],
    host: {
        '[style.width]': 'width'
    }
})

export class RdkRangeTime extends AbstractRDKComponent implements OnInit {

    @ViewChild("timeStart") private timeStart : RdkTime;

    private _gr : TimeGr;

     @Input("gr")
     public set gr(value : TimeGr|string){
         if (typeof value === 'string') {
             value = TimeGr[value];
         }
         this._gr = <TimeGr>value;
     }

    @Input("beginDate") private _beginDate: Time;

    @Input("endDate") private _endDate: Time;

    @Input("limitStart") private _limitStart : string;

    private _limitEnd : string;

    @Input("limitEnd")
    public set limitEnd(value){
        if(value){
            this._limitEnd = value;
            this.endTime_limitEnd = this.caculateLimitEnd();
        }
    }

    @Input("weekStart") private _weekStart: TimeWeekStart | string;

    @Input("grItems") private _grItems: GrItem[];

    @Input("refreshInterval") private _refreshInterval: number;

    @Input("recommendedBegin") private _recommendedBegin: Time;

    @Input("recommendedEnd") private _recommendedEnd: Time;


    @Output() public change = new EventEmitter<any>();

    @Output() public beginDateChange = new EventEmitter<Time>();

    @Output() public endDateChange = new EventEmitter<Time>();

    private _shortCuts : ShortCut[];

    private _selectedShortCut : ShortCut;

    private endTime_limitEnd : string;

    ngOnInit() {
       this.init();
    }

    private init(){
        this._shortCuts = this.shortCuts();
        this.endTime_limitEnd = this.caculateLimitEnd();
    }

    private caculateLimitEnd () :string{
        let item = this._grItems && this._grItems.find( item => item.value == this.timeStart.gr );
        let endTime = this._limitEnd && TimeService.getDate(TimeConvert.convertValue(this._limitEnd,this.timeStart.gr),<TimeGr>this.timeStart.gr);
        if(item && item.span){
           let  calculateTime = RdkRangeTime.calculateLimitEnd(TimeConvert.convertValue(this._beginDate,this.timeStart.gr),item.span,this.timeStart.gr);
            calculateTime = TimeService.getDate(calculateTime,<TimeGr>this.timeStart.gr);
            if(!endTime || (endTime && endTime > calculateTime)){
                endTime = calculateTime;
            }
        }
        return endTime;
    }

    private static  calculateLimitEnd(startDate:Time,span,gr){
        let endTime = new Date(TimeService.format(TimeService.getDate(startDate,gr),'YYYY-MM-DD'));
        endTime.setHours(23);
        endTime.setMinutes(59);
        endTime.setSeconds(59);
        switch (span) {
            case "inday":
                break;
            case "inweek":
                endTime.setDate(endTime.getDate() + 6 - endTime.getDay());
                break;
            case "inmonth":
                endTime.setMonth(endTime.getMonth() + 1);
                endTime.setDate(1);
                endTime.setDate(endTime.getDate() - 1);
                break;
            case "inyear":
                endTime.setMonth(11);
                endTime.setDate(31);
                break;
            default:
                let spanReg = /([\d]+)([a-z]+)?/i;
                span = span.replace(/\s+/g, "");
                let gapArr = spanReg.exec(span);
                endTime = new Date(TimeService.format(TimeService.addDate(endTime, gapArr[1],gapArr[2].toLowerCase()),'YYYY-MM-DD,HH:mm:ss'));
                switch (gapArr[2]) {
                    case "d":
                    case "D":
                        break;
                    case "w":
                    case "W":
                        endTime.setDate(endTime.getDate() - 1 - endTime.getDay());
                        break;
                    case "m":
                    case "M":
                        endTime.setDate(1);
                        endTime.setDate(endTime.getDate() - 1);
                        break;
                    case "y":
                    case "Y":
                        endTime.setMonth(0);
                        endTime.setDate(1);
                        endTime.setDate(endTime.getDate() - 1);
                        break;
                }
        }
        return endTime;
    }

    private  dateChange(key: string, value : Time){
        switch (key){
            case "beginDate":{
                this.beginDateChange.emit(value);
                this.endTime_limitEnd = this.caculateLimitEnd();
                break;
            }
            case "endDate":{
                this.endDateChange.emit(value);
                break;
            }
        }
        this.change.emit({"beginDate":this._beginDate, "endDate":this._endDate});
    }

    private shortCuts():ShortCut[]{
        let item = this._grItems && this._grItems.find( item => item.value == this.timeStart.gr );
        if(item && item.shortCuts &&item.shortCuts.length !=0 ){
            return item.shortCuts;
        }
        return null;
    }


    private grChange(value : TimeGr){
        this.init();
    }

    private changeShortCut(selectedShortCut){
        this._selectedShortCut = selectedShortCut;
        if(this._selectedShortCut.callback){
            let [beginDate,endDate] = this._selectedShortCut.callback.call(this);
            this._endDate = endDate;
            beginDate = TimeConvert.convertValue(beginDate,this.timeStart.gr);
            let limitStart = this._limitStart && TimeConvert.convertValue(this._limitStart,this.timeStart.gr);
            let limitEnd = this._limitEnd && TimeConvert.convertValue(this._limitEnd,this.timeStart.gr);
            if(!((limitStart && beginDate < limitStart) ||(limitEnd && beginDate > limitEnd))){
                this._beginDate = beginDate;
            }
            this.endTime_limitEnd = this.caculateLimitEnd();
        }
    }

}
