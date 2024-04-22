import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawAutoCompleteInputModule, JigsawInputModule, JigsawNumericInputModule} from "@rdkmaster/jigsaw";

import {FormlyFieldInput} from './input.type';
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldAutoInput} from "./auto-input.type";

@NgModule({
    declarations: [FormlyFieldInput, FormlyFieldAutoInput],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawInputModule,
        JigsawNumericInputModule,
        JigsawAutoCompleteInputModule,

        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'input',
                    component: FormlyFieldInput,
                    wrappers: ['form-field'],
                },
                {
                    name: 'number',
                    extends: 'input',
                    defaultOptions: {
                        templateOptions: {
                            type: 'number',
                        },
                    },
                },
                {
                    name: 'auto-input',
                    component: FormlyFieldAutoInput,
                    wrappers: ['form-field'],
                }
            ]
        })
    ]
})
export class FormlyJigsawInputModule {
}
