import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';

import {FormlyFieldTextArea} from './textarea.type';
import {JigsawTextareaModule} from "@rdkmaster/jigsaw";
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";

@NgModule({
    declarations: [FormlyFieldTextArea],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawTextareaModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'textarea',
                    component: FormlyFieldTextArea,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class FormlyJigsawTextAreaModule {
}
