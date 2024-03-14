import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawCheckBoxModule} from "@rdkmaster/jigsaw";

import {FormlyFieldCheckbox} from './checkbox.type';
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";

@NgModule({
    declarations: [FormlyFieldCheckbox],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawCheckBoxModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'checkbox',
                    component: FormlyFieldCheckbox,
                    wrappers: ['form-field'],
                }
            ],
        }),
    ],
})
export class FormlyJigsawCheckboxModule {
}
