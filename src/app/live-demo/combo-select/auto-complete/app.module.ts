import {NgModule} from "@angular/core";
import {ComboSelectAutoCompleteDemo} from "./app.component";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";

@NgModule({
    declarations: [ComboSelectAutoCompleteDemo],
    bootstrap: [ ComboSelectAutoCompleteDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule, CommonModule],
})
export class ComboSelectAutoCompleteDemoModule{

}
