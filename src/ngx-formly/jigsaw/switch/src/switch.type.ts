import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-jigsaw-switch',
    template: `
        <jigsaw-switch
            [formlyAttributes]="field"
            [formControl]="formControl"
            [(checked)]="to.checked"
            [valid]="to.valid && !showError"
            [onLabel]="to.onLabel"
            [offLabel]="to.offLabel"
            [size]="to.size"
            [disabled]="to.disabled"
            [readonly]="to.readonly"
            (change)="to.change && to.change($event)"
        ></jigsaw-switch>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldSwitch extends FieldType {
    defaultOptions = {
        templateOptions: {
            hideLabel: true,
            valid: true,
            size: 'default',
        }
    };
}
