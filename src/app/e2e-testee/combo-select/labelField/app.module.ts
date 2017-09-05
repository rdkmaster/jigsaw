import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/tile/tile";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {ComboSelectLabelFieldDemo} from "./app.component";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [ComboSelectLabelFieldDemo],
    bootstrap: [ ComboSelectLabelFieldDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule,CommonModule]
})
export class ComboSelectLabelFieldDemoModule{

}
