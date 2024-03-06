import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {JigsawCascadeModule, JigsawComboSelectModule} from "@rdkmaster/jigsaw";

import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldCascade} from "./cascade.type";

@NgModule({
    declarations: [FormlyFieldCascade],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawComboSelectModule,
        JigsawCascadeModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'cascade',
                    component: FormlyFieldCascade,
                    wrappers: ['form-field'],
                }
            ]
        })
    ]
})
export class FormlyJigsawCascadeModule {
}
