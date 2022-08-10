import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioModule, JigsawFloatModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
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
