import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from "@ngx-formly/core";

@Component({
    selector: 'formly-field-jigsaw-tile-lite',
    template: `
        <jigsaw-tile-lite
            [formControl]="formControl"
            [formlyAttributes]="field"
            [width]="to.width"
            [height]="to.height"
            [valid]="to.valid"
            [trackItemBy]="to.trackItemBy"
            [labelField]="to.labelField"
            [multipleSelect]="to.multipleSelect"
            [optionWidth]="to.optionWidth"
            [optionHeight]="to.optionHeight"
            [showBorder]="to.showBorder"
            [data]="to.data"
            [(selectedItems)]="to.selectedItems"
            (selectedItemsChange)="to.selectedItemsChange && to.selectedItemsChange($event)"
        ></jigsaw-tile-lite>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTileLite extends FieldType {
    defaultOptions = {
        templateOptions: {
            valid: true,
            labelField: 'label',
        },
    };
}
