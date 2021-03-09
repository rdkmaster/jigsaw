import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawSelect} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-field-jigsaw-select',
    template: `
        <jigsaw-select
            [formControl]="formControl"
            [formlyAttributes]="field"
            [valid]="to.valid && !showError"
            [width]="to.width"
            [height]="to.height"
            [minWidth]="to.minWidth"
            [maxWidth]="to.maxWidth"
            [trackItemBy]="to.trackItemBy"
            [labelField]="to.labelField"
            [placeholder]="to.placeholder"
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
export class FormlyFieldSelect extends FormlyFieldType<JigsawSelect> {
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

    @ViewChild(JigsawSelect)
    protected _instance: JigsawSelect;
}
