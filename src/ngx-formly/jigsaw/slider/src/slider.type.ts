import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawSlider} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-field-jigsaw-slider',
    template: `
        <jigsaw-slider
            [formControl]="formControl"
            [formlyAttributes]="field"
            [width]="to.width"
            [height]="to.height"
            [valid]="to.valid && !showError"
            [min]="to.min"
            [max]="to.max"
            [step]="to.step"
            [vertical]="to.vertical"
            [marks]="to.marks"
            [theme]="to.theme"
            (valueChange)="to.valueChange && to.valueChange($event)"
        ></jigsaw-slider>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.display]': "'flex'",
    },
})
export class FormlyFieldSlider extends FormlyFieldType<JigsawSlider> {
    defaultOptions = {
        templateOptions: {
            valid: true,
            min: 0,
            max: 100,
            step: 1,
            marks: [],
        },
    };

    @ViewChild(JigsawSlider)
    protected _instance: JigsawSlider;
}
