import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {AbstractRDKComponent} from "../core";
import {TimeGr, TimeService, TimeUnit, TimeWeekStart} from "../../service/time.service";
import {GrItem, RdkTime, ShortCut, TimeConvert} from "../time/time";
import {WeekTime} from "../../service/time.types";



@Component({
    selector: 'rdk-range-time',
    templateUrl: 'range-time.html',
    styleUrls: ['range-time.scss']
})

export class RdkRangeTime extends AbstractRDKComponent implements OnInit {

    @ViewChild("timeStart") private timeStart: RdkTime;

    private _gr: TimeGr;

    public get gr() : TimeGr|string{
        return this._gr ? this._gr :TimeGr.date;
    }

    @Input("gr")
    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        this._gr = <TimeGr>value;
    }

    @Input("beginDate") private _beginDate: WeekTime;

    @Input("endDate") private _endDate: WeekTime;

    private _limitStart: WeekTime;

    public get limitStart():WeekTime{
        return this._limitStart;
    }

    @Input("limitStart")
    public set limitStart(value) {
        if (value) {
            this._limitStart = value;
            this._startTimeLimitStart = value;
        }
    }

    private _limitEnd: string;

    public get limitEnd():string{
        return this._limitEnd;
    }

    @Input("limitEnd")
    public set limitEnd(value) {
        if (value) {
            this._limitEnd = value;
            this._endTimeLimitEnd = this.caculateLimitEnd();
        }
    }

    @Input("weekStart") private _weekStart: TimeWeekStart | string;

    @Input("grItems") private _grItems: GrItem[];

    @Input("refreshInterval") private _refreshInterval: number;

    @Input("recommendedBegin") private _recommendedBegin: WeekTime;

    @Input("recommendedEnd") private _recommendedEnd: WeekTime;


    @Output() public change = new EventEmitter<any>();

    @Output() public beginDateChange = new EventEmitter<WeekTime>();

    @Output() public endDateChange = new EventEmitter<WeekTime>();

    private _shortCuts: ShortCut[];

    //private _selectedShortCut: ShortCut;

    private _endTimeLimitEnd: WeekTime;

    private _startTimeLimitEnd: WeekTime;

    private _startTimeLimitStart: WeekTime;

    ngOnInit() {
        this.init();
    }

    private init() {
        this._shortCuts = this.shortCuts();
        this._endTimeLimitEnd = this.caculateLimitEnd();
    }

    private caculateLimitEnd(): WeekTime {
        let item : GrItem = this._grItems && this._grItems.find(item => item.value == this.timeStart.gr);
        let endTime :WeekTime = this._limitEnd && TimeService.getDate(TimeConvert.convertValue(this._limitEnd, this.timeStart.gr), <TimeGr>this.timeStart.gr);
        if (item && item.span) {
            let calculateTime : WeekTime= RdkRangeTime.calculateLimitEnd(TimeConvert.convertValue(this._beginDate, this.timeStart.gr), item.span, this.timeStart.gr);
            calculateTime = TimeService.getDate(calculateTime, <TimeGr>this.timeStart.gr);
            if (!endTime ||  endTime > calculateTime) {
                endTime = calculateTime;
            }
        }
        return endTime;
    }

    private static  calculateLimitEnd(startDate: string, span, gr) :Date{
        let endTime : Date= new Date(TimeService.format(TimeService.getDate(startDate, gr), 'YYYY-MM-DD'));
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
                let spanReg : RegExp= /([\d]+)([a-z]+)?/i;
                span = span.replace(/\s+/g, "");
                let gapArr : string[] = spanReg.exec(span);
                endTime = new Date(TimeService.format(TimeService.addDate(endTime, gapArr[1], TimeUnit[gapArr[2].toLowerCase()]), 'YYYY-MM-DD,HH:mm:ss'));
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

    private  dateChange(key: string, value: WeekTime) {
        switch (key) {
            case "beginDate": {
                this.beginDateChange.emit(value);
                this._endTimeLimitEnd = this.caculateLimitEnd();
                this._startTimeLimitEnd = value;
                break;
            }
            case "endDate": {
                this.endDateChange.emit(value);
                break;
            }
        }
        this.change.emit({"beginDate": this._beginDate, "endDate": this._endDate});
    }

    private shortCuts(): ShortCut[] {
        let item :GrItem = this._grItems && this._grItems.find(item => item.value == this.timeStart.gr);
        if (item && item.shortCuts && item.shortCuts.length != 0) {
            return item.shortCuts;
        }
        return null;
    }


    private grChange(value: TimeGr) {
        this.init();
    }

    private changeShortCut(selectedShortCut) {
        if (selectedShortCut.dateRange) {
            let [beginDate, endDate] =typeof  selectedShortCut.dateRange === "function"? selectedShortCut.dateRange.call(this):selectedShortCut.dateRange;
            this._endDate = endDate;
            this._endTimeLimitEnd = this.caculateLimitEnd();
            beginDate = TimeConvert.convertValue(beginDate, this.timeStart.gr);
            let limitStart = this._limitStart && TimeConvert.convertValue(this._limitStart, this.timeStart.gr);
            let limitEnd = this._limitEnd && TimeConvert.convertValue(this._limitEnd, this.timeStart.gr);
            if (!((limitStart && beginDate < limitStart) || (limitEnd && beginDate > limitEnd))) {
                this._beginDate = beginDate;
                this._startTimeLimitStart = beginDate
            }else{
                this._startTimeLimitStart = limitStart
            }

        }
    }

}
