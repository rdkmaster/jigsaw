import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

export enum ColorType {
    DEFAULT = 'default', PRIMARY = 'primary', WARNING = 'warning', ERROR = 'error', DANGER = 'danger'
}

enum SizeType {
    DEFAULT = 'default', SMALL = 'small', LARGE = 'large'
}

@Component({
    selector: 'formly-field-jigsaw-button',
    template: `
        <jigsaw-button width="100%"
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
export class FormlyFieldButton extends FieldType {
    defaultOptions = {
        templateOptions: {
            hideLabel: true,
            content: '按钮',
            colorType: ColorType.DEFAULT,
            preSize: SizeType.DEFAULT
        },
    };
}
