import {NgModule} from "@angular/core";
import {AutoCompleteDemo} from "./app.component";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {CommonModule} from "@angular/common";
import {JigsawAutoCompleteModule} from "jigsaw/component/combo-select/auto-complete";
@NgModule({
    declarations: [AutoCompleteDemo],
    bootstrap: [ AutoCompleteDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule, CommonModule, JigsawAutoCompleteModule]
})
export class AutoCompleteDemoModule{

}
