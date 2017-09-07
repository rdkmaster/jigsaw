import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {ComboSelectAutoWidthDemo} from "./app.component";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [ComboSelectAutoWidthDemo],
    bootstrap: [ ComboSelectAutoWidthDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule, CommonModule]
})
export class ComboSelectAutoWidthDemoModule{

}
