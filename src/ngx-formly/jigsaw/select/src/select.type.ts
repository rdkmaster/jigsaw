import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-jigsaw-select',
    template: `
        <jigsaw-select
            [formControl]="formControl"
            [formlyAttributes]="field"
            [valid]="to.valid"
            [width]="to.width"
            [height]="to.height"
            [minWidth]="to.minWidth"
            [maxWidth]="to.maxWidth"
            [trackItemBy]="to.trackItemBy"
            [labelField]="to.labelField"
            [placeholder]="to.placeholder"
            [disabled]="to.disabled"
            [optionWidth]="to.optionWidth"
            [optionHeight]="to.optionHeight"
            [optionCount]="to.optionCount"
            [multipleSelect]="to.multipleSelect"
            [searchable]="to.searchable"
            [clearable]="to.clearable"
            [openTrigger]="to.openTrigger"
            [closeTrigger]="to.closeTrigger"
            [data]="to.data"
            [(value)]="to.value"
            (valueChange)="to.valueChange && to.valueChange($event)"
            (remove)="to.remove && to.remove($event)"
        ></jigsaw-select>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldSelect extends FieldType {
    public _$width = '100%';

    defaultOptions = {
        templateOptions: {
            valid: true,
            width: '100%',
            minWidth: '100%',
            maxWidth: '100%',
            labelField: 'label',
            openTrigger: 'mouseenter',
            closeTrigger: 'mouseleave',
        },
    };
}
