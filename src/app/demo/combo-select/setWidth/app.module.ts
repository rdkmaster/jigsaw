import {NgModule} from "@angular/core";
import {ComboSelectSetWidthDemo} from "./app.component";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/tile-select/tile-select";
import {JigsawInputModule} from "../../../../jigsaw/component/input/input";
import {JigsawComboSelectModule} from "../../../../jigsaw/component/combo-select/index";
@NgModule({
    declarations: [ComboSelectSetWidthDemo],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule, JigsawInputModule]
})
export class ComboSelectSetWidthDemoModule{

}
