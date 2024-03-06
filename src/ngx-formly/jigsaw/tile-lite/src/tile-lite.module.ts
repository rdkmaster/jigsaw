import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {JigsawTileLiteModule} from "@rdkmaster/jigsaw";

import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyFieldTileLite} from "./tile-lite.type";

@NgModule({
    declarations: [FormlyFieldTileLite],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawTileLiteModule,
        FormlyJigsawFormFieldModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'tile-lite',
                    component: FormlyFieldTileLite,
                    wrappers: ['form-field'],
                }
            ]
        })
    ]
})
export class FormlyJigsawTileLiteModule {
}
