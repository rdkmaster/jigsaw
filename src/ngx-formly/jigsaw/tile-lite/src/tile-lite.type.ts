import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawTileLite} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-field-jigsaw-tile-lite',
    template: `
        <jigsaw-tile-lite
            [formControl]="formControl"
            [formlyAttributes]="field"
            [width]="to.width"
            [height]="to.height"
            [valid]="to.valid && !showError"
            [trackItemBy]="to.trackItemBy"
            [labelField]="to.labelField"
            [multipleSelect]="to.multipleSelect"
            [optionWidth]="to.optionWidth"
            [optionHeight]="to.optionHeight"
            [showBorder]="to.showBorder"
            [theme]="to.theme"
            [data]="to.data"
            [(selectedItems)]="to.selectedItems"
            (selectedItemsChange)="to.selectedItemsChange && to.selectedItemsChange($event)"
        ></jigsaw-tile-lite>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldTileLite extends FormlyFieldType<JigsawTileLite> {
    defaultOptions = {
        templateOptions: {
            valid: true,
            labelField: 'label',
        },
    };

    @ViewChild(JigsawTileLite)
    protected _instance: JigsawTileLite;
}
