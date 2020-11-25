import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {TimeGr} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-range-date-time-select',
    template: `
        <jigsaw-range-date-time-select
            [formlyAttributes]="field"
            [formControl]="formControl"
            [width]="to.width"
            [height]="to.height"
            [disabled]="to.disabled"
            [valid]="to.valid"
            [gr]="to.gr"
            [(date)]="to.date"
            [limitStart]="to.limitStart"
            [limitEnd]="to.limitEnd"
            [grItems]="to.grItems"
            [markDates]="to.markDates"
            [step]="to.step"
            [placeholder]="to.placeholder"
            [openTrigger]="to.openTrigger"
            [closeTrigger]="to.closeTrigger"
            [weekStart]="to.weekStart"
            (grChange)="to.grChange && to.grChange($event)"
            (dateChange)="to.dateChange && to.dateChange($event)"
        ></jigsaw-range-date-time-select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldRangeDateTimeSelect extends FieldType {
    defaultOptions = {
        templateOptions: {
            disabled: false,
            valid: true,
            gr: TimeGr.date,
            date: {beginDate: 'now-3d', endDate: 'now'},
            openTrigger: 'mouseenter',
            closeTrigger: 'mouseleave'
        },
    };
}
