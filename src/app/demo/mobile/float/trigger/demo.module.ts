import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMobileRadioModule} from "jigsaw/mobile-components/radio/radio";
import {JigsawFloatModule} from "jigsaw/common/directive/float";

import {FloatTriggerDemo} from "./demo.component";

@NgModule({
    declarations: [FloatTriggerDemo],
    exports: [FloatTriggerDemo],
    imports: [
        JigsawFloatModule, JigsawMobileRadioModule, JigsawDemoDescriptionModule, CommonModule
    ]
})
export class FloatTriggerDemoModule {
}
