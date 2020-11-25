import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldWrapper} from '@ngx-formly/core';

@Component({
    selector: 'formly-wrapper-form-field',
    template: `
        <div style="margin-bottom: 10px;">
            <div *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
                <label>{{ to.label }}</label>
                <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
            </div>

            <ng-template #fieldComponent></ng-template>

            <div *ngIf="showError" [style.display]="'block'">
                <formly-validation-message [field]="field"></formly-validation-message>
            </div>

            <small *ngIf="to.description">{{ to.description }}</small>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyWrapperFormField extends FieldWrapper {
}
