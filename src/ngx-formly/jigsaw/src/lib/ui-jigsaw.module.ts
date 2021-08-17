import {NgModule} from '@angular/core';
import {FormlyJigsawFormFieldModule} from "@ngx-formly/jigsaw/form-field";
import {FormlyJigsawButtonBarModule} from "@ngx-formly/jigsaw/button-bar";
import {FormlyJigsawInputModule} from "@ngx-formly/jigsaw/input";
import {FormlyJigsawCheckboxModule} from "@ngx-formly/jigsaw/checkbox";
import {FormlyJigsawRadioModule} from "@ngx-formly/jigsaw/radio";
import {FormlyJigsawSwitchModule} from '@ngx-formly/jigsaw/switch';
import {FormlyJigsawTextAreaModule} from "@ngx-formly/jigsaw/textarea";
import {FormlyJigsawSelectModule} from "@ngx-formly/jigsaw/select";
import {FormlyJigsawListLiteModule} from "@ngx-formly/jigsaw/list-lite";
import {FormlyJigsawTileLiteModule} from "@ngx-formly/jigsaw/tile-lite";
import {FormlyJigsawSliderModule} from '@ngx-formly/jigsaw/slider';
import {FormlyJigsawCascadeModule} from "@ngx-formly/jigsaw/cascade";
import {FormlyJigsawDateTimeModule} from "@ngx-formly/jigsaw/time";
import {FormlyJigsawButtonModule} from "@ngx-formly/jigsaw/button";
import {FormlyJigsawIconModule} from "@ngx-formly/jigsaw/icon";
import {FormlyJigsawTableModule} from "@ngx-formly/jigsaw/table";
import {FormlyTemplateModule} from "@ngx-formly/jigsaw/template";
import {FormlyJigsawHeaderModule} from "@ngx-formly/jigsaw/header";

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
        FormlyJigsawHeaderModule
    ]
})
export class FormlyJigsawModule {
}
