import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawHeaderModule} from "@rdkmaster/jigsaw";
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldHeader} from './header.type';

@NgModule({
    declarations: [FormlyFieldHeader],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawHeaderModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'header',
                    component: FormlyFieldHeader,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class FormlyJigsawHeaderModule {
}
