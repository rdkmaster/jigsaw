import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    NgModule,
    OnDestroy,
    OnInit,
    Output,
    AfterViewInit,
    ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {ComboSelectValue, JigsawComboSelectModule, JigsawComboSelect} from "../combo-select/index";
import {TimeGr, TimeService, TimeWeekStart} from "../../common/service/time.service";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {Time, TimeWeekDay, WeekTime} from "../../common/service/time.types";
import {DropDownTrigger} from "../../common/directive/float/float";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import { CommonUtils } from '../../common/core/utils/common-utils';
import {JigsawRangeDateTimePicker, JigsawRangeDateTimePickerModule} from "./range-date-time-picker";
import {GrItem, MarkDate} from "./date-picker";
import {TimeStep} from "./time-picker";

export type RangeDate = { beginDate: WeekTime, endDate: WeekTime }

@WingsTheme('range-date-time-select.scss')
@Component({
    selector: 'jigsaw-range-date-time-select, j-range-date-time-select',
    templateUrl: 'range-date-time-select.html',
    host: {
        '[style.min-width]': 'width',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-range-date-time-select-host]': 'true',
        '[class.jigsaw-combo-select-show-border]': '!showBorder',
        '[class.jigsaw-range-date-time-select-clearable]': 'clearable && _$dateComboValue'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRangeDateTimeSelect), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawRangeDateTimeSelect extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    constructor(private _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
        this._removeDateItemChangeSubscriber = this._$dateItemChange.pipe(debounceTime(100)).subscribe(() => {
            let value = {beginDate: this._$beginDate, endDate: this._$endDate};
            this._$setComboValue(value);
            this.writeValue(value)
        });
        this._removeMulInputsChangeSubscriber = this._multipleInputsChange.pipe(debounceTime(100)).subscribe(() => {
            this._changeRangeDateByGr();
        })
    }
    
     /**
     * 设置时间选择框边框和下拉箭头显隐开关，为true则边框透明，为false则有边框颜色。
     */
      @RequireMarkForCheck()
      @Input()
      public showBorder: boolean = true;

    @ViewChild('comboSelect')
    private _comboSelect: JigsawComboSelect;

    @ViewChild('rangeDateTimePicker')
    private _rangeDateTimePicker: JigsawRangeDateTimePicker;

    @Input()
    @RequireMarkForCheck()
    public valid: boolean = true;

    private _gr: TimeGr = TimeGr.date;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public get gr(): TimeGr | string {
        return this._gr;
    }

    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if (value == this._gr) return;
        this._gr = <TimeGr>value;
        if (this.initialized) {
            this._multipleInputsChange.emit();
        }
    }

    @Output()
    public grChange = new EventEmitter<TimeGr>();

    /**
     * @internal
     */
    public _$beginDate: WeekTime;

    /**
     * @internal
     */
    public _$endDate: WeekTime;

    private _date: RangeDate;

    @RequireMarkForCheck()
    @Input()
    public get date(): RangeDate {
        return this._date;
    }

    public set date(date: RangeDate) {
        if (!this._isDateChanged(date, this.date)) return;

        this._date = date;
        if (this.initialized) {
            this._multipleInputsChange.emit();
        }
    }

    @Output()
    public dateChange = new EventEmitter<RangeDate>();

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public limitStart: Time;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public limitEnd: Time;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public limitSpan: number | string;

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public grItems: GrItem[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public markDates: MarkDate[];

    /**
     * @NoMarkForCheckRequired
     */
    @Input()
    public step: TimeStep;

    private _weekStart: TimeWeekStart;

    /**
     * @NoMarkForCheckRequired
     * 设置周开始日期，可选值 sun mon tue wed thu fri sat。
     */
    @Input()
    public get weekStart(): string | TimeWeekStart {
        return this._weekStart;
    }

    public set weekStart(value: string | TimeWeekStart) {
        if(CommonUtils.isUndefined(value)) {
            return;
        }
        this._weekStart = typeof value === 'string' ? TimeWeekStart[value] : value;
        // weekStart/janX必须预先设置好，用于初始化之后的计算
        TimeService.setWeekStart(this._weekStart);
    }

    private _firstWeekMustContains: number;

    /**
     * @NoMarkForCheckRequired
     * 设置一年的第一周要包含一月几号
     */
    @Input()
    public get firstWeekMustContains(): number {
        return this._firstWeekMustContains;
    }

    public set firstWeekMustContains(value: number) {
        if(CommonUtils.isUndefined(value)) {
            return;
        }
        value = isNaN(value) || Number(value) < 1 ? 1 : Number(value);
        this._firstWeekMustContains = value;
        // weekStart/janX必须预先设置好，用于初始化之后的计算
        TimeService.setFirstWeekOfYear(this._firstWeekMustContains);
    }

    @Input()
    @RequireMarkForCheck()
    public placeholder: string = '';


    @Input()
    @RequireMarkForCheck()
    public disabled: boolean;

    @Input()
    @RequireMarkForCheck()
    public openTrigger: 'mouseenter' | 'click' | 'none' | DropDownTrigger = DropDownTrigger.click;

    @Input()
    @RequireMarkForCheck()
    public closeTrigger: 'mouseleave' | 'click' | 'none' | DropDownTrigger = DropDownTrigger.mouseleave;

    /**
     * 是否显示确认按钮
     * @NoMarkForCheckRequired
     */
    @Input()
    public showConfirmButton: boolean = false;

    /**
     * @internal
     */
    public _$grChange($event) {
        this._gr = $event;
        this.grChange.emit($event)
    }

    /**
     * @internal
     */
    public _$dateItemChange = new EventEmitter();
    private _removeDateItemChangeSubscriber: Subscription;
    private _multipleInputsChange = new EventEmitter();
    private _removeMulInputsChangeSubscriber: Subscription;

    /**
     * @internal
     */
    public _$dateComboValue: ArrayCollection<ComboSelectValue>;

    /**
     * @internal
     */
    public _$setComboValue(date: RangeDate) {
        if (!date) return;
        let [beginDate, endDate] = [this._getDateStr(<string | TimeWeekDay>date.beginDate), this._getDateStr(<string | TimeWeekDay>date.endDate)];
        if (!beginDate || !endDate) return;
        this._$dateComboValue = new ArrayCollection([{
            label: `${beginDate} - ${endDate}`,
            closable: false
        }]);
        this._cdr.markForCheck();
    }

    private _getDateStr(date: string | TimeWeekDay) {
        if (!((typeof date == 'string' && !date.includes('now')) ||
            (date && date.hasOwnProperty('year') && date.hasOwnProperty('week')))) return null;
        return typeof date == 'string' ? date : `${date.year}-${date.week}`;
    }

    public writeValue(date: RangeDate): void {
        this._date = date;
        this.dateChange.emit(date);
        this._propagateChange(this._date);
    }

    private _changeRangeDateByGr() {
        if (!this._isRangeDate(this.date)) {
            return
        };
        this._$beginDate = TimeService.getDateByGr(this.date.beginDate, this._gr);
        this._$endDate = TimeService.getDateByGr(this.date.endDate, this._gr);
        let convertDate = {
            beginDate: this._$beginDate,
            endDate: this._$endDate
        };
        this._$setComboValue(convertDate);
        this.writeValue(convertDate);
        this._cdr.markForCheck();
    }

    private _isDateChanged(date1: RangeDate, date2: RangeDate): boolean {
        return !date1 || !date2 || date1.beginDate != date2.beginDate || date1.endDate != date2.endDate;
    }

    private _isRangeDate(date: any) {
        return date && date.beginDate && date.endDate;
    }

    /**
     * 是否可清除
     * @NoMarkForCheckRequired
     */
    @Input()
    public clearable: boolean = false;

    public clearDate() {
        if (CommonUtils.isUndefined(this._date)) {
            return;
        }

        if (this._date.beginDate == '' && this._date.endDate == '') {
            return;
        }

        if (this._rangeDateTimePicker) {
            this._rangeDateTimePicker.clearDate();
            return;
        }
        this._$beginDate = '';
        this._$endDate = '';
        this.writeValue({ beginDate: '', endDate: '' });
    }

    ngOnInit() {
        super.ngOnInit();
        this._multipleInputsChange.emit();
    }

    ngAfterViewInit() {
        this._comboSelect._$options.size = { "minWidth": 0 };
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeDateItemChangeSubscriber) {
            this._removeDateItemChangeSubscriber.unsubscribe();
            this._removeDateItemChangeSubscriber = null
        }
        if(this._removeMulInputsChangeSubscriber) {
            this._removeMulInputsChangeSubscriber.unsubscribe();
            this._removeMulInputsChangeSubscriber = null;
        }
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

    public setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
    }

    /**
     * @internal
     */
    public _$onComboOpenChange(optionState: boolean) {
        this._onTouched();
    }
}

@NgModule({
    imports: [JigsawRangeDateTimePickerModule, JigsawComboSelectModule],
    declarations: [JigsawRangeDateTimeSelect],
    exports: [JigsawRangeDateTimeSelect]
})
export class JigsawRangeDateTimeSelectModule {

}
