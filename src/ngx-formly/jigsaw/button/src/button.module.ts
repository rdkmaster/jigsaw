import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawButtonModule} from "@rdkmaster/jigsaw";

import {FormlyJigsawFormFieldModule} from "@ngx-formly/jigsaw/form-field";
import {FormlyFieldButton} from "./button.type";

@NgModule({
    declarations: [FormlyFieldButton],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawButtonModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'button',
                    component: FormlyFieldButton,
                    wrappers: ['form-field'],
                }
            ],
        }),
    ],
})
export class FormlyJigsawButtonModule {
}
