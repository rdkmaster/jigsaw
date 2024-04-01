import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawButtonModule, JigsawUploadModule, TranslateHelper} from "@rdkmaster/jigsaw";

import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldUpload} from './upload.type';
import {FormlyUploadComponent} from "./upload.component";
import { TranslateModule } from '@ngx-translate/core';

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
        }),
        TranslateModule.forChild()
    ],
    exports: [FormlyUploadComponent]
})
export class FormlyJigsawUploadModule {
    constructor() {
        TranslateHelper.initI18n('formUpload', {
            zh: {
                "clear": "清除上传结果",
            },
            en: {
                "clear": "Clear Results",
            }
        });
    }
}
