import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule, JigsawFloatModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FloatTriggerDemo} from "./demo.component";

@NgModule({
    declarations: [FloatTriggerDemo],
    exports: [FloatTriggerDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawDemoDescriptionModule, CommonModule
    ]
})
export class FloatTriggerDemoModule {
}
