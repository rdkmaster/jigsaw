import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/tile/tile";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {ComboSelectWidthDemo} from "./app.component";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [ComboSelectWidthDemo],
    bootstrap: [ ComboSelectWidthDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule,CommonModule]
})
export class ComboSelectWidthDemoModule{

}
