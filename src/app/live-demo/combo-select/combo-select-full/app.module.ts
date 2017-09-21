import {NgModule} from "@angular/core";
import {ComboSelectFullComponent} from "./app.component";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [ComboSelectFullComponent],
    bootstrap: [ComboSelectFullComponent],
    imports: [JigsawComboSelectModule, JigsawTileSelectModule, JigsawButtonModule, CommonModule]
})
export class ComboSelectFullModule {

}
