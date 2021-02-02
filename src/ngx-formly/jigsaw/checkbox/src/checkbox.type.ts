import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-jigsaw-checkbox',
    template: `
        <jigsaw-checkbox
            [formlyAttributes]="field"
            [formControl]="formControl"
            [(checked)]="to.checked"
            [(enableIndeterminate)]="to.enableIndeterminate"
            [disabled]="to.disabled"
            [valid]="to.valid && !showError"
            (change)="to.change && to.change($event)"
        >
            {{to.content}}
        </jigsaw-checkbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldCheckbox extends FieldType {
    defaultOptions = {
        templateOptions: {
            hideLabel: true,
            valid: true
        },
    };
}
