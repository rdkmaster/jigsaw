import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ComboSelectHeightDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectHeightDemo],
    exports: [ComboSelectHeightDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule
    ]
})
export class ComboSelectHeightDemoModule {

}
