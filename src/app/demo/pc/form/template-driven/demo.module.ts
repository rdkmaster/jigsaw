import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawCheckBoxModule} from "jigsaw/pc-components/checkbox/index";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {JigsawTimeModule} from "jigsaw/pc-components/time/index";
import {JigsawSelectModule} from "jigsaw/pc-components/select/select";
import {JigsawTableModule} from "jigsaw/pc-components/table/table";
import {JigsawSliderModule} from "jigsaw/pc-components/slider/index";
import {JigsawSwitchModule} from "jigsaw/pc-components/switch/index";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";

import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {TemplateDrivenDemoComponent} from "./demo.component";

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule, CommonModule,
        JigsawInputModule, JigsawCheckBoxModule, JigsawButtonModule,
        JigsawRadioModule, JigsawComboSelectModule, JigsawRangeTimeModule,
        JigsawTimeModule, JigsawSelectModule, JigsawTableModule, JigsawSliderModule,
        JigsawSwitchModule, JigsawTileSelectModule, JigsawDemoDescriptionModule
    ],
    declarations: [TemplateDrivenDemoComponent],
    exports: [TemplateDrivenDemoComponent],
    entryComponents: []
})
export class TemplateDrivenDemoModule {

}
