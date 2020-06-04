import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawFloatModule, JigsawMovableModule, JigsawSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {FloatPosReviserDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawFloatModule, JigsawMovableModule,
        JigsawSelectModule
    ],
    declarations: [FloatPosReviserDemo],
    exports: [FloatPosReviserDemo]
})
export class FloatPosReviserModule {
}
