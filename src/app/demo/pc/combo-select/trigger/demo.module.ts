import {NgModule} from "@angular/core";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";

import {ComboSelectTriggerDemo} from "./demo.component";
import {JigsawButtonModule} from "../../../../../jigsaw/pc-components/button/button";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ComboSelectTriggerDemo],
    exports: [ComboSelectTriggerDemo],
    imports: [
        JigsawComboSelectModule, JigsawRadioModule,JigsawDemoDescriptionModule,JigsawButtonModule,CommonModule
    ]
})
export class ComboSelectTriggerDemoModule {
}
