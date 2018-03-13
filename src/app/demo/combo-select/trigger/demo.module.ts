import {NgModule} from "@angular/core";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";

import {ComboSelectTriggerDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectTriggerDemo],
    exports: [ComboSelectTriggerDemo],
    imports: [
        JigsawComboSelectModule, JigsawRadioModule,JigsawDemoDescriptionModule
    ]
})
export class ComboSelectTriggerDemoModule {
}
