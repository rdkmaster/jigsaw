import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {ComboSelectLabelFieldDemo} from "./app.component";
@NgModule({
    declarations: [ComboSelectLabelFieldDemo],
    bootstrap: [ ComboSelectLabelFieldDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule]
})
export class ComboSelectLabelFieldDemoModule{

}
