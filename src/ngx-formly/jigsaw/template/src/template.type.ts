import {Component} from '@angular/core';
import {FieldType} from "@ngx-formly/core";

/**
 * 用于处理模板类型的辅助组件
 */
@Component({
    selector: 'jigsaw-formly-template',
    template: `
        <div class="jigsaw-formly-template" [trustedHtml]="to.innerHTML" [trustedHtmlContext]="to.context"></div>
    `,
    styles: [`
        .jigsaw-formly-template {
            font-size: var(--font-size-text-base);
            color: var(--font-color-default);
        }
    `]
})
export class FormlyTemplateFieldType extends FieldType {
}
