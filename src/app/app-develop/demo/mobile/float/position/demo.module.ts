import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRadioModule, JigsawMobileButtonModule, JigsawFloatModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {FloatPositionDemo} from "./demo.component";

@NgModule({
    declarations: [FloatPositionDemo],
    exports: [FloatPositionDemo],
    imports: [
        JigsawFloatModule, JigsawMobileRadioModule, JigsawDemoDescriptionModule, JigsawMobileButtonModule, CommonModule
    ]
})
export class FloatPositionDemoModule {
}
