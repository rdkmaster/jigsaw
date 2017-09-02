import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {ComboSelectWidthDemo} from "./app.component";
@NgModule({
    declarations: [ComboSelectWidthDemo],
    bootstrap: [ ComboSelectWidthDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule]
})
export class ComboSelectWidthDemoModule{

}
