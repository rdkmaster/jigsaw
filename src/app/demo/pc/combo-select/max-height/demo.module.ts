import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ComboSelectMaxHeightDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectMaxHeightDemo],
    exports: [ComboSelectMaxHeightDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule
    ]
})
export class ComboSelectMaxHeightDemoModule {

}
