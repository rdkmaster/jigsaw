import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

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
            content: '按钮',
            colorType: 'default',   // 'default' | 'primary' | 'warning' | 'error' | 'danger'
            preSize: 'default',     // 'default' | 'small' | 'large'
        },
    };
}
