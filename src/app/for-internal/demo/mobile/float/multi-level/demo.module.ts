import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawFloatModule, JigsawMobileListModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {FloatMultiLevelDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawFloatModule, JigsawMobileListModule
    ],
    declarations: [FloatMultiLevelDemo],
    exports: [FloatMultiLevelDemo]
})
export class FloatMultiLevelModule {
}
