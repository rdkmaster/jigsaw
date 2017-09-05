import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawTimeModule} from "jigsaw/component/time/index";
import {JigsawSelectModule} from "jigsaw/component/select/select";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {JigsawTileSelectModule} from "jigsaw/component/tile/tile";

import {TemplateDrivenDemoComponent} from "./app.component";

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule, CommonModule,
        JigsawInputModule, JigsawCheckBoxModule, JigsawButtonModule,
        JigsawRadioModule, JigsawComboSelectModule, JigsawRangeTimeModule,
        JigsawTimeModule, JigsawSelectModule, JigsawTableModule, JigsawSliderModule,
        JigsawSwitchModule, JigsawTileSelectModule
    ],
    declarations: [TemplateDrivenDemoComponent],
    bootstrap: [TemplateDrivenDemoComponent],
    entryComponents: []
})
export class TemplateDrivenDemoModule {

}
