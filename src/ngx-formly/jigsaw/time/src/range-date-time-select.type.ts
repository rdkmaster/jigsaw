import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawRangeDateTimeSelect, TimeGr} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-range-date-time-select',
    template: `
        <jigsaw-range-date-time-select
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
            [step]="to.step"
            [placeholder]="to.placeholder"
            [showBorder]="to.showBorder"
            [openTrigger]="to.openTrigger"
            [closeTrigger]="to.closeTrigger"
            [weekStart]="to.weekStart"
            [theme]="to.theme"
            (grChange)="to.grChange && to.grChange($event)"
            (dateChange)="to.dateChange && to.dateChange($event)"
        ></jigsaw-range-date-time-select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldRangeDateTimeSelect extends FormlyFieldType<JigsawRangeDateTimeSelect> {
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

    @ViewChild(JigsawRangeDateTimeSelect)
    protected _instance: JigsawRangeDateTimeSelect;
}
