import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    NgModule,
    OnInit,
    Output
} from '@angular/core';
import {JigsawDateTimePickerModule} from "./date-time-picker";
import {ComboSelectValue, JigsawComboSelectModule} from "../combo-select/index";
import {TimeGr, TimeService, TimeWeekStart} from "../../common/service/time.service";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {Time, TimeWeekDay, WeekTime} from "../../common/service/time.types";
import {GrItem, MarkDate} from "./date-picker";
import {TimeStep} from "./time-picker";
import {DropDownTrigger} from "../../common/directive/float/float";
import {AbstractJigsawComponent} from "../../common/common";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'jigsaw-date-time-select, j-date-time-select',
    template: `
        <jigsaw-combo-select [(value)]="_$dateComboValue" [placeholder]="placeholder" [disabled]="disabled" [valid]="valid"
                             [openTrigger]="openTrigger" [closeTrigger]="closeTrigger" [width]="width ? width : 150">
            <ng-template>
                <jigsaw-date-time-picker [date]="date" (dateChange)="writeValue($event)" [(gr)]="gr" (grChange)="grChange.emit($event)"
                                         [limitStart]="limitStart" [limitEnd]="limitEnd" [grItems]="grItems" [markDates]="markDates"
                                         [step]="step" [weekStart]="weekStart">
                </jigsaw-date-time-picker>
            </ng-template>
        </jigsaw-combo-select>
    `,
    host: {
        '[class.jigsaw-date-time-select]': 'true'
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawDateTimeSelect), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawDateTimeSelect extends AbstractJigsawComponent implements ControlValueAccessor, OnInit {
    constructor(private _cdr: ChangeDetectorRef) {
        super()
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
            this._changeDateByGr();
        }
    }

    @Output()
    public grChange = new EventEmitter<TimeGr>();

    private _date: WeekTime;
    @Input()
    public get date(): WeekTime {
        return this._date;
    }

    public set date(date: WeekTime) {
        this.writeValue(date);
    }

    @Output()
    public dateChange = new EventEmitter<WeekTime>();

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
    public weekStart: string | TimeWeekStart;

    @Input()
    public placeholder: string = '';

    @Input()
    public disabled: boolean;

    @Input()
    public openTrigger: 'mouseenter' | 'click' | 'none' | DropDownTrigger = DropDownTrigger.mouseenter;

    @Input()
    public closeTrigger: 'mouseleave' | 'click' | 'none' | DropDownTrigger = DropDownTrigger.mouseleave;

    /**
     * @internal
     */
    public _$dateComboValue: ArrayCollection<ComboSelectValue>;

    /**
     * @internal
     */
    public _$setComboValue(date: string | TimeWeekDay) {
        date = this._getDateStr(date);
        if (!date) return;
        this._$dateComboValue = new ArrayCollection([{
            label: date,
            closable: false
        }]);
        this._cdr.markForCheck();
    }

    private _getDateStr(date: string | TimeWeekDay) {
        if (!((typeof date == 'string' && !date.includes('now')) ||
            (date && date.hasOwnProperty('year') && date.hasOwnProperty('week')))) return null;
        return typeof date == 'string' ? date : `${date.year}-${date.week}`;
    }

    private _isDateSame(date1, date2) {
        if (!date1 || !date2) return false;
        if (this.gr == TimeGr.week) {
            return date1.year == date2.year && date1.week == date2.week
        } else {
            return date1 == date2
        }
    }

    public writeValue(date: WeekTime): void {
        if (this._isDateSame(date, this._date)) return;
        this._date = date;
        this.dateChange.emit(date);
        this._$setComboValue(<string | TimeWeekDay>date);
        this._propagateChange();
    }

    private _changeDateByGr() {
        if (!this.date) return;
        let convertDate = TimeService.getDateByGr(this.date, this._gr);
        if (convertDate != this.date) {
            this.runMicrotask(() => {
                this.writeValue(convertDate);
            })
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this._changeDateByGr();
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
    imports: [JigsawDateTimePickerModule, JigsawComboSelectModule],
    declarations: [JigsawDateTimeSelect],
    exports: [JigsawDateTimeSelect]
})
export class JigsawDateTimeSelectModule {

}
