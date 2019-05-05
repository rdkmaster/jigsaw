import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ComboSelectAutoWidthDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectAutoWidthDemo],
    exports: [ComboSelectAutoWidthDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule,
        JigsawDemoDescriptionModule
    ]
})
export class ComboSelectAutoWidthDemoModule {

}
