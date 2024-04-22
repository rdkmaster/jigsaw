import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawSwitchModule} from "@rdkmaster/jigsaw";
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldSwitch} from "./switch.type";

@NgModule({
    declarations: [FormlyFieldSwitch],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawSwitchModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'switch',
                    component: FormlyFieldSwitch,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class FormlyJigsawSwitchModule {
}
