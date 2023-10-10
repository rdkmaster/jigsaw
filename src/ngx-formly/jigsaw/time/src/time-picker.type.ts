import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawTimePicker, TimeGr} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-time-picker',
    template: `
        <jigsaw-time-picker
            [formlyAttributes]="field"
            [formControl]="formControl"
            [width]="to.width"
            [height]="to.height"
            [(value)]="to.value"
            [showBorder]="to.showBorder"
            [valid]="to.valid && !showError"
            [step]="to.step"
            [gr]="to.gr"
            [limitStart]="to.limitStart"
            [limitEnd]="to.limitEnd"
            [popDirection]="to.popDirection"
            [theme]="to.theme"
            (valueChange)="to.valueChange && to.valueChange($event)"
        ></jigsaw-time-picker>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTimePicker extends FormlyFieldType<JigsawTimePicker> {
    defaultOptions = {
        templateOptions: {
            valid: true,
            step: 1,
            showBorder: true,
            gr: TimeGr.time,
            popDirection: 'down',
        },
    };

    @ViewChild(JigsawTimePicker)
    protected _instance: JigsawTimePicker;
}
