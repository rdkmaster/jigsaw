import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawTableModule} from "@rdkmaster/jigsaw";
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldTable} from './table.type';

@NgModule({
    declarations: [FormlyFieldTable],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawTableModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'table',
                    component: FormlyFieldTable,
                    wrappers: ['form-field'],
                },
            ],
        }),
    ],
})
export class FormlyJigsawTableModule {
}
