import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ComboSelectMaxHeightDemo} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [ComboSelectMaxHeightDemo],
    exports: [ComboSelectMaxHeightDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule
    , JigsawHeaderModule]
})
export class ComboSelectMaxHeightDemoModule {

}
