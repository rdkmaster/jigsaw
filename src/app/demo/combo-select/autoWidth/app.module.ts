import {NgModule} from "@angular/core";
import {ComboSelectAutoWidthDemo} from "./app.component";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/tile-select/tile-select";
import {JigsawComboSelectModule} from "../../../../jigsaw/component/combo-select/index";
@NgModule({
    declarations: [ComboSelectAutoWidthDemo],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule]
})
export class ComboSelectAutoWidthDemoModule{

}
