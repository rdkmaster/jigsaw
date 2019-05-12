import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawFloatModule} from "jigsaw/common/directive/float";
import {JigsawMobileListModule} from "jigsaw/mobile-components/list-and-tile/list";
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
