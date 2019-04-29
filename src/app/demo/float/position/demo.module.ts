import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/pc-components/radio/radio";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawFloatModule} from "jigsaw/common/directive/float";
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
