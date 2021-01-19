import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {TimeGr} from '@rdkmaster/jigsaw';

@Component({
    selector: 'formly-field-jigsaw-time-picker',
    template: `
        <jigsaw-time-picker
            [formlyAttributes]="field"
            [formControl]="formControl"
            [width]="to.width"
            [height]="to.height"
            [(value)]="to.value"
            [disabled]="to.disabled"
            [valid]="to.valid"
            [step]="to.step"
            [gr]="to.gr"
            [limitStart]="to.limitStart"
            [limitEnd]="to.limitEnd"
            [popDirection]="to.popDirection"
            (valueChange)="to.valueChange && to.valueChange($event)"
        ></jigsaw-time-picker>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTimePicker extends FieldType {
    defaultOptions = {
        templateOptions: {
            disabled: false,
            valid: true,
            step: 1,
            gr: TimeGr.time,
            popDirection: 'down',
        },
    };

    public _$valueChange(event): void {
        if (this.to.valueChange) {
            this.to.valueChange(event);
        }
        console.log(' ======> ', this.model['timePicker']);
        // this.model['timePicker'] = event;
        // console.log(' ======> ', this.model['timePicker']);
    }
}
