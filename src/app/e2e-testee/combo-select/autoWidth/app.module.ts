import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {ComboSelectAutoWidthDemo} from "./app.component";
@NgModule({
    declarations: [ComboSelectAutoWidthDemo],
    bootstrap: [ ComboSelectAutoWidthDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule]
})
export class ComboSelectAutoWidthDemoModule{

}
