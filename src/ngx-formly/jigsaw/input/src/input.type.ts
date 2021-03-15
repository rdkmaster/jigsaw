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
            [valid]="to.valid && !showError"
            [placeholder]="to.placeholder"
            [blurOnClear]="to.blurOnClear"
            [preIcon]="to.preIcon"
            [icon]="to.icon"
            [password]="to.password"
            (valueChange)="to.valueChange && to.valueChange($event)"
            (iconSelect)="to.iconSelect && to.iconSelect($event)"
            (preIconSelect)="to.preIconSelect && to.preIconSelect($event)"
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
                [size]="to.size"
                [blurOnClear]="to.blurOnClear"
                (valueChange)="to.valueChange && to.valueChange($event)"
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
            blurOnClear: true,
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
