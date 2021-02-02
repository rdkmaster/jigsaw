import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {TimeGr} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-date-time-picker',
    template: `
        <jigsaw-date-time-picker
            [formlyAttributes]="field"
            [formControl]="formControl"
            [width]="to.width"
            [height]="to.height"
            [disabled]="to.disabled"
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
            (grChange)="to.grChange && to.grChange($event)"
            (dateChange)="to.dateChange && to.dateChange($event)"
        ></jigsaw-date-time-picker>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldDateTimePicker extends FieldType {
    defaultOptions = {
        templateOptions: {
            disabled: false,
            valid: true,
            gr: TimeGr.date,
        },
    };
}
