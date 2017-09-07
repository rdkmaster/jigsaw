import {NgModule} from "@angular/core";
import {ComboSelectAutoCompleteDemo} from "./app.component";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [ComboSelectAutoCompleteDemo],
    bootstrap: [ ComboSelectAutoCompleteDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule, CommonModule]
})
export class ComboSelectAutoCompleteDemoModule{

}
