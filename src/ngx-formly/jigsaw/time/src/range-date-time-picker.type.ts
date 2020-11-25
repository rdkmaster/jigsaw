import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {TimeGr} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-range-date-time-picker',
    template: `
        <jigsaw-range-date-time-picker
            [formlyAttributes]="field"
            [formControl]="formControl"
            [width]="to.width"
            [height]="to.height"
            [disabled]="to.disabled"
            [valid]="to.valid"
            [gr]="to.gr"
            [beginDate]="to.beginDate"
            [endDate]="to.endDate"
            [limitStart]="to.limitStart"
            [limitEnd]="to.limitEnd"
            [grItems]="to.grItems"
            [markDates]="to.markDates"
            [step]="to.step"
            [weekStart]="to.weekStart"
            (grChange)="to.grChange && to.grChange($event)"
            (change)="to.change && to.change($event)"
            (beginDateChange)="to.beginDateChange && to.beginDateChange($event)"
            (endDateChange)="to.endDateChange && to.endDateChange($event)"
        ></jigsaw-range-date-time-picker>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldRangeDateTimePicker extends FieldType {
    defaultOptions = {
        templateOptions: {
            disabled: false,
            valid: true,
            gr: TimeGr.date,
            beginDate: 'now-3d',
            endDate: 'now',
        },
    };
}
