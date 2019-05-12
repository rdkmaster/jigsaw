import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawInputModule} from "jigsaw/pc-components/input/input";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ComboSelectAutoCompleteDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectAutoCompleteDemo],
    exports: [ComboSelectAutoCompleteDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule
    ],
})
export class ComboSelectAutoCompleteDemoModule {

}
