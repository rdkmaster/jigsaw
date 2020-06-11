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
import {ComboSelectValue, JigsawComboSelectModule} from "../combo-select";
import {TimeGr, TimeService} from "../../common/service/time.service";
import {ArrayCollection} from "../../common/core/data/array-collection";
import {Time, TimeWeekDay, WeekTime} from "../../common/service/time.types";
import {GrItem, MarkDate} from "./date-picker";
import {TimeStep} from "./time-picker";
import {DropDownTrigger} from "../../common/directive/float";
import {AbstractJigsawComponent} from "../../common/common";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'jigsaw-date-time-select, j-date-time-select',
    template: `
        <jigsaw-combo-select [(value)]="_$dateComboValue" [placeholder]="placeholder" [disabled]="disabled" [valid]="valid"
                             [openTrigger]="openTrigger" [closeTrigger]="closeTrigger" [width]="width ? width : 150">
            <ng-template>
                <jigsaw-date-time-picker [date]="date" (dateChange)="writeValue($event)" [(gr)]="gr" (grChange)="grChange.emit($event)"
                                         [limitStart]="limitStart" [limitEnd]="limitEnd" [grItems]="grItems" [markDates]="markDates" [step]="step">
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
        if(this.initialized && this.date) {
            let convertDate = this._gr == TimeGr.week ? this._getWeekDate(<Time>this.date) : TimeService.convertValue(this.date, this._gr);
            if(convertDate != this.date) {
                this.runMicrotask(() => {
                    this.writeValue(convertDate);
                })
            }
        }
    }

    private _getWeekDate(date: Time) {
        return {year: TimeService.getWeekYear(date), week: TimeService.getWeekOfYear(date)};
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
    public placeholder: string = '';

    @Input()
    public disabled: boolean;

    @Input()
    public openTrigger: 'mouseenter' | 'click' | 'none' | DropDownTrigger = DropDownTrigger.mouseenter;

    @Input()
    public closeTrigger: 'mouseleave' | 'click' | 'none' | DropDownTrigger = DropDownTrigger.mouseleave;

    public _$dateComboValue: ArrayCollection<ComboSelectValue>;

    public _$setDateComboValue(date: string | TimeWeekDay) {
        if(typeof date == 'string' && date.includes('now')) return;
        date = typeof date == 'string' ? date : !!date ? `${date.year}-${date.week}` : '';
        this._$dateComboValue =  new ArrayCollection([{
            label: date,
            closable: false
        }]);
        this._cdr.markForCheck();
    }

    public _$onDateChange(date: string | TimeWeekDay) {
        this._$setDateComboValue(date);
        this.dateChange.emit(date);
    }

    public writeValue(date: WeekTime): void {
        if (this._date == date) return;
        this._date = date;
        this.dateChange.emit(date);
        this._$setDateComboValue(<string | TimeWeekDay>date);
        this._propagateChange();
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
        let convertDate = this.date ? TimeService.convertValue(this.date, <TimeGr>this.gr) : this.date;
        if(convertDate != this.date) {
            this.runMicrotask(() => {
                this.writeValue(convertDate);
            })
        }
    }

}

@NgModule({
    imports: [JigsawDateTimePickerModule, JigsawComboSelectModule],
    declarations: [JigsawDateTimeSelect],
    exports: [JigsawDateTimeSelect]
})
export class JigsawDateTimeSelectModule {

}
