import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';

import {FormlyFieldSelect} from './select.type';
import {JigsawSelectModule} from "@rdkmaster/jigsaw";
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldSelectGroup} from "./select-group.type";
import {FormlyFieldSelectCollapse} from "./select-collpase.type";

@NgModule({
    declarations: [FormlyFieldSelect, FormlyFieldSelectGroup, FormlyFieldSelectCollapse],
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
                },
                {
                    name: 'select-group',
                    component: FormlyFieldSelectGroup,
                    wrappers: ['form-field'],
                },
                {
                    name: 'select-collapse',
                    component: FormlyFieldSelectCollapse,
                    wrappers: ['form-field'],
                }
            ]
        })
    ]
})
export class FormlyJigsawSelectModule {
}
