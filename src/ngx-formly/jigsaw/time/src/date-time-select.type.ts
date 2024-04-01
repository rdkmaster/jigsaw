import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@rdkmaster/formly/form-field";
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
            [showBorder]="to.showBorder"
            [markDates]="to.markDates"
            [placeholder]="to.placeholder"
            [step]="to.step"
            [weekStart]="to.weekStart"
            [openTrigger]="to.openTrigger"
            [closeTrigger]="to.closeTrigger"
            [theme]="to.theme"
            (grChange)="to.grChange && to.grChange($event)"
            (dateChange)="to.dateChange && to.dateChange($event)"
        ></jigsaw-date-time-select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldDateTimeSelect extends FormlyFieldType<JigsawDateTimeSelect> {
    defaultOptions = {
        templateOptions: {
            width: '100%',
            valid: true,
            showBorder: true,
            gr: TimeGr.date,
            openTrigger: 'click',
            closeTrigger: 'mouseleave'
        },
    };

    @ViewChild(JigsawDateTimeSelect)
    protected _instance: JigsawDateTimeSelect;
}
