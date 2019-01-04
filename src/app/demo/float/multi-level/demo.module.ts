import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawFloatModule} from "jigsaw/directive/float";
import {JigsawListModule} from "jigsaw/component/list-and-tile/list";
import {FloatMultiLevelDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawFloatModule, JigsawListModule
    ],
    declarations: [FloatMultiLevelDemo],
    exports: [FloatMultiLevelDemo]
})
export class FloatMultiLevelModule {
}
