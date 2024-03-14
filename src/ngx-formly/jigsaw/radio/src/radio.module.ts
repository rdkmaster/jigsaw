import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';

import {FormlyFieldRadio} from './radio.type';
import {JigsawRadioLiteModule} from "@rdkmaster/jigsaw";
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";

@NgModule({
    declarations: [FormlyFieldRadio],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawRadioLiteModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'radio',
                    component: FormlyFieldRadio,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class FormlyJigsawRadioModule {
}
