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
    ViewChild,
    AfterViewInit
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ComboSelectValue, JigsawComboSelectModule, JigsawComboSelect} from "../combo-select/index";
import {TimeGr, TimeService, TimeWeekStart} from "../../common/service/time.service";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {Time, TimeWeekDay, WeekTime} from "../../common/service/time.types";
import {DropDownTrigger} from "../../common/directive/float/float";
import {AbstractJigsawComponent, WingsTheme} from "../../common/common";
import {RequireMarkForCheck} from "../../common/decorator/mark-for-check";
import {CommonUtils} from "../../common/core/utils/common-utils";
import {JigsawDateTimePickerModule} from "./date-time-picker";
import {DateTimeCellType, GrItem, MarkDate} from "./date-picker";
import {TimeStep} from "./time-picker";
import { JigsawDateTimePicker } from './date-time-picker';

@WingsTheme('date-time-select.scss')
@Component({
    selector: 'jigsaw-date-time-select, j-date-time-select',
    templateUrl: './date-time-select.html',
    host: {
        '[style.min-width]': 'width',
        '[attr.data-theme]': 'theme',
        '[class.jigsaw-date-time-select-host]': 'true',
        '[class.jigsaw-date-time-select-clearable]': 'clearable && date',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawDateTimeSelect), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawDateTimeSelect extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
    constructor(private _cdr: ChangeDetectorRef,
                // @RequireMarkForCheck 需要用到，勿删
                private _injector: Injector) {
        super();
        this._removeUpdateValueSubscriber = this._$updateValue.pipe(debounceTime(100)).subscribe(date => {
            this.writeValue(date);
        });
        this._removeMulInputsChangeSubscriber = this._multipleInputsChange.pipe(debounceTime(100)).subscribe(() => {
            this._changeDateByGr();
        })
    }

    /**
     * @internal
     */
    @ViewChild('comboSelect')
    private _comboSelect: JigsawComboSelect;

    @ViewChild('dateTimePicker')
    private _dateTimePicker: JigsawDateTimePicker;

    /**
     * @internal
     */
    public _$updateValue = new EventEmitter();
    private _removeUpdateValueSubscriber: Subscription;
    private _multipleInputsChange = new EventEmitter();
    private _removeMulInputsChangeSubscriber: Subscription;

    @Input()
    @RequireMarkForCheck()
    public valid: boolean = true;

    /**
     * 设置时间选择框边框和下拉箭头显隐开关。
     * @NoMarkForCheckRequired
     */
    @Input()
    public showBorder: boolean = true;

    private _gr: TimeGr = TimeGr.date;

    /**
     *  @NoMarkForCheckRequired
     */
    @Input()
    public get gr(): TimeGr | string {
        return this._gr;
    }

    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if (value == this._gr) {
            return;
        }
        this._gr = <TimeGr>value;
        if (this.initialized && this.date) {
            this._multipleInputsChange.emit();
        }
    }

    @Output()
    public grChange = new EventEmitter<TimeGr>();

    private _date: WeekTime;

    @RequireMarkForCheck()
    @Input()
    public get date(): WeekTime {
        return this._date;
    }

    public set date(date: WeekTime) {
        if (this._isDateSame(date, this._date)) {
            return;
        }
        this._date = date;
        if (this.initialized) {
            this._multipleInputsChange.emit();
        }
    }

    @Output()
    public dateChange = new EventEmitter<WeekTime>();

    /**
     *  @NoMarkForCheckRequired
     */
    @Input()
    public limitStart: Time;

    /**
     *  @NoMarkForCheckRequired
     */
    @Input()
    public limitEnd: Time;

    /**
     *  @NoMarkForCheckRequired
     */
    @Input()
    public grItems: GrItem[];

    /**
     *  @NoMarkForCheckRequired
     */
    @Input()
    public markDates: MarkDate[];

    /**
     *  @NoMarkForCheckRequired
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
     * 是否可清除
     * @NoMarkForCheckRequired
     */
    @Input()
    public clearable: boolean = false;

    /**
     * 是否再次点击时清除数据
     *
     * @NoMarkForCheckRequired
     */
    @Input()
    public clearOnReClick: boolean = true;

    /**
     * @internal
     */
    public _$dateComboValue: ArrayCollection<ComboSelectValue>;

    public clearDate() {
        if (this._date == '' || CommonUtils.isUndefined(this._date)) {
            return;
        }
        if (this._dateTimePicker) {
            this._dateTimePicker.clearDate();
            return;
        }
        this.writeValue('');
    }

    /**
     * @internal
     */
    public _$setComboValue(date: string | TimeWeekDay) {
        if (this.date === "") {
            this._$dateComboValue.splice(0, this._$dateComboValue.length);
            this._$dateComboValue.refresh();
        } else {
            date = this._getDateStr(date);
            if (!date) {
                return;
            }
            this._$dateComboValue = new ArrayCollection([
                {
                    label: date,
                    closable: false
                }
            ]);
        }
        this._cdr.markForCheck();
    }

    private _getDateStr(date: string | TimeWeekDay) {
        if (!((typeof date == 'string' && !date.includes('now')) ||
            (date && date.hasOwnProperty('year') && date.hasOwnProperty('week')))) {
            return null;
        }
        return typeof date == 'string' ? date : `${date.year}-${date.week}`;
    }

    private _isDateSame(date1, date2) {
        if (!date1 || !date2) {
            return false;
        }
        if (this.gr == TimeGr.week && typeof date1 == 'object' && typeof date2 == 'object') {
            return date1.year == date2.year && date1.week == date2.week
        } else {
            return date1 == date2
        }
    }

    public writeValue(date: WeekTime): void {
        this._date = date;
        this.dateChange.emit(date);
        this._$setComboValue(<string | TimeWeekDay>date);
        this._propagateChange(this._date);
    }

    /**
     * @internal
     */
    public _$closeComboSelect(cellType: DateTimeCellType) {
        if (!this._comboSelect || !(this.gr == TimeGr.date || this.gr == TimeGr.month || this.gr == TimeGr.week)) {
            return;
        }
        if ((this.gr == TimeGr.date || this.gr == TimeGr.week) && cellType != 'day') {
            return;
        }
        if (this.gr == TimeGr.month && cellType != 'month') {
            return;
        }
        this._comboSelect.open = false;
    }

    private _changeDateByGr() {
        if (!this.date) {
            return;
        }
        let convertDate = TimeService.getDateByGr(this.date, this._gr);
        this._$updateValue.emit(convertDate);
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
        if (this._removeUpdateValueSubscriber) {
            this._removeUpdateValueSubscriber.unsubscribe();
            this._removeUpdateValueSubscriber = null;
        }
        if (this._removeMulInputsChangeSubscriber) {
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
    imports: [JigsawDateTimePickerModule, JigsawComboSelectModule],
    declarations: [JigsawDateTimeSelect],
    exports: [JigsawDateTimeSelect]
})
export class JigsawDateTimeSelectModule {

}
