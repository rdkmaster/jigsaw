import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawListLite} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-field-jigsaw-list-lite',
    template: `
        <jigsaw-list-lite
            [formControl]="formControl"
            [formlyAttributes]="field"
            [width]="to.width"
            [height]="to.height"
            [valid]="to.valid && !showError"
            [trackItemBy]="to.trackItemBy"
            [labelField]="to.labelField"
            [multipleSelect]="to.multipleSelect"
            [optionCount]="to.optionCount"
            [searchable]="to.searchable"
            [theme]="to.theme"
            [data]="to.data"
            [(selectedItems)]="to.selectedItems"
            (selectedItemsChange)="to.selectedItemsChange && to.selectedItemsChange($event)"
            (dataChange)="to.dataChange && to.dataChange($event)"
        ></jigsaw-list-lite>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldListLite extends FormlyFieldType<JigsawListLite> {
    defaultOptions = {
        templateOptions: {
            width: '200px',
            valid: true,
            labelField: 'label',
        },
    };

    @ViewChild(JigsawListLite)
    protected _instance: JigsawListLite;
}
