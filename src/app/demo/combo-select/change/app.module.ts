import {NgModule} from "@angular/core";
import {ComboSelectChangeDemo} from "./app.component";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select";
@NgModule({
    declarations: [ComboSelectChangeDemo],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule]
})
export class ComboSelectChangeDemoModule{

}
