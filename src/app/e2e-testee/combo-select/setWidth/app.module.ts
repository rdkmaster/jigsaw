import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {ComboSelectSetWidthDemo} from "./app.component";
@NgModule({
    declarations: [ComboSelectSetWidthDemo],
    bootstrap: [ ComboSelectSetWidthDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule, JigsawInputModule]
})
export class ComboSelectSetWidthDemoModule{

}
