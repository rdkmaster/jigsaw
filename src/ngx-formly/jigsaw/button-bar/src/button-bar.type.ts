import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {ColorType} from "../../button/src/button.type";

@Component({
    selector: 'formly-field-jigsaw-button-bar',
    template: `
        <jigsaw-button-bar
            [formlyAttributes]="field"
            [formControl]="formControl"
            [optionWidth]="to.optionWidth"
            [colorType]="to.colorType"
            [valid]="to.valid && !showError"
            [data]="to.data"
            [trackItemBy]="to.trackItemBy"
            [labelField]="to.labelField"
            [multipleSelect]="to.multipleSelect"
            [(selectedItems)]="to.selectedItems"
            (selectedItemsChange)="to.selectedItemsChange && to.selectedItemsChange($event)"
        ></jigsaw-button-bar>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldButtonBar extends FieldType {
    defaultOptions = {
        templateOptions: {
            valid: true,
            labelField: 'label',
            colorType: ColorType.PRIMARY
        },
    };
}
