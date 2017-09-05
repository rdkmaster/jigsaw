import {NgModule} from "@angular/core";
import {ComboSelectEditableDemo} from "./app.component";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [ComboSelectEditableDemo],
    bootstrap: [ ComboSelectEditableDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule, CommonModule]
})
export class ComboSelectEditableDemoModule{

}
