import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMobileRadioModule} from "jigsaw/mobile-components/radio/radio";
import {JigsawMobileButtonModule} from "jigsaw/mobile-components/button/button";
import {JigsawFloatModule} from "jigsaw/common/directive/float";
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
