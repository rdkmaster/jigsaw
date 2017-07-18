import {NgModule} from "@angular/core";
import {ComboSelectWidthDemo} from "./app.component";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/tile-select/tile-select";
import {JigsawComboSelectModule} from "../../../../jigsaw/component/combo-select/index";
@NgModule({
    declarations: [ComboSelectWidthDemo],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule]
})
export class ComboSelectWidthDemoModule{

}
