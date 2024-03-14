import {NgModule} from '@angular/core';
import {FormlyJigsawFormFieldModule} from "@rdkmaster/formly/form-field";
import {FormlyJigsawButtonBarModule} from "@rdkmaster/formly/button-bar";
import {FormlyJigsawInputModule} from "@rdkmaster/formly/input";
import {FormlyJigsawCheckboxModule} from "@rdkmaster/formly/checkbox";
import {FormlyJigsawRadioModule} from "@rdkmaster/formly/radio";
import {FormlyJigsawSwitchModule} from '@rdkmaster/formly/switch';
import {FormlyJigsawTextAreaModule} from "@rdkmaster/formly/textarea";
import {FormlyJigsawSelectModule} from "@rdkmaster/formly/select";
import {FormlyJigsawListLiteModule} from "@rdkmaster/formly/list-lite";
import {FormlyJigsawTileLiteModule} from "@rdkmaster/formly/tile-lite";
import {FormlyJigsawSliderModule} from '@rdkmaster/formly/slider';
import {FormlyJigsawCascadeModule} from "@rdkmaster/formly/cascade";
import {FormlyJigsawDateTimeModule} from "@rdkmaster/formly/time";
import {FormlyJigsawButtonModule} from "@rdkmaster/formly/button";
import {FormlyJigsawIconModule} from "@rdkmaster/formly/icon";
import {FormlyJigsawTableModule} from "@rdkmaster/formly/table";
import {FormlyTemplateModule} from "@rdkmaster/formly/template";
import {FormlyJigsawHeaderModule} from "@rdkmaster/formly/header";
import {FormlyJigsawUploadModule} from "@rdkmaster/formly/upload";
import {FormlyFieldRepeatModule} from '@rdkmaster/formly/repeat';

@NgModule({
    imports: [
        FormlyJigsawFormFieldModule,
        FormlyJigsawButtonBarModule,
        FormlyJigsawInputModule,
        FormlyJigsawCheckboxModule,
        FormlyJigsawRadioModule,
        FormlyJigsawSwitchModule,
        FormlyJigsawTextAreaModule,
        FormlyJigsawSelectModule,
        FormlyJigsawListLiteModule,
        FormlyJigsawTileLiteModule,
        FormlyJigsawSliderModule,
        FormlyJigsawCascadeModule,
        FormlyJigsawDateTimeModule,
        FormlyJigsawButtonModule,
        FormlyJigsawIconModule,
        FormlyJigsawTableModule,
        FormlyTemplateModule,
        FormlyJigsawHeaderModule,
        FormlyJigsawUploadModule,
        FormlyFieldRepeatModule,
    ]
})
export class FormlyJigsawModule {
}
