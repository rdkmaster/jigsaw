import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-jigsaw-radio',
    template: `
        <jigsaw-radios-lite
            [formlyAttributes]="field"
            [formControl]="formControl"
            [(value)]="to.value"
            [data]="to.data"
            [valid]="to.valid"
            [trackItemBy]="to.trackItemBy"
            [labelField]="to.labelField"
            (valueChange)="to.valueChange && to.valueChange($event)"
        ></jigsaw-radios-lite>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldRadio extends FieldType {
    defaultOptions = {
        templateOptions: {
            valid: true,
            data: [],
            labelField: 'label'
        }
    };
}
