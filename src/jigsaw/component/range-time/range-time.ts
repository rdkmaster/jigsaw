import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {AbstractJigsawComponent} from "../core";
import {TimeGr, TimeService, TimeUnit, TimeWeekStart} from "../../service/time.service";
import {GrItem, JigsawTime, Shortcut} from "../time/time";
import {WeekTime} from "../../service/time.types";

@Component({
    selector: 'jigsaw-range-time',
    templateUrl: 'range-time.html',
    styleUrls: ['range-time.scss']
})

export class JigsawRangeTime extends AbstractJigsawComponent implements OnInit {

    @ViewChild("timeStart") private _timeStart: JigsawTime;

    /**
     * @internal
     */
    public _$gr: TimeGr;

    public get gr(): TimeGr | string {
        return this._$gr ? this._$gr : TimeGr.date;
    }

    @Input("gr")
    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        this._$gr = <TimeGr>value;
    }

    /**
     * @internal
     */
    @Input("beginDate") public _$beginDate: WeekTime;

    /**
     * @internal
     */
    @Input("endDate") public _$endDate: WeekTime;

    /**
     * @internal
     */
    public _$limitStart: WeekTime;

    public get limitStart(): WeekTime {
        return this._$limitStart;
    }

    @Input("limitStart")
    public set limitStart(value:WeekTime) {
        if (value) {
            this._$limitStart = value;
        }
    }

    /**
     * @internal
     */
    public _$limitEnd: WeekTime;

    public get limitEnd(): WeekTime {
        return this._$limitEnd;
    }

    @Input("limitEnd")
    public set limitEnd(value:WeekTime) {
        if (value) {
            this._$limitEnd = value;
            this._$endTimeLimitEnd = this._calculateLimitEnd();
        }
    }

    /**
     * @internal
     */
    @Input("weekStart") public _$weekStart: TimeWeekStart | string;

    /**
     * @internal
     */
    @Input("grItems") public _$grItems: GrItem[];

    /**
     * @internal
     */
    @Input("refreshInterval") public _$refreshInterval: number;

    /**
     * @internal
     */
    @Input("recommendedBegin") public _$recommendedBegin: WeekTime;

    /**
     * @internal
     */
    @Input("recommendedEnd") public _$recommendedEnd: WeekTime;


    @Output() public change = new EventEmitter<any>();

    @Output() public beginDateChange = new EventEmitter<WeekTime>();

    @Output() public endDateChange = new EventEmitter<WeekTime>();

    /**
     * @internal
     */
    public _$shortcuts: Shortcut[];

    /**
     * @internal
     */
    public _$endTimeLimitEnd: WeekTime;

    private _startTimeLimitEnd: WeekTime;

    private _startTimeLimitStart: WeekTime;

    ngOnInit() {
        this._init();
    }

    private _init() {
        this._$shortcuts = this._getShortcuts();
        this._$endTimeLimitEnd = this._calculateLimitEnd();
    }

    private _calculateLimitEnd(): WeekTime {
        let item: GrItem = this._$grItems && this._$grItems.find(item => item.value == this._timeStart.gr);
        let endTime: WeekTime = this._$limitEnd && TimeService.getDate(TimeService.convertValue(this._$limitEnd, <TimeGr>this._timeStart.gr), <TimeGr>this._timeStart.gr);
        if (item && item.span) {
            let calculateTime: WeekTime = JigsawRangeTime._calculateLimitEnd(TimeService.convertValue(this._$beginDate, <TimeGr>this._timeStart.gr), item.span, <TimeGr>this._timeStart.gr);
            calculateTime = TimeService.getDate(calculateTime, <TimeGr>this._timeStart.gr);
            if (!endTime || endTime > calculateTime) {
                endTime = calculateTime;
            }
        }
        return endTime;
    }

    private static  _calculateLimitEnd(startDate: string, span:string, gr:TimeGr): Date {
        let endTime: Date = new Date(TimeService.format(TimeService.getDate(startDate, gr), 'YYYY-MM-DD'));
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
                let spanReg: RegExp = /([\d]+)([a-z]+)?/i;
                span = span.replace(/\s+/g, "");
                let gapArr: string[] = spanReg.exec(span);
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

    /**
     * @internal
     */
    public _$dateChange(key: string, value: WeekTime) {
        switch (key) {
            case "beginDate": {
                this.beginDateChange.emit(value);
                this._$endTimeLimitEnd = this._calculateLimitEnd();
                this._startTimeLimitEnd = value;
                break;
            }
            case "endDate": {
                this.endDateChange.emit(value);
                break;
            }
        }
        this.change.emit({"beginDate": this._$beginDate, "endDate": this._$endDate});
    }

    private _getShortcuts(): Shortcut[] {
        let item: GrItem = this._$grItems && this._$grItems.find(item => item.value == this._timeStart.gr);
        if (item && item.shortcuts && item.shortcuts.length != 0) {
            return item.shortcuts;
        }
        return null;
    }

    /**
     * @internal
     */
    public _$grChange(value: TimeGr) {
        this._init();
    }

    private _changeShortcut(selectedShortcut : Shortcut) {
        if (selectedShortcut.dateRange) {
            let [beginDate, endDate] = typeof  selectedShortcut.dateRange === "function" ? selectedShortcut.dateRange.call(this) : selectedShortcut.dateRange;

            beginDate = TimeService.convertValue(beginDate, <TimeGr>this._timeStart.gr);
            let limitStart = this._$limitStart && TimeService.convertValue(this._$limitStart, <TimeGr>this._timeStart.gr);
            let limitEnd = this._$limitEnd && TimeService.convertValue(this._$limitEnd, <TimeGr>this._timeStart.gr);
            if (!((limitStart && beginDate < limitStart) || (limitEnd && beginDate > limitEnd))) {
                this._$beginDate = beginDate;
            } else {
                this._$beginDate = limitStart;
            }

            this._$endTimeLimitEnd = this._calculateLimitEnd();

            setTimeout(() => {
                //先设置好limit，再设置date
                this._$endDate = endDate;
            }, 0)
        }
    }

}
