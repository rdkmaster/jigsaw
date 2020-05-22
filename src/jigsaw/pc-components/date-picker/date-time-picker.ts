import {AbstractJigsawComponent} from "../../common/common";
import { Component, forwardRef, NgModule, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {JigsawDatePickerModule, MarkDate} from "./date-picker";
import {JigsawTimePickerModule} from "./time-picker";
import {TimeGr, TimeService} from "../../common/service/time.service";
import {Time, WeekTime} from "../../common/service/time.types";
import {GrItem} from "../time";

@Component({
    selector: 'jigsaw-date-time-picker, j-date-time-picker',
    templateUrl: './date-time-picker.html',
    host: {
        '[class.jigsaw-date-time-picker]': 'true',
        '[style.width]': 'width',
        '[style.height]': 'height',
    },
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => JigsawDateTimePicker), multi: true},
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JigsawDateTimePicker extends AbstractJigsawComponent implements ControlValueAccessor {
    @Input()
    public valid: boolean = true;

    @Output()
    public grChange = new EventEmitter<TimeGr>();

    public _$gr: TimeGr = TimeGr.date;

    @Input()
    public get gr(): TimeGr | string {
        return this._$gr;
    }

    public set gr(value: TimeGr | string) {
        if (typeof value === 'string') {
            value = TimeGr[value];
        }
        if (<TimeGr>value != this._$gr) {
            this._$gr = <TimeGr>value;

        }
    }

    private _date: WeekTime;
    public _$time: string;

    @Input()
    public get date(): WeekTime {
        return this._date;
    }

    public set date(newValue: WeekTime) {
        if (this.initialized) {
            this.writeValue(newValue);
        } else {
            //this._dateInitBak = newValue
        }
    }

    @Output()
    public dateChange = new EventEmitter<WeekTime>();

    private _limitEnd: Time;

    public get limitEnd(): Time {
        return this._limitEnd
    }

    @Input()
    public set limitEnd(value: Time) {
        if (!value) {
            return;
        }
        this._limitEnd = TimeService.convertValue(value, <TimeGr>this.gr);
        if (this.initialized && this.date) {
            this.writeValue(this.date);
        }
        //this._checkMacro();
    }

    private _limitStart: Time;

    public get limitStart(): Time {
        return this._limitStart;
    }

    @Input()
    public set limitStart(value: Time) {
        if (!value) {
            return;
        }
        this._limitStart = TimeService.convertValue(value, <TimeGr>this.gr);
        if (this.initialized && this.date) {
            //this.writeValue(this.date);
        }
        //this._checkMacro();
    }

    private _refreshInterval: number;

    @Input()
    public get refreshInterval(): number {
        return this._refreshInterval;
    }

    public set refreshInterval(value: number) {
        if (value || value == 0) {
            this._refreshInterval = value;
        }
    }

    @Input()
    public grItems: GrItem[];

    @Input()
    markDates: MarkDate[];

    public writeValue(newValue: any): void {

        this._propagateChange();
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
    imports: [CommonModule, FormsModule, JigsawTimePickerModule, JigsawDatePickerModule],
    declarations: [JigsawDateTimePicker],
    exports: [JigsawDateTimePicker],
})
export class JigsawDateTimePickerModule {

}
