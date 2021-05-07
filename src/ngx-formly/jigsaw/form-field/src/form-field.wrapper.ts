import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldWrapper} from '@ngx-formly/core';

@Component({
    selector: 'formly-wrapper-form-field',
    template: `
        <div class="jigsaw-formly-field-wrapper" [title]="to.title ? to.title : ''"
             [ngStyle]="{height: to.fixHeightInner ? '100%' : 'calc(100% - 16px)',
                        'margin-bottom': to.fixMarginBottom ? to.fixMarginBottom : '16px'}">
            <div class="jigsaw-formly-field-wrapper-label" *ngIf="!to.hideLabel" [attr.for]="id">
                <label>{{ to.label }}</label>
                <span *ngIf="to.required && to.hideRequiredMarker !== true" class="jigsaw-formly-field-required">*</span>
            </div>

            <div class="jigsaw-formly-field-wrapper-control">
                <ng-template #fieldComponent></ng-template>
            </div>

            <div *ngIf="showError" [style.display]="'block'" class="jigsaw-formly-field-wrapper-error">
                <formly-validation-message [field]="field"></formly-validation-message>
            </div>

            <small *ngIf="to.description">{{ to.description }}</small>
        </div>
    `,
    styles: [`
        .jigsaw-formly-field-wrapper {
            display: flex;
            flex-direction: column;
        }

        .jigsaw-formly-field-wrapper-label {
            min-height: 24px;
        }

        .jigsaw-formly-field-wrapper-control {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
        }

        .jigsaw-formly-field-wrapper-error {
            color: red;
            font-size: 12px;
        }

        .jigsaw-formly-field-required {
            color: red;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyWrapperFormField extends FieldWrapper {
}
