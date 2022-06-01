import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyJigsawFormFieldModule} from "@ngx-formly/jigsaw/form-field";
import {JigsawTrustedHtmlModule} from "@rdkmaster/jigsaw";

import {FormlyTemplateFieldType} from "./template.type";
import {FormlyFieldRepeat} from "./repeat.type";

@NgModule({
    declarations: [FormlyTemplateFieldType, FormlyFieldRepeat],
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
                },
                {
                    name: 'repeat',
                    component: FormlyFieldRepeat,
                }
            ],
        }),
    ],
})
export class FormlyTemplateModule {
}
