import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRadioModule, JigsawButtonModule, JigsawFloatModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {FloatPositionDemo} from "./demo.component";

@NgModule({
    declarations: [FloatPositionDemo],
    exports: [FloatPositionDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawDemoDescriptionModule, JigsawButtonModule, CommonModule
    ]
})
export class FloatPositionDemoModule {
}
