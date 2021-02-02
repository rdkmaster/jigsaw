import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({
    selector: 'formly-field-jigsaw-icon',
    template: `
        <jigsaw-icon
            [formlyAttributes]="field"
            [title]="to.title"
            [isLinkButton]="to.isLinkButton"
            [icon]="to.icon"
            [iconSize]="to.iconSize"
            [iconColor]="to.iconColor"
            [text]="to.text"
            [textSize]="to.textSize"
            [textColor]="to.textColor"
            [iconPosition]="to.iconPosition"
            [href]="to.href"
            [target]="to.target"
        ></jigsaw-icon>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldIcon extends FieldType {
    defaultOptions = {
        templateOptions: {
            hideLabel: true,
            iconPosition: 'left',
        },
    };
}
