import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
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
