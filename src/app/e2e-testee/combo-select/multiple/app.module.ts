import {NgModule} from "@angular/core";
import {ComboSelectMultipleDemo} from "./app.component";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
@NgModule({
    declarations: [ComboSelectMultipleDemo],
    bootstrap: [ ComboSelectMultipleDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule, JigsawButtonModule]
})
export class ComboSelectMultipleDemoModule{

}
