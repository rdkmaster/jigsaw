import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ComboSelectSetWidthDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectSetWidthDemo],
    exports: [ComboSelectSetWidthDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, JigsawInputModule, JigsawDemoDescriptionModule
    ]
})
export class ComboSelectSetWidthDemoModule {

}
