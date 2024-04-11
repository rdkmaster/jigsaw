import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    HostListener,
    Injector,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {GrItem, MarkDate, Shortcut} from "./date-picker";
import {CommonModule} from '@angular/common';
import {TimeGr, TimeService, TimeUnit, TimeWeekStart} from "../../common/service/time.service";
import {Time, WeekTime} from "../../common/service/time.types";
import {JigsawDateTimePicker, JigsawDateTimePickerModule} from "./date-time-picker";
import {TimeStep} from "./time-picker";
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {CommonUtils} from "../../common/core/utils/common-utils";

declare const moment: any;

/**
 * 用于在界面上提供一个时间范围选择，支持多种时间粒度切换，支持年月日时分秒及其各种组合，
 * 通过切换不同的粒度，可以控制时刻选择器只能选到年月日时分秒中的任何一段
 * 如下是关于时间的一些常见的场景及其建议：
 *
 * - 如果需要选择的是一个时刻，则请使用`JigsawDateTimePicker`；
 * - 如果需要选择的是一个时分秒，不带日期，则请使用`JigsawTimePicker`；
 * - 如果你需要的是一个日历的功能，那请参考[这个demo](/#/components/table-renderer?demo=table-renderer-calendar)，通过表格+渲染器的方式来模拟；
 * - 时间选择器常常是收纳到下拉框中以解决视图空间，则请使用 `JigsawDateTimeSelect` 和 `JigsawRangeDateTimeSelect`，
 * 参考[这个demo](/#/components/range-date-time-picker?demo=range-date-time-picker-range-date-time-select)；
 *
 * 时间控件是对表单友好的，你可以给时间控件编写表单校验器。
 */
@WingsTheme('range-date-time-picker.scss')
@Component({
    selector: 'jigsaw-range-date-time-picker, j-range-date-time-picker, jigsaw-range-time, j-range-time',
    templateUrl: './range-date-time-picker.html',
    host: {
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-range-date-time-picker-host]': 'true',
        '[class.jigsaw-range-date-time-picker-error]': '!valid',
        '[class.jigsaw-range-date-time-picker-disabled]': 'disabled'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRangeDateTimePicker), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawRangeDateTimePicker extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, OnDestroy {
    constructor(protected _zone: NgZone, private _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super(_zone);
        this._removeUpdateValueSubscriber = this._updateValue.pipe(debounceTime(100)).subscribe(() => {
            if (!this.beginDate || !this.endDate || this.endDate < this.beginDate ||
                this.endDate > TimeService.getDateByGr(this._$endTimeLimitEnd, this._$gr)) return;
            this.writeValue({beginDate: this.beginDate, endDate: this.endDate});
            this._propagateChange({beginDate: this.beginDate, endDate: this.endDate});
        })
    }

    /**
     * 参考`JigsawDateTimePicker.disabled`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-time-picker/disabled
     */
    @Input()
    public disabled: boolean;

    /**
     * 参考`JigsawDateTimePicker.valid`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = date-time-picker/valid
     */
    @Input()
    public valid: boolean = true;

    /**
     * @internal
     */
    public _$gr: TimeGr = TimeGr.date;

    /**
     * 参考`JigsawDateTimePicker.gr`
     * $demo = range-date-time-picker/gr
     */
    @Input("gr")
    @RequireMarkForCheck()
    public get gr(): TimeGr | string {
        return (this._$gr || this._$gr === 0) ? this._$gr : TimeGr.date;
    }

    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if (<TimeGr>value != this._$gr) {
            this._$gr = <TimeGr>value;
            this.grChange.emit(this._$gr);
        }
        this._limitSpanValue = this._parseLimitSpanValue(this.limitSpan);
    }

    /**
     * 参考`JigsawDateTimePicker.grChange`
     * $demo = range-date-time-picker/gr
     */
    @Output()
    public grChange = new EventEmitter<TimeGr>();

    /**
     * @internal
     */
    public _$dateChange(key: string, value: WeekTime) {
        if (key == 'beginDate') {
            this._beginDate = value;
            this._updateEndDateLimit();
        } else if (key == 'endDate') {
            this._endDate = value;
            this._updateBeginDateLimit();
        }
        this._updateValue.emit();
        this._cdr.markForCheck();
    }

    private _beginDate: WeekTime;

    /**
     * 时间段的开始时刻，在双绑模式下，更新这个值可以让时间控件选中对应的时刻。
     * $demo = range-date-time-picker/basic
     */
    @RequireMarkForCheck()
    @Input()
    public get beginDate(): WeekTime {
        return this._beginDate;
    }

    public set beginDate(value: WeekTime) {
        if (!value || value == this._beginDate) {
            return;
        }
        if (this.initialized) {
            let date = TimeService.getDateByGr(value, this._$gr);
            if (date == this._beginDate) {
                return;
            }
            this._beginDate = date;
            this._updateEndDateLimit();
            this._updateValue.emit();
        } else {
            this._beginDate = value;
        }
    }

    private _endDate: WeekTime;

    /**
     * 时间段的结束时刻，在双绑模式下，更新这个值可以让时间控件选中对应的时刻。
     * $demo = range-date-time-picker/basic
     */
    @RequireMarkForCheck()
    @Input()
    public get endDate(): WeekTime {
        return this._endDate;
    }

    public set endDate(value: WeekTime) {
        if (!value || value == this._endDate) return;
        if (this.initialized) {
            let date = TimeService.getDateByGr(value, this._$gr);
            if (date == this._endDate) return;
            this._endDate = date;
            this._updateBeginDateLimit();
            this._updateValue.emit();
        } else {
            this._endDate = value;
        }
    }

    /**
     * @internal
     */
    public _$beginDateLimitStart: WeekTime;

    /**
     * @internal
     */
    public _$beginDateLimitEnd: WeekTime;

    /**
     * @internal
     */
    public _$endDateLimitStart: WeekTime;

    /**
     * @internal
     */
    public _$endDateLimitEnd: WeekTime;

    /**
     * @internal
     */
    public _$limitStart: WeekTime;

    /**
     * 参考`JigsawDateTimePicker.limitStart`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = range-date-time-picker/limit
     */
    @Input()
    public get limitStart(): WeekTime {
        return this._$limitStart;
    }

    public set limitStart(value: WeekTime) {
        if (value) {
            this._$limitStart = value;
        } else {
            this._$limitStart = null;
        }
        if (this.initialized) {
            this._updateLimits();
        }
    }

    /**
     * @internal
     */
    public _$limitEnd: WeekTime;

    /**
     * 参考`JigsawDateTimePicker.limitEnd`
     *
     * @NoMarkForCheckRequired
     *
     * $demo = range-date-time-picker/limit
     */
    @Input()
    public get limitEnd(): WeekTime {
        return this._$limitEnd;
    }

    public set limitEnd(value: WeekTime) {
        if (value) {
            this._$limitEnd = value;
        } else {
            this._$limitEnd = null;
        }
        if (this.initialized){
            this._updateLimits();
        }
    }

    private _limitSpanValue: {value: number, unit: TimeUnit};
    private _limitSpan: number | string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get limitSpan(): number | string {
        return this._limitSpan;
    }

    public set limitSpan(value: number | string) {
        this._limitSpan = value;
        this._limitSpanValue = this._parseLimitSpanValue(value);
        if (this.initialized) {
            this._updateLimits();
        }
    }

    private _updateLimits() {
        this._updateBeginDateLimit();
        this._updateEndDateLimit();
    }

    private _calcStartAndEndTime(): {startTime: WeekTime, endTime: WeekTime} {
        let startTime: WeekTime = null;
        let endTime: WeekTime = null;
        if (this._$limitStart) {
            startTime = TimeService.getDate(TimeService.convertValue(this._$limitStart, this._$gr), this._$gr);
        }
        if (this._$limitEnd) {
            endTime = TimeService.getDate(TimeService.convertValue(this._$limitEnd, this._$gr), this._$gr);
        }
        return {startTime, endTime};
    }

    private _updateBeginDateLimit() {
        let {startTime, endTime} = this._calcStartAndEndTime();

        if (this.endDate) {
            if (this._limitSpanValue?.value >= 0) {
                const number = this._limitSpanValue.value;
                const unit = this._limitSpanValue.unit;
                const calcStartTime = number == 0 ? TimeService.getDate(TimeService.convertValue(this.endDate, this._$gr), this._$gr)
                    : TimeService.addDate(TimeService.convertValue(this.endDate, this._$gr), 0 - number, unit);
                startTime = startTime ? (startTime < calcStartTime ? calcStartTime : startTime) : calcStartTime;
            }

            let calcEndTime = TimeService.getDate(TimeService.convertValue(this.endDate, this._$gr), this._$gr);
            if (this._$gr == TimeGr.week) {
                calcEndTime = TimeService.addDate(calcEndTime, 6, TimeUnit.d);
            }
            endTime = endTime ? (endTime > calcEndTime ? calcEndTime : endTime) : calcEndTime;
        }

        if (this._$beginDateLimitStart != startTime) {
            this._$beginDateLimitStart = startTime;
        }
        if (this._$beginDateLimitEnd != endTime) {
            this._$beginDateLimitEnd = endTime;
        }
    }

    private _updateEndDateLimit() {
        let {startTime, endTime} = this._calcStartAndEndTime();

        if (this.beginDate) {
            let calcStartTime = TimeService.getDate(TimeService.convertValue(this.beginDate, this._$gr), this._$gr)
            if (!startTime || startTime < calcStartTime) {
                startTime = calcStartTime;
            }

            if (this._limitSpanValue?.value >= 0) {
                const number = this._limitSpanValue.value;
                const unit = this._limitSpanValue.unit;
                let calcEndTime = number == 0 ? TimeService.getDate(TimeService.convertValue(this.beginDate, this._$gr), this._$gr)
                    : TimeService.addDate(TimeService.convertValue(this.beginDate, this._$gr), number, unit);
                if (this._$gr == TimeGr.week) {
                    calcEndTime = TimeService.addDate(calcEndTime, 6, TimeUnit.d);
                }
                endTime = endTime ? (endTime > calcEndTime ? calcEndTime : endTime) : calcEndTime;
            }
        }

        if (this._$endDateLimitStart != startTime) {
            this._$endDateLimitStart = startTime;
        }
        if (this._$endDateLimitEnd != endTime) {
            this._$endDateLimitEnd = endTime;
        }
    }

    private _parseLimitSpanValue(limitSpan: number | string): {value: number, unit: TimeUnit} {
        const unit = TimeService.getUnitByGr(this._$gr);
        if (CommonUtils.isUndefined(limitSpan)) {
            return { value: -1, unit };
        }
        if (typeof limitSpan == 'number') {
            return {value: limitSpan, unit};
        }
        const match = String(limitSpan).match(/^(\d+)\s*([smhdwMy])$/);
        if (!match) {
            return {value: Number(limitSpan), unit};
        }
        const number = parseInt(match[1]);
        const newUnit = match[2];
        return {value: TimeService.convertTimeUnit(number, TimeUnit[newUnit], unit), unit};
    }

    /**
     * 参考`JigsawDateTimePicker.grItems`
     * $demo = range-date-time-picker/gr-items
     */
    @Input()
    @RequireMarkForCheck()
    public grItems: GrItem[];

    /**
     * 对选定的日期做标记，用于提示用户这些日期具有特定含义
     * $demo = date-time-picker/mark
     */
    @Input()
    @RequireMarkForCheck()
    public markDates: MarkDate[];

    /**
     * 分钟、秒钟选择面板的默认有60个数字可以挑选，显得比较凌乱，你可以设置此值为5/10来减少面板上的可选项
     *
     * @NoMarkForCheckRequired
     *
     * $demo = range-date-time-picker/step
     */
    @Input()
    public step: TimeStep;

    private _weekStart: TimeWeekStart;

    /**
     * 设置周开始日期，可选值 sun mon tue wed thu fri sat。
     * $demo = range-date-time-picker/week-start
     */
    @Input()
    @RequireMarkForCheck()
    public get weekStart(): string | TimeWeekStart {
        return this._weekStart;
    }

    public set weekStart(value: string | TimeWeekStart) {
        if (CommonUtils.isUndefined(value)) return;
        if (typeof value === 'string') {
            this._weekStart = TimeWeekStart[value];
        } else {
            this._weekStart = value;
        }
        // weekStart/janX必须预先设置好，用于初始化之后的计算
        TimeService.setWeekStart(this._weekStart);
    }

    private _firstWeekMustContains: number;

    /**
     * 设置一年的第一周要包含一月几号
     * $demo = range-date-time-picker/week-start
     */
    @Input()
    @RequireMarkForCheck()
    public get firstWeekMustContains(): number {
        return this._firstWeekMustContains;
    }

    public set firstWeekMustContains(value: number) {
        if (CommonUtils.isUndefined(value)) return;
        value = isNaN(value) || Number(value) < 1 ? 1 : Number(value);
        this._firstWeekMustContains = value;
        // weekStart/janX必须预先设置好，用于初始化之后的计算
        TimeService.setFirstWeekOfYear(this._firstWeekMustContains);
    }

    /**
     * 是否显示确认按钮
     * @NoMarkForCheckRequired
     */
    @Input()
    public showConfirmButton: boolean = false;

    /**
     * 当用户选择时间时，Jigsaw发出此事件。
     * $demo = date-time-picker/date-time-select
     */
    @Output()
    public change = new EventEmitter<any>();

    /**
     * 当开始时间被用户切换之后，Jigsaw会发出此事件。
     * $demo = range-date-time-picker/basic
     */
    @Output()
    public beginDateChange = new EventEmitter<WeekTime>();

    /**
     * 当结束时间被用户切换之后，Jigsaw会发出此事件。
     * $demo = range-date-time-picker/basic
     */
    @Output()
    public endDateChange = new EventEmitter<WeekTime>();

    private _updateValue = new EventEmitter();
    private _removeUpdateValueSubscriber: Subscription;

    /**
     * @internal
     */
    public _$shortcuts: Shortcut[];

    /**
     * @internal
     */
    public _$endTimeLimitEnd: WeekTime;

    private _init() {
        let isUpdate = false;
        if (this._beginDate) {
            let date = TimeService.getDateByGr(this._beginDate, this._$gr);
            if (date != this._beginDate) {
                this._beginDate = date;
                isUpdate = true;
            }
        }
        if (this._endDate) {
            let date = TimeService.getDateByGr(this._endDate, this._$gr);
            if (date != this._endDate) {
                this._endDate = date;
                isUpdate = true;
            }
        }
        this._$shortcuts = this._getShortcuts();
        this._updateLimits();

        if (this._endDate < this._beginDate) {
            this._endDate = this._beginDate;
            isUpdate = true;
        }
        if (this._endDate > TimeService.getDateByGr(this._$endTimeLimitEnd, this._$gr)) {
            this._endDate = TimeService.getDateByGr(this._$endTimeLimitEnd, this._$gr);
            isUpdate = true;
        }

        if (isUpdate) {
            this._updateValue.emit();
        }

        this._cdr.markForCheck();
    }

    private _getShortcuts(): Shortcut[] {
        let item: GrItem = this.grItems && this.grItems.find(item => item.value == this._$gr);
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
        this.grChange.emit(value);
        this._cdr.markForCheck();
        this._$selectedShortcutLabel = "";
    }

    /**
     * @internal
     */
    public _$selectedShortcutLabel: string;

    /**
     * @internal
     */
    public _changeShortcut(selectedShortcut: Shortcut): void {
        if (!selectedShortcut.dateRange) {
            return;
        }
        let [beginDate, endDate] = typeof selectedShortcut.dateRange === "function" ?
            selectedShortcut.dateRange.call(this) : selectedShortcut.dateRange;
        beginDate = TimeService.convertValue(beginDate, this._$gr);
        endDate = TimeService.convertValue(endDate, this._$gr);
        const limitStart = this._$beginDateLimitStart && TimeService.convertValue(this._$beginDateLimitStart, this._$gr);
        const limitEnd = this._$endTimeLimitEnd && TimeService.convertValue(this._$endTimeLimitEnd, this._$gr);
        this._beginDate = beginDate < limitStart ? limitStart : beginDate;
        this._endDate = endDate > limitEnd ? limitEnd : endDate;
        this._$selectedShortcutLabel = selectedShortcut.label;
        this._updateValue.emit();
        this._cdr.markForCheck();
    }

    /**
     * @internal
     */
    @ViewChild('timeStart')
    public _$timeStart: JigsawDateTimePicker;

    /**
     * @internal
     */
    @ViewChild('timeEnd')
    public _$timeEnd: JigsawDateTimePicker;

    /**
     * @internal
     */
    public _$updateBeginDate() {
        if (!this.showConfirmButton || !this._$timeStart) {
            return;
        }
        // 当配置了确认按钮时，如果只改变了开始时间，没有改变结束时间，此时点击确认按钮，需要通知开始时间的更新
        this._$timeStart._$handleDateChange(true);
        this._$timeStart._$handleTimeChange(true);
    }

    public writeValue(value: any): void {
        if (!value) {
            return;
        }
        this.beginDateChange.emit(value.beginDate);
        this.endDateChange.emit(value.endDate);
        this.change.emit(value);
    }

    private _propagateChange: any = () => {
    };
    private _onTouched: any = () => {
    };

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this._onTouched();
    }

    @HostListener('click')
    onClickTrigger(): void {
        if (this.disabled) {
            return;
        }
        this._onTouched();
    }

    public setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    public clearDate() {
        this._$timeStart.clearDate();
        this._$timeEnd.clearDate();
        this.writeValue({ beginDate: '', endDate: '' });
    }

    ngOnInit() {
        super.ngOnInit();
        this._init();
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeUpdateValueSubscriber) {
            this._removeUpdateValueSubscriber.unsubscribe();
            this._removeUpdateValueSubscriber = null;
        }
    }
}

@NgModule({
    imports: [CommonModule, FormsModule, JigsawDateTimePickerModule],
    declarations: [JigsawRangeDateTimePicker],
    exports: [JigsawRangeDateTimePicker],
})
export class JigsawRangeDateTimePickerModule {

}
