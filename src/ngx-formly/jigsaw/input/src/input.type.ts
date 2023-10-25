import {AfterViewInit, ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FieldType} from '@ngx-formly/core';
import {JigsawInput, JigsawNumericInput} from "@rdkmaster/jigsaw";

@Component({
    selector: 'formly-field-jigsaw-input',
    template: `
        <jigsaw-input
            *ngIf="to.type !== 'number'; else numberTmp"
            [formlyAttributes]="field"
            [formControl]="formControl"
            [width]="to.width"
            [height]="to.height"
            [clearable]="to.clearable"
            [showBorder]="to.showBorder"
            [valid]="to.valid && !showError"
            [placeholder]="to.placeholder"
            [preIcon]="to.preIcon"
            [icon]="to.icon"
            [password]="to.password"
            [suffix]="to.suffix"
            [suffixWidth]="to.suffixWidth"
            [suffixLabelField]="to.suffixLabelField"
            [prefix]="to.prefix"
            [prefixWidth]="to.prefixWidth"
            [prefixLabelField]="to.prefixLabelField"
            [theme]="to.theme"
            (valueChange)="to.valueChange && to.valueChange($event)"
            (iconSelect)="to.iconSelect && to.iconSelect($event)"
            (preIconSelect)="to.preIconSelect && to.preIconSelect($event)"
            (suffixChange)="to.suffixChange && to.suffixChange($event)"
            (prefixChange)="to.prefixChange && to.prefixChange($event)"
        ></jigsaw-input>
        <ng-template #numberTmp>
            <jigsaw-numeric-input
                [formlyAttributes]="field"
                [formControl]="formControl"
                [width]="to.width"
                [height]="to.height"
                [min]="to.min"
                [max]="to.max"
                [step]="to.step"
                [valid]="to.valid && !showError"
                [placeholder]="to.placeholder"
                [showBorder]="to.showBorder"
                [size]="to.size"
                [showOption]="to.showOption"
                [suffix]="to.suffix"
                [suffixWidth]="to.suffixWidth"
                [suffixLabelField]="to.suffixLabelField"
                [theme]="to.theme"
                (valueChange)="to.valueChange && to.valueChange($event)"
                (suffixChange)="to.suffixChange && to.suffixChange($event)"
            ></jigsaw-numeric-input>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormlyFieldInput extends FieldType implements AfterViewInit {
    defaultOptions = {
        templateOptions: {
            width: '100%',
            valid: true,
            clearable: true,
            showBorder: true,
            min: -Infinity,
            max: Infinity,
            step: 1
        },
    };

    @ViewChild(JigsawInput)
    private _input: JigsawInput;
    @ViewChild(JigsawNumericInput)
    private _numericInput: JigsawNumericInput;

    ngAfterViewInit(): void {
        this.to.componentRef = this.to.type === 'number' ? this._numericInput : this._input;
    }
}
