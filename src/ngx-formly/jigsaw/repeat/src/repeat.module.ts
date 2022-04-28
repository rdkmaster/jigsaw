import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormlyModule} from '@ngx-formly/core';
import {ReactiveFormsModule} from '@angular/forms';
import {JigsawButtonModule, JigsawUploadModule} from '@rdkmaster/jigsaw';

import {FormlyFieldRepeat} from './repeat.type';

@NgModule({
    declarations: [FormlyFieldRepeat],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        JigsawButtonModule,
        JigsawUploadModule,
        FormlyModule.forChild({
            types: [
                {
                    name: 'repeat',
                    component: FormlyFieldRepeat,
                },
            ],
        }),
    ],
})
export class FormlyFieldRepeatModule {
}
