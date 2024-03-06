import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {JigsawTrustedHtmlModule} from "@rdkmaster/jigsaw";

import {FormlyTemplateFieldType} from "./template.type";

@NgModule({
    declarations: [FormlyTemplateFieldType],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawTrustedHtmlModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'custom-template',
                    component: FormlyTemplateFieldType,
                    wrappers: ['form-field'],
                }
            ],
        }),
    ],
})
export class FormlyTemplateModule {
}
