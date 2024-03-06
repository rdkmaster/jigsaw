import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@rdkmaster/formly/form-field";
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
            [showBorder]="to.showBorder"
            [resize]="to.resize"
            [maxLength]="to.maxContentLength"
            [includesCRLF]="to.includesCRLF"
            [valid]="to.valid && !showError"
            [theme]="to.theme"
            (valueChange)="to.valueChange && to.valueChange($event)"
        ></jigsaw-textarea>
    `,
    host: {
        '[style.flex]': '1',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTextArea extends FormlyFieldType<JigsawTextarea> {
    defaultOptions = {
        templateOptions: {
            clearable: true,
            showBorder: true,
            valid: true,
            width: '100%',
            height: '100%',
            maxContentLength: 0
        }
    };

    @ViewChild(JigsawTextarea)
    protected _instance: JigsawTextarea;
}
