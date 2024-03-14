import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {JigsawSliderModule} from "@rdkmaster/jigsaw";

import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldSlider} from "./slider.type";

@NgModule({
    declarations: [FormlyFieldSlider],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawSliderModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'slider',
                    component: FormlyFieldSlider,
                    wrappers: ['form-field'],
                }
            ]
        })
    ]
})
export class FormlyJigsawSliderModule {
}
