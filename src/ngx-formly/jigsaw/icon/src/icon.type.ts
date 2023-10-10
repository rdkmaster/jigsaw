import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {FormlyFieldType} from "@ngx-formly/jigsaw/form-field";
import {JigsawIcon} from "@rdkmaster/jigsaw";

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
            [theme]="to.theme"
        ></jigsaw-icon>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldIcon extends FormlyFieldType<JigsawIcon> {
    defaultOptions = {
        templateOptions: {
            hideLabel: false,
            iconPosition: 'left',
        },
    };

    @ViewChild(JigsawIcon)
    protected _instance: JigsawIcon;
}
