import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawTextarea} from "@rdkmaster/jigsaw";

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
            [valid]="to.valid && !showError"
            (valueChange)="to.valueChange && to.valueChange($event)"
        ></jigsaw-textarea>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTextArea extends FormlyFieldType<JigsawTextarea> {
    defaultOptions = {
        templateOptions: {
            clearable: true,
            valid: true,
            width: '100%'
        }
    };

    @ViewChild(JigsawTextarea)
    protected _instance: JigsawTextarea;
}
