import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawButtonBarModule} from "@rdkmaster/jigsaw";

import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldButtonBar} from './button-bar.type';

@NgModule({
    declarations: [FormlyFieldButtonBar],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawButtonBarModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'button-bar',
                    component: FormlyFieldButtonBar,
                    wrappers: ['form-field'],
                }
            ],
        }),
    ],
})
export class FormlyJigsawButtonBarModule {
}
