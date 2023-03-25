import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawButton} from "@rdkmaster/jigsaw";

export enum ColorType {
    default = 'default', primary = 'primary', warning = 'warning', error = 'error', danger = 'danger'
}

export enum SizeType {
    default = 'default', small = 'small', medium = 'medium', large = 'large'
}

@Component({
    selector: 'formly-field-jigsaw-button',
    template: `
        <jigsaw-button [width]="to.width ? to.width : '100%'"
                       [formlyAttributes]="field"
                       [disabled]="to.disabled"
                       [colorType]="to.colorType"
                       [preSize]="to.preSize"
                       [icon]="to.icon"
                       (click)="to.click"
        >{{to.content}}</jigsaw-button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldButton extends FormlyFieldType<JigsawButton> {
    defaultOptions = {
        templateOptions: {
            hideLabel: false,
            colorType: ColorType.default,
            preSize: SizeType.default
        },
    };

    @ViewChild(JigsawButton)
    protected _instance: JigsawButton;
}
