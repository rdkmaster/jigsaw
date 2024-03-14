import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawIconModule} from "@rdkmaster/jigsaw";

import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldIcon} from "./icon.type";

@NgModule({
    declarations: [FormlyFieldIcon],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawIconModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'icon',
                    component: FormlyFieldIcon,
                    wrappers: ['form-field'],
                }
            ],
        }),
    ],
})
export class FormlyJigsawIconModule {
}
