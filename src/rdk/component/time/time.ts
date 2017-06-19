import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2} from "@angular/core";
import {AbstractRDKComponent} from "../core";
import {TimeGr, TimeService, TimeUnit, TimeWeekStart} from "../../service/time.service";
import {PopupInfo, PopupPositionType, PopupService} from "../../service/popup.service";
import {SimpleTooltipComponent} from "../tooltip/tooltip";
import {Time, WeekTime} from "../../service/time.types";


export type TimeShortcutFunction = () => [WeekTime, WeekTime]

export type Shortcut = {
    label: string,
    dateRange: [WeekTime, WeekTime] | TimeShortcutFunction;
}

export type GrItem = {
    label: string,
    value: TimeGr,
    span?: string,
    shortcuts?: Shortcut[];
}


@Component({
    selector: 'rdk-time',
    templateUrl: 'time.html',
    styleUrls: ['time.scss'],
    host: {
        '[style.width]': 'width'
    }
})

export class RdkTime extends AbstractRDKComponent implements OnInit, OnDestroy {

    @Output() public grChange = new EventEmitter<TimeGr>();

    private _gr: TimeGr;

    public get gr(): TimeGr | string {
        return (this._gr || this._gr === TimeGr.second) ? this._gr : TimeGr.date;
    }

    //粒度
    @Input()
    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if (<TimeGr>value != this._gr) {
            this._gr = <TimeGr>value;
            this._value = TimeService.getFormatDate(this._value, this._gr);
            if (this._timepicker) {
                this._initDatePicker();
            }
        }
    }

    private _value: Time;

    //组件暴露出去的时间数值，支持双向绑定
    @Input()
    public get date(): WeekTime {
        return this._value ? this._value : TimeService.convertValue(new Date(), <TimeGr>this.gr);
    }

    public set date(newValue: WeekTime) {
        if (newValue) {
            newValue = TimeService.convertValue(newValue, <TimeGr>this.gr);
            if (newValue != this._value) {
                if (this._value && this.gr == TimeGr.week) {
                    let newValueYear = TimeService.getYear(<string>newValue);
                    let valueYear = TimeService.getYear(<string>this._value);
                    let newValueWeek = TimeService.getWeekOfYear(<string>newValue);
                    let valueWeek = TimeService.getWeekOfYear(<string>this._value);
                    if (newValueYear == valueYear && newValueWeek == valueWeek) return;
                }
                let [value,] = this._handleValue(newValue);
                this._value = value;
                this._setDate(this._value);
            }
        }
    }


    @Output() public dateChange = new EventEmitter<WeekTime>();

    private _limitEnd: Time;

    public get limitEnd(): Time {
        return this._limitEnd && TimeService.convertValue(this._limitEnd, <TimeGr>this.gr)
    }

    @Input()
    public set limitEnd(value: Time) {
        if (value) {
            this._limitEnd = value;
            this._checkMacro();
            if (this._timepicker) {
                if(this._timepicker.minDate() && this._timepicker.minDate() > TimeService.getDate(this.limitEnd, <TimeGr>this.gr)){
                    this._timepicker.minDate(this.limitEnd)
                }
                this._timepicker.maxDate(this.limitEnd);
                this._weekHandle();
                this._handleRecommended(this._el.nativeElement, this._popService);
            }
        }
    }


    private _limitStart: Time;

    public get limitStart(): Time {
        return this._limitStart && TimeService.convertValue(this._limitStart, <TimeGr>this.gr);
    }

    @Input()
    public set limitStart(value: Time) {
        if (value) {
            this._limitStart = value;
            this._checkMacro();
            if (this._timepicker) {
                if(this._timepicker.maxDate() && this._timepicker.maxDate() < TimeService.getDate(this.limitStart, <TimeGr>this.gr)){
                    this._timepicker.maxDate(this.limitStart)
                }
                this._timepicker.minDate(this.limitStart);
                this._weekHandle();
                this._handleRecommended(this._el.nativeElement, this._popService);
            }
        }
    }


    //时间刷新的间隔毫秒数，主要针对startDate或endDate设置为now或now-2h等需要不时刷新的场景
    //@Input("refreshInterval") private _refreshInterval: number;
    private _refreshInterval: number;
    @Input()
    public set refreshInterval(value: number) {
        if (value || value == 0) {
            this._refreshInterval = value;
            this._checkMacro();
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
                this._initDatePicker();
                this._handleRecommended(this._el.nativeElement, this._popService);
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

    constructor(private _el: ElementRef, private _renderer: Renderer2, private _popService: PopupService) {
        super();
        this._refreshInterval = 0;
        this.weekStart = TimeWeekStart.sun;
    }

    ngOnInit() {
        this._initDatePicker();
        this._checkMacro();

    }

    ngOnDestroy() {
        this._destroyPicker();
    }

    private _destroyPicker() {
        if (this._timepicker) {
            this._timepicker.destroy();
        }
    }

    private _initDatePicker() {
        let insert = this._el.nativeElement.querySelector(".rdk-time-box");
        TimeService.setWeekStart(this._weekStart);
        let [result, isChange] = this._handleValue(<Time>this.date);
        if (isChange) {
            this._value = result;
        }
        this._destroyPicker();
        $(insert).datetimepicker({
            inline: true,
            defaultDate: TimeService.getDate(<string>this.date, <TimeGr>this.gr),
            format: TimeService.getFormatter(<TimeGr>this.gr),
            minDate: this._limitStart && TimeService.getDate(<string>this.limitStart, <TimeGr>this.gr),
            maxDate: this._limitEnd && TimeService.getDate(<string>this.limitEnd, <TimeGr>this.gr)
        }).on("dp.change", (e) => {
            let changeValue = TimeService.getFormatDate(e.date, <TimeGr>this.gr);
            if (this.date != changeValue) {
                this._handleValueChange(changeValue, <TimeGr>this.gr);
            }
        });
        this._timepicker = $(insert).data("DateTimePicker");
        this._handleValueChange(<Time>this.date, <TimeGr>this.gr, true);
    }

    //设置插件选中时间值
    private _setDate(value: Time) {
        if (this._timepicker) {
            this._timepicker.date(TimeService.getFormatDate(value));
            this._handleValueChange(<Time>this.date, <TimeGr>this.gr);
            this._weekHandle();
            this._handleRecommended(this._el.nativeElement, this._popService);
        }
    }

    private _changeGranularity(select: GrItem) {
        this.gr = select.value;
        this.grChange.emit(this.gr);
    }

    private _checkMacro() {
        if (this._intervalId) {
            window.clearInterval(this._intervalId);
        }
        if ((TimeService.isMacro(<string>this._limitStart) || TimeService.isMacro(<string>this._limitEnd)) && this._refreshInterval != 0) {
            this._intervalId = window.setInterval(() => {
                this._handleLimitStartAndEnd();
            }, this._refreshInterval);
        }
    }

    private _handleLimitStartAndEnd() {
        if (this._timepicker) {
            this._limitStart && this._timepicker.minDate(TimeService.addDate(<string>this.limitStart, -1, TimeUnit.s));
            this._limitEnd && this._timepicker.maxDate(TimeService.addDate(<string>this.limitEnd, 1, TimeUnit.s));
            this._weekHandle();
            this._handleRecommended(this._el.nativeElement, this._popService);
        }
    }

    private _weekHandle() {
        if (this.gr == TimeGr.week) {
            this._handleWeekSelect();
        }
    }

    private _handleValueChange(changeValue :Time, gr:TimeGr, emit?:boolean) {
        if (this.date != changeValue || emit) {
            this._value = changeValue;
            setTimeout(() => {
                if (gr != TimeGr.week) {
                    this.dateChange.emit(this._value);
                } else {
                    this.dateChange.emit(this._handleWeekSelect());
                }
            }, 0);
            this._handleRecommended(this._el.nativeElement, this._popService);
        }
    }

    private _handleValue(value:Time): [Time, boolean] {
        if (this._limitStart && value < this.limitStart) {
            return [this.limitStart, true];
        }
        if (this._limitEnd && value > this.limitEnd) {
            return [this.limitEnd, true];
        }
        return [value, false];
    }

    private _handleWeekSelect() {
        let weekNum = TimeService.getWeekOfYear(<string>this.date);
        let year = TimeService.getYear(<string>this.date);
        let trNode = this._el.nativeElement.querySelector(".rdk-time-box .datepicker .datepicker-days>table>tbody>tr>td.active").parentNode;
        trNode.classList.add("active");
        return {year: year, week: weekNum};
    }

    private _tooltipInfo: PopupInfo;

    private  _handleRecommended(nativeElement:any, popService:PopupService) {
        if (this._recommendedBegin && this._recommendedEnd) {
            this._recommendedBegin = TimeService.getFormatDate(this._recommendedBegin);
            this._recommendedEnd = TimeService.getFormatDate(this._recommendedEnd);
            if (TimeService.getYear(<string>this._recommendedBegin) != TimeService.getYear(<string>this._recommendedEnd)) { //不支持跨年设置
                throw "recommended not support different year times!";
            }
            const monthsNode :HTMLElement = RdkTime._getDataPickerNode("months", nativeElement);
            const monthsHeadNode : HTMLElement = RdkTime._getDataPickerNode("months", nativeElement, true);
            RdkTime._searchDateForMonth(this._recommendedBegin, this._recommendedEnd, monthsNode, monthsHeadNode);
            const daysNode = RdkTime._getDataPickerNode("days", nativeElement);
            const daysHeadNode :HTMLElement = RdkTime._getDataPickerNode("days", nativeElement, true);
            const daysObj = RdkTime._parseDay(daysHeadNode.innerText);
            RdkTime._searchDateForDay(this._recommendedBegin, this._recommendedEnd, daysNode, daysObj);
            nativeElement.querySelectorAll(".rdk-time-box .datepicker .expect-day").forEach(node => {

                // #239 移除已经注册的事件. 点击事件会触发此操作, 造成重复注册事件. 引起tooltips 不能销毁.
                node.removeEventListener("mouseenter");
                node.removeEventListener("mouseleave");

                this._renderer.listen(node, "mouseenter", (event) => {
                    if (this._tooltipInfo) {
                        this._tooltipInfo.dispose();
                        this._tooltipInfo = null;
                    }
                    this._tooltipInfo = popService.popup(SimpleTooltipComponent, {
                        modal: false, //是否模态
                        pos: {x: $(event.currentTarget).offset().left, y: $(event.currentTarget).offset().top},
                        posOffset: { //偏移位置
                            top: -40,
                            left: 0
                        },
                        posType: PopupPositionType.absolute, //定位类型
                    }, {
                        message: "Recommended"
                    });
                });
                this._renderer.listen(node, "mouseleave", () => {
                    if (this._tooltipInfo) {
                        this._tooltipInfo.dispose();
                        this._tooltipInfo = null;
                    }
                })
            });
        }
    }

    private static _searchDateForDay(begin:Time, end:Time, sourceNodes:HTMLElement[], headObj:any) {
        const startMonth = TimeService.getMonth(begin);
        const endMonth = TimeService.getMonth(end);

        const startDate = TimeService.getDay(begin);
        const endDate = TimeService.getDay(end);

        if (TimeService.getYear(begin) == headObj.year &&
            (startMonth == headObj.month || endMonth == headObj.month)) {
            sourceNodes.forEach(node => {
                const text = +node.innerText;
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

    private static _parseDay(val:string) {
        const charToNum = {一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10, 十一: 11, 十二: 12};
        const enUsToNum = {
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
            const valArr = val.split(/\s+/);
            result["month"] = +enUsToNum[valArr[0]];
            result["year"] = +valArr[1];
        } else {
            const valArr = val.split("月");
            result["month"] = charToNum[valArr[0].trim()];
            result["year"] = +(valArr[1].trim());
        }
        return result;
    }

    private static _parseMonth(val:string) {
        const enUsSimpleToNum = {
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

    private static _searchDateForMonth(begin:Time, end:Time, sourceNodes:any, headNode:any) {
        const startMonth = TimeService.getMonth(begin);
        const endMonth = TimeService.getMonth(end);
        if (TimeService.getYear(begin) == headNode.innerText) {
            sourceNodes.forEach(node => {
                if (!node.classList.contains("disabled")) {
                    const month = RdkTime._parseMonth(node.innerText);
                    if (month >= startMonth && month <= endMonth) {
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

    private static _getDataPickerNode(granularity:string, nativeElement:any, isHead?:boolean) {
        const selectorBefore : string = ".rdk-time-box .datepicker .datepicker-";
        const selectorAfter :string = ">table>tbody>tr>";
        let nodeName = "";
        if (granularity == "years" || granularity == "months") {
            nodeName = "td>span:not(.disabled)";
        } else {
            nodeName = "td:not(.disabled)";
        }
        let selector = selectorBefore + granularity + selectorAfter + nodeName;
        if (!!isHead) {
            const theadNode = ">table>thead>tr>th.picker-switch[colspan]";
            selector = selectorBefore + granularity + theadNode;
            return nativeElement.querySelector(selector);
        }
        return nativeElement.querySelectorAll(selector);
    }

}
