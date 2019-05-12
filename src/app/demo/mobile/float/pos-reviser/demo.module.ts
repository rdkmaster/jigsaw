import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawFloatModule} from "jigsaw/common/directive/float";
import {JigsawMovableModule} from "jigsaw/common/directive/movable";
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
