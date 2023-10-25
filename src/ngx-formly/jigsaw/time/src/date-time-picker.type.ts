import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawDateTimePicker, TimeGr} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-date-time-picker',
    template: `
        <jigsaw-date-time-picker
            [formlyAttributes]="field"
            [formControl]="formControl"
            [width]="to.width"
            [height]="to.height"
            [valid]="to.valid && !showError"
            [gr]="to.gr"
            [date]="to.date"
            [limitStart]="to.limitStart"
            [limitEnd]="to.limitEnd"
            [grItems]="to.grItems"
            [markDates]="to.markDates"
            [rangeDate]="to.rangeDate"
            [step]="to.step"
            [weekStart]="to.weekStart"
            [theme]="to.theme"
            (grChange)="to.grChange && to.grChange($event)"
            (dateChange)="to.dateChange && to.dateChange($event)"
        ></jigsaw-date-time-picker>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldDateTimePicker extends FormlyFieldType<JigsawDateTimePicker> {
    defaultOptions = {
        templateOptions: {
            valid: true,
            gr: TimeGr.date,
        },
    };

    @ViewChild(JigsawDateTimePicker)
    protected _instance: JigsawDateTimePicker;
}
