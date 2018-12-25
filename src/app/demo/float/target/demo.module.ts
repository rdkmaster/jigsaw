import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRadioModule} from "jigsaw/component/radio/radio";

import {FloatTargetDemo} from "./demo.component";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {CommonModule} from "@angular/common";
import {JigsawFloatModule} from "../../../../jigsaw/directive/float";

@NgModule({
    declarations: [FloatTargetDemo],
    exports: [FloatTargetDemo],
    imports: [
        JigsawFloatModule, JigsawRadioModule, JigsawDemoDescriptionModule, JigsawButtonModule, CommonModule
    ]
})
export class FloatTargetDemoModule {
}
