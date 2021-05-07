import {Component} from '@angular/core';
import {FieldType} from "@ngx-formly/core";

/**
 * 用于处理模板类型的辅助组件
 */
@Component({
    selector: 'jigsaw-formly-template',
    template: `
        <div [trustedHtml]="to.innerHTML"></div>
    `,
})
export class FormlyTemplateFieldType extends FieldType {
}
