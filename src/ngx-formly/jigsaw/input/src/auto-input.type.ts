import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawAutoCompleteInput} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-field-jigsaw-auto-input',
    template: `
        <jigsaw-auto-complete-input
            [formlyAttributes]="field"
            [formControl]="formControl"
            [width]="to.width"
            [height]="to.height"
            [data]="to.data"
            [clearable]="to.clearable"
            [valid]="to.valid && !showError"
            [placeholder]="to.placeholder"
            [blurOnClear]="to.blurOnClear"
            [closeDropDownOnSelect]="to.closeDropDownOnSelect"
            [maxDropDownHeight]="to.maxDropDownHeight"
            [maxDropDownWidth]="to.maxDropDownWidth"
            [filterOnFocus]="to.filterOnFocus"
            [preIcon]="to.preIcon"
            [icon]="to.icon"
            (valueChange)="to.valueChange && to.valueChange($event)"
            (select)="to.select && to.select($event)"
            (textSelect)="to.textSelect && to.textSelect($event)"
            (iconSelect)="to.iconSelect && to.iconSelect($event)"
            (preIconSelect)="to.preIconSelect && to.preIconSelect($event)"
        ></jigsaw-auto-complete-input>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldAutoInput extends FormlyFieldType<JigsawAutoCompleteInput> {
    defaultOptions = {
        templateOptions: {
            width: '100%',
            valid: true,
            clearable: true,
            blurOnClear: true,
            maxDropDownWidth: '100%',
            maxDropDownHeight: '300px',
            closeDropDownOnSelect: true,
            filterOnFocus: true
        },
    };

    @ViewChild(JigsawAutoCompleteInput)
    protected _instance: JigsawAutoCompleteInput;
}
