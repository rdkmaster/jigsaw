import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    OnInit,
    Output,
    OnDestroy
} from '@angular/core';
import {ComboSelectValue, JigsawComboSelectModule} from "../combo-select";
import {TimeGr, TimeService} from "../../common/service/time.service";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {Time, TimeWeekDay, WeekTime} from "../../common/service/time.types";
import {GrItem, MarkDate} from "./date-picker";
import {TimeStep} from "./time-picker";
import {DropDownTrigger} from "../../common/directive/float";
import {AbstractJigsawComponent} from "../../common/common";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {JigsawRangeDateTimePickerModule} from "./range-date-time-picker";
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

export type RangeDate = { beginDate: WeekTime, endDate: WeekTime }

@Component({
    selector: 'jigsaw-range-date-time-select, j-range-date-time-select',
    template: `
        <jigsaw-combo-select [(value)]="_$dateComboValue" [placeholder]="placeholder" [disabled]="disabled" [valid]="valid"
                             [openTrigger]="openTrigger" [closeTrigger]="closeTrigger" [width]="width ? width : 200">
            <ng-template>
                <jigsaw-range-date-time-picker [(beginDate)]="_$beginDate" [(endDate)]="_$endDate" [(gr)]="gr" [limitStart]="limitStart"
                                               [limitEnd]="limitEnd" [grItems]="grItems" [markDates]="markDates" [step]="step"
                                               (beginDateChange)="_$dateItemChange.emit()" (endDateChange)="_$dateItemChange.emit()"
                                               (grChange)="grChange.emit($event)">
                </jigsaw-range-date-time-picker>
            </ng-template>
        </jigsaw-combo-select>
    `,
    host: {
        '[class.jigsaw-range-date-time-select]': 'true'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawRangeDateTimeSelect), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawRangeDateTimeSelect extends AbstractJigsawComponent implements ControlValueAccessor, OnInit, OnDestroy {
    constructor(private _cdr: ChangeDetectorRef) {
        super();
        this._removeDateItemChangeSubscriber = this._$dateItemChange.pipe(debounceTime(100)).subscribe(() => {
            this.writeValue({beginDate: this._$beginDate, endDate: this._$endDate})
        })
    }

    @Input()
    public valid: boolean = true;

    private _gr: TimeGr = TimeGr.date;
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
        if (this.initialized && this.date) {
            this._changeRangeDateByGr();
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
    @Input()
    public get date(): RangeDate {
        return this._date;
    }

    public set date(date: RangeDate) {
        if (!date || !date.hasOwnProperty('beginDate') || !date.hasOwnProperty('endDate')) return;
        this._$beginDate = date.beginDate;
        this._$endDate = date.endDate;
        this.writeValue(date);
    }

    @Output()
    public dateChange = new EventEmitter<RangeDate>();

    @Input()
    public limitStart: Time;

    @Input()
    public limitEnd: Time;

    @Input()
    public grItems: GrItem[];

    @Input()
    public markDates: MarkDate[];

    @Input()
    public step: TimeStep;

    @Input()
    public placeholder: string = '';

    @Input()
    public disabled: boolean;

    @Input()
    public openTrigger: 'mouseenter' | 'click' | 'none' | DropDownTrigger = DropDownTrigger.mouseenter;

    @Input()
    public closeTrigger: 'mouseleave' | 'click' | 'none' | DropDownTrigger = DropDownTrigger.mouseleave;

    public _$dateItemChange = new EventEmitter();
    private _removeDateItemChangeSubscriber: Subscription;

    public _$dateComboValue: ArrayCollection<ComboSelectValue>;

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
        if (!this._isDateChanged(date, this._date)) return;
        this._date = date;
        this.dateChange.emit(date);
        this._$setComboValue(date);
        this._propagateChange();
    }

    private _changeRangeDateByGr() {
        if (!this._isRangeDate(this.date)) return;
        let convertDate = {
            beginDate: this._getDateByGr(this.date.beginDate, this._gr),
            endDate: this._getDateByGr(this.date.endDate, this._gr)
        };
        if (this._isDateChanged(convertDate, this.date)) {
            this.runMicrotask(() => {
                this.writeValue(convertDate);
            })
        }
    }

    private _isDateChanged(date1: RangeDate, date2: RangeDate): boolean {
        return !date1 || !date2 || date1.beginDate != date2.beginDate || date1.endDate != date2.endDate;
    }

    private _getDateByGr(date: WeekTime, gr: TimeGr) {
        date = TimeService.convertValue(date, gr);
        return gr == TimeGr.week ? TimeService.getWeekDate(date) : date
    }

    private _isRangeDate(date: any) {
        return date && date.beginDate && date.endDate;
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.date) {
            this._changeRangeDateByGr()
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this._removeDateItemChangeSubscriber) {
            this._removeDateItemChangeSubscriber.unsubscribe();
            this._removeDateItemChangeSubscriber = null
        }
    }

    private _propagateChange: any = () => {
    };

    public registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

}

@NgModule({
    imports: [JigsawRangeDateTimePickerModule, JigsawComboSelectModule],
    declarations: [JigsawRangeDateTimeSelect],
    exports: [JigsawRangeDateTimeSelect]
})
export class JigsawRangeDateTimeSelectModule {

}
