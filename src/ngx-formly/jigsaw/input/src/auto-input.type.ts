import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

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
            [disabled]="to.disabled"
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
export class FormlyFieldAutoInput extends FieldType {
    defaultOptions = {
        templateOptions: {
            width: '100%',
            disabled: false,
            valid: true,
            clearable: true,
            blurOnClear: true,
            maxDropDownWidth: '100%',
            maxDropDownHeight: '300px',
            closeDropDownOnSelect: true,
            filterOnFocus: true
        },
    };
}
