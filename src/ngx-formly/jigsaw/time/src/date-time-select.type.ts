import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawDateTimeSelect, TimeGr} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-date-time-select',
    template: `
        <jigsaw-date-time-select
            [formlyAttributes]="field"
            [formControl]="formControl"
            [width]="to.width"
            [height]="to.height"
            [valid]="to.valid && !showError"
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
export class FormlyFieldDateTimeSelect extends FormlyFieldType<JigsawDateTimeSelect> {
    defaultOptions = {
        templateOptions: {
            valid: true,
            gr: TimeGr.date,
            openTrigger: 'mouseenter',
            closeTrigger: 'mouseleave'
        },
    };

    @ViewChild(JigsawDateTimeSelect)
    protected _instance: JigsawDateTimeSelect;
}
