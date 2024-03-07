import {Component} from '@angular/core';
import {FieldType} from "@ngx-formly/core";

/**
 * 用于处理模板类型的辅助组件
 */
@Component({
    selector: 'jigsaw-formly-template',
    template: `
        <div class="jigsaw-formly-template" [trustedHtml]="to.innerHTML" [trustedHtmlContext]="to.context"
             (click)="_$clickHandler($event)"></div>
    `,
    styles: [`
        .jigsaw-formly-template {
            font-size: var(--font-size-text-base);
            color: var(--font-color-default);
        }
    `]
})
export class FormlyTemplateFieldType extends FieldType {
    public _$clickHandler($event: MouseEvent): void {
        if (typeof this.to.click != "function") {
            return;
        }
        this.to.click($event);
    }
}
