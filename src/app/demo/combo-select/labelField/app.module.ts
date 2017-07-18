import {NgModule} from "@angular/core";
import {ComboSelectLabelFieldDemo} from "./app.component";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/tile-select/tile-select";
import {JigsawComboSelectModule} from "../../../../jigsaw/component/combo-select/index";
@NgModule({
    declarations: [ComboSelectLabelFieldDemo],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule]
})
export class ComboSelectLabelFieldDemoModule{

}
