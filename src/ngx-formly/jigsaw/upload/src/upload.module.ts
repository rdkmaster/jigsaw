import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawButtonModule, JigsawUploadModule} from "@rdkmaster/jigsaw";

import {FormlyJigsawFormFieldModule} from "@ngx-formly/jigsaw/form-field";
import {FormlyFieldUpload} from './upload.type';
import {FormlyUploadComponent} from "./upload.component";

@NgModule({
    declarations: [FormlyFieldUpload, FormlyUploadComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawButtonModule,
        JigsawUploadModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'upload',
                    component: FormlyFieldUpload,
                    wrappers: ['form-field'],
                }
            ],
        })
    ],
    exports: [FormlyUploadComponent]
})
export class FormlyJigsawUploadModule {
}
