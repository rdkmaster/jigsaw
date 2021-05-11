import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';

import {FormlyFieldSelect} from './select.type';
import {JigsawSelectModule} from "@rdkmaster/jigsaw";
import {FormlyJigsawFormFieldModule} from "@ngx-formly/jigsaw/form-field";

@NgModule({
    declarations: [FormlyFieldSelect],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawSelectModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'select',
                    component: FormlyFieldSelect,
                    wrappers: ['form-field'],
                }
            ]
        })
    ]
})
export class FormlyJigsawSelectModule {
}
