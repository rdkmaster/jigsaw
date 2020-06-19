import {AbstractJigsawComponent} from "../../common/common";
import {
    Component,
    forwardRef,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
    Output,
    EventEmitter,
    Input,
    ChangeDetectorRef,
    NgZone,
    NgModule
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule} from '@angular/forms';
import {GrItem, MarkDate, Shortcut} from "./date-picker";
import {CommonModule} from '@angular/common';
import {TimeGr, TimeService, TimeUnit, TimeWeekStart} from "../../common/service/time.service";
import {Time, WeekTime} from "../../common/service/time.types";
import {JigsawDateTimePickerModule} from "./date-time-picker";
import {TimeStep} from "./time-picker";
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

declare const moment: any;

/**
 * 用于在界面上提供一个时间范围选择，支持多种时间粒度切换，支持年月日时分秒及其各种组合，
 * 通过切换不同的粒度，可以控制时刻选择器只能选到年月日时分秒中的任何一段
 * 如下是关于时间的一些常见的场景及其建议：
 *
 * - 如果需要选择的是一个时刻，则请使用`JigsawDateTimePicker`；
 * - 如果需要选择的是一个时分秒，不带日期，则请使用`JigsawTimePicker`；
 * - 如果你需要的是一个日历的功能，那请参考[这个demo]($demo=table/calendar)，通过表格+渲染器的方式来模拟；
 * - 时间选择器常常是收纳到下拉框中以解决视图空间，则请使用 `JigsawDateTimeSelect` 和 `JigsawRangeDateTimeSelect`，
 * 参考[这个demo]($demo=range-date-time-picker/with-combo-select)；
 *
 * 时间控件是对表单友好的，你可以给时间控件编写表单校验器，参考[这个demo]($demo=form/template-driven)。
 *
 * $demo = range-date-time-picker/basic
 * $demo = range-date-time-picker/range-date-time-select
 */
@Component({
    selector: 'jigsaw-range-date-time-picker, j-range-date-time-picker, jigsaw-range-time, j-range-time',
    templateUrl: './range-date-time-picker.html',
    host: {
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
    constructor(protected _zone: NgZone, private _cdr: ChangeDetectorRef) {
        super(_zone);
        this._removeUpdateValueSubscriber = this._updateValue.pipe(debounceTime(100)).subscribe(() => {
            if (!this.beginDate || !this.endDate || this.endDate < this.beginDate ||
                this.endDate > TimeService.convertValue(this._$endTimeLimitEnd, this._$gr)) return;
            this.writeValue({beginDate: this.beginDate, endDate: this.endDate});
            this._propagateChange({beginDate: this.beginDate, endDate: this.endDate});
        })
    }

    /**
     * 参考`JigsawDateTimePicker.disabled`
     * $demo = date-time-picker/disabled
     */
    @Input()
    public disabled: boolean;

    /**
     * 参考`JigsawDateTimePicker.valid`
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
            this._$endTimeLimitEnd = this._calculateLimitEnd();
        } else if (key == 'endDate') {
            this._endDate = value;
        }
        this._updateValue.emit();
        this._cdr.markForCheck();
    }

    private _beginDate: WeekTime;

    /**
     * 时间段的开始时刻，在双绑模式下，更新这个值可以让时间控件选中对应的时刻。
     * $demo = range-date-time-picker/basic
     */
    @Input()
    public get beginDate(): WeekTime {
        return this._beginDate;
    }

    public set beginDate(value: WeekTime) {
        if (!value || value == this._beginDate) return;
        if (this.initialized) {
            let date = TimeService.getDateByGr(value, this._$gr);
            if (date == this._beginDate) return;
            this._beginDate = date;
            this._$endTimeLimitEnd = this._calculateLimitEnd();
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
            this._updateValue.emit();
        } else {
            this._endDate = value;
        }
    }

    /**
     * @internal
     */
    public _$limitStart: WeekTime;

    /**
     * 参考`JigsawDateTimePicker.limitStart`
     * $demo = range-date-time-picker/limit
     */
    @Input()
    public get limitStart(): WeekTime {
        return this._$limitStart;
    }

    public set limitStart(value: WeekTime) {
        if (value) {
            this._$limitStart = value;
        }
    }

    /**
     * @internal
     */
    public _$limitEnd: WeekTime;

    /**
     * 参考`JigsawDateTimePicker.limitEnd`
     * $demo = range-date-time-picker/limit
     */
    @Input()
    public get limitEnd(): WeekTime {
        return this._$limitEnd;
    }

    public set limitEnd(value: WeekTime) {
        if (value) {
            this._$limitEnd = value;
            this._$endTimeLimitEnd = this._calculateLimitEnd();
        }
    }

    /**
     * 参考`JigsawDateTimePicker.grItems`
     * $demo = range-date-time-picker/gr-items
     */
    @Input()
    public grItems: GrItem[];

    /**
     * 对选定的日期做标记，用于提示用户这些日期具有特定含义
     * $demo = date-time-picker/mark
     */
    @Input()
    public markDates: MarkDate[];

    /**
     * 分钟、秒钟选择面板的默认有60个数字可以挑选，显得比较凌乱，你可以设置此值为5/10来减少面板上的可选项
     * $demo = range-date-time-picker/step
     */
    @Input()
    public step: TimeStep;

    /**
     * 设置周开始日期，可选值 sun mon tue wed thu fri sat。
     *
     * $demo = range-date-time-picker/week-start
     */
    @Input()
    public weekStart: string | TimeWeekStart;

    /**
     * 当用户选择时间时，Jigsaw发出此事件。
     * $demo = date-time-picker/with-combo-select
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
        this._$endTimeLimitEnd = this._calculateLimitEnd();

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

    private _calculateLimitEnd(): WeekTime {
        let item: GrItem = this.grItems && this.grItems.find(item => item.value == this._$gr);
        let endTime: WeekTime = null;
        if (this._$limitEnd) {
            endTime = TimeService.isMacro(<Time>this._$limitEnd) ? this._$limitEnd : TimeService.getDate(TimeService.convertValue(
                this._$limitEnd, this._$gr), this._$gr);
        }
        if (item && item.span) {
            let calculateTime: WeekTime = JigsawRangeDateTimePicker._calculateLimitEnd(TimeService.convertValue(this._beginDate,
                this._$gr), item.span, this._$gr);
            calculateTime = TimeService.getDate(calculateTime, this._$gr);
            if (!endTime || endTime > calculateTime) {
                endTime = calculateTime;
            }
        }
        return endTime;
    }

    private static _calculateLimitEnd(startDate: string, span: string, gr: TimeGr): Date {
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
                startDate = TimeService.convertValue(startDate, gr);
                let spanReg: RegExp = /([\d]+)([a-z]+)?/i;
                span = span.replace(/\s+/g, "");
                let gapArr: string[] = spanReg.exec(span);
                let endTimeFormat = TimeService.format(TimeService.addDate(startDate, gapArr[1], TimeUnit[gapArr[2].toLowerCase()]), 'YYYY-MM-DD,HH:mm:ss');
                let endTimeParse = moment(endTimeFormat, "YYYY-MM-DD HH:mm:ss");
                endTime = new Date(endTimeParse);
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
    }

    /**
     * @internal
     */
    public _changeShortcut(selectedShortcut: Shortcut) {
        if (selectedShortcut.dateRange) {
            let [beginDate, endDate] = typeof selectedShortcut.dateRange === "function" ? selectedShortcut.dateRange.call(this) :
                selectedShortcut.dateRange;
            beginDate = TimeService.convertValue(beginDate, this._$gr);
            let limitStart = this._$limitStart && TimeService.convertValue(this._$limitStart, this._$gr);
            let limitEnd = this._$limitEnd && TimeService.convertValue(this._$limitEnd, this._$gr);
            if (!((limitStart && beginDate < limitStart) || (limitEnd && beginDate > limitEnd))) {
                this._beginDate = beginDate;
            } else {
                this._beginDate = limitStart;
            }
            this._$endTimeLimitEnd = this._calculateLimitEnd();
            this._endDate = TimeService.convertValue(endDate, this._$gr);
            this._updateValue.emit();
            this._cdr.markForCheck();
        }
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

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
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
