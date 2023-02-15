import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldWrapper} from '@ngx-formly/core';

@Component({
    selector: 'formly-wrapper-form-field',
    template: `
        <div class="jigsaw-formly-field-wrapper" [title]="to.title ? to.title : ''"
             [ngStyle]="{height: to.fixHeightInner == 'auto' ? 'auto' : (to.fixHeightInner ? '100%' : 'calc(100% - 16px)'),
                        'margin-bottom': to.fixMarginBottom ? to.fixMarginBottom : '16px'}">
            <div class="jigsaw-formly-field-wrapper-label" *ngIf="!to.hideLabel" [attr.for]="id">
                <span [trustedHtml]="to.label" class="jigsaw-formly-field-wrapper-label-content"></span>
                <span *ngIf="to.required && to.label" class="jigsaw-formly-field-required">*</span>
            </div>

            <div class="jigsaw-formly-field-wrapper-control">
                <ng-template #fieldComponent></ng-template>
            </div>

            <div *ngIf="showError" [style.display]="'block'" class="jigsaw-formly-field-wrapper-error">
                <formly-validation-message [field]="field"></formly-validation-message>
            </div>

            <div *ngIf="to.description && !showError" class="jigsaw-formly-field-wrapper-description">
                {{ to.description }}
            </div>
        </div>
    `,
    styles: [`
        .jigsaw-formly-field-wrapper {
            display: flex;
            flex-direction: column;
            position: relative;
        }

        .jigsaw-formly-field-wrapper-label {
            font-size: var(--font-size-text-base);
            color: var(--font-color-default);
            min-height: 22px;
            display: flex;
            align-items: center;
            margin-bottom: 4px;
        }

        .jigsaw-formly-field-wrapper-label-content {
            display: flex;
            align-items: center;
        }

        .jigsaw-formly-field-wrapper-control {
            display: flex;
            flex-direction: column;
            flex: 1;
            height: 100%;
            justify-content: center;
        }

        .jigsaw-formly-field-wrapper-error,
        .jigsaw-formly-field-wrapper-description {
            font-size: 12px;
            position: absolute;
            top: 100%;
        }

        .jigsaw-formly-field-wrapper-error {
            color: var(--error-default, red);
        }

        .jigsaw-formly-field-wrapper-description {
            color: var(--font-color-hint, #999)
        }

        .jigsaw-formly-field-required {
            margin-left: 3px;
            color: red;
            font-size: 12px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyWrapperFormField extends FieldWrapper {
}
