import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-jigsaw-list-lite',
    template: `
        <jigsaw-list-lite
            [formControl]="formControl"
            [formlyAttributes]="field"
            [width]="to.width"
            [height]="to.height"
            [valid]="to.valid"
            [trackItemBy]="to.trackItemBy"
            [labelField]="to.labelField"
            [multipleSelect]="to.multipleSelect"
            [optionCount]="to.optionCount"
            [searchable]="to.searchable"
            [data]="to.data"
            [(selectedItems)]="to.selectedItems"
            (selectedItemsChange)="to.selectedItemsChange && to.selectedItemsChange($event)"
            (dataChange)="to.dataChange && to.dataChange($event)"
        ></jigsaw-list-lite>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldListLite extends FieldType {
    defaultOptions = {
        templateOptions: {
            width: '200px',
            valid: true,
            labelField: 'label',
        },
    };
}
