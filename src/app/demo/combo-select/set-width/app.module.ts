import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ComboSelectSetWidthDemo} from "./app.component";

@NgModule({
    declarations: [ComboSelectSetWidthDemo],
    exports: [ComboSelectSetWidthDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, JigsawInputModule, JigsawDemoDescriptionModule
    ]
})
export class ComboSelectSetWidthDemoModule {

}
