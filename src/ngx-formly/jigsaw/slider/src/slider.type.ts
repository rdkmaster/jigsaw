import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-jigsaw-slider',
    template: `
        <jigsaw-slider
            [formControl]="formControl"
            [formlyAttributes]="field"
            [width]="to.width"
            [height]="to.height"
            [valid]="to.valid"
            [min]="to.min"
            [max]="to.max"
            [step]="to.step"
            [vertical]="to.vertical"
            [disabled]="to.disabled"
            [marks]="to.marks"
            (change)="to.change && to.change($event)"
        ></jigsaw-slider>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldSlider extends FieldType {
    defaultOptions = {
        templateOptions: {
            valid: true,
            min: 0,
            max: 100,
            step: 1,
            marks: [],
        },
    };
}
