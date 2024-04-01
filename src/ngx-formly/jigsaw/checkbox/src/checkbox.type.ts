import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@rdkmaster/formly/form-field";
import {JigsawCheckBox} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-field-jigsaw-checkbox',
    template: `
        <jigsaw-checkbox
            [formlyAttributes]="field"
            [formControl]="formControl"
            [(checked)]="to.checked"
            [(enableIndeterminate)]="to.enableIndeterminate"
            [valid]="to.valid && !showError"
            [theme]="to.theme"
            (checkedChange)="to.checkedChange && to.checkedChange($event)"
        >
            {{to.content}}
        </jigsaw-checkbox>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.display]': "'flex'",
    },
})
export class FormlyFieldCheckbox extends FormlyFieldType<JigsawCheckBox> {
    defaultOptions = {
        templateOptions: {
            hideLabel: false,
            valid: true
        },
    };

    @ViewChild(JigsawCheckBox)
    protected _instance: JigsawCheckBox;
}
