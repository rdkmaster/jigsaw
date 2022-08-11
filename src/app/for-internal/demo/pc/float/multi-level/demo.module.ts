import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMenuModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {FloatMultiLevelDemo} from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule
    ],
    declarations: [FloatMultiLevelDemo],
    exports: [FloatMultiLevelDemo]
})
export class FloatMultiLevelModule {
}
