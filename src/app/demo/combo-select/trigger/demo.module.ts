import {NgModule} from "@angular/core";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";

import {ComboSelectTriggerDemo} from "./demo.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
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
