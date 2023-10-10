import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {ColorType} from "@ngx-formly/jigsaw/button";
import {JigsawButtonBar} from "@rdkmaster/jigsaw";

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
            [theme]="to.theme"
            (selectedItemsChange)="to.selectedItemsChange && to.selectedItemsChange($event)"
        ></jigsaw-button-bar>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldButtonBar extends FormlyFieldType<JigsawButtonBar> {
    defaultOptions = {
        templateOptions: {
            valid: true,
            labelField: 'label',
            colorType: ColorType.primary
        },
    };

    @ViewChild(JigsawButtonBar)
    protected _instance: JigsawButtonBar;
}
