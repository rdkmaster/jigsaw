import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawFloatModule, JigsawMovableModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FloatPosReviserDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawFloatModule, JigsawMovableModule
    ],
    declarations: [FloatPosReviserDemo],
    exports: [FloatPosReviserDemo]
})
export class FloatPosReviserModule {
}
