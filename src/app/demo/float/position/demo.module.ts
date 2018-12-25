import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";

import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {CommonModule} from "@angular/common";
import {JigsawFloatModule} from "../../../../jigsaw/directive/float";
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
