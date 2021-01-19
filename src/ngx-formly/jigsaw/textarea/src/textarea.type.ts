import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-jigsaw-textarea',
    template: `
        <jigsaw-textarea
            [formControl]="formControl"
            [formlyAttributes]="field"
            [width]="to.width"
            [height]="to.height"
            [(value)]="to.value"
            [clearable]="to.clearable"
            [placeholder]="to.placeholder"
            [disabled]="to.disabled"
            [valid]="to.valid"
            (valueChange)="to.valueChange && to.valueChange($event)"
        ></jigsaw-textarea>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTextArea extends FieldType {
    defaultOptions = {
        templateOptions: {
            clearable: true,
            valid: true,
            width: '100%'
        }
    };
}
