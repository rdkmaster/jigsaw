import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {JigsawListLiteModule} from "@rdkmaster/jigsaw";

import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldListLite} from "./list-lite.type";

@NgModule({
    declarations: [FormlyFieldListLite],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawListLiteModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'list-lite',
                    component: FormlyFieldListLite,
                    wrappers: ['form-field'],
                }
            ]
        })
    ]
})
export class FormlyJigsawListLiteModule {
}
