import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawSwitch} from "@rdkmaster/jigsaw";

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
            [readonly]="to.readonly"
            [theme]="to.theme"
            (checkedChange)="to.checkedChange && to.checkedChange($event)"
        ></jigsaw-switch>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.display]': "'flex'",
    },
})
export class FormlyFieldSwitch extends FormlyFieldType<JigsawSwitch> {
    defaultOptions = {
        templateOptions: {
            hideLabel: false,
            valid: true,
            size: 'default',
        }
    };

    @ViewChild(JigsawSwitch)
    protected _instance: JigsawSwitch;
}
