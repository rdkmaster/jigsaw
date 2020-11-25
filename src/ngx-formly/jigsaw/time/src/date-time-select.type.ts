import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {TimeGr} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-date-time-select',
    template: `
        <jigsaw-date-time-select
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
            [placeholder]="to.placeholder"
            [step]="to.step"
            [weekStart]="to.weekStart"
            [openTrigger]="to.openTrigger"
            [closeTrigger]="to.closeTrigger"
            (grChange)="to.grChange && to.grChange($event)"
            (dateChange)="to.dateChange && to.dateChange($event)"
        ></jigsaw-date-time-select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldDateTimeSelect extends FieldType {
    defaultOptions = {
        templateOptions: {
            disabled: false,
            valid: true,
            date: 'now',
            gr: TimeGr.date,
            openTrigger: 'mouseenter',
            closeTrigger: 'mouseleave'
        },
    };
}
