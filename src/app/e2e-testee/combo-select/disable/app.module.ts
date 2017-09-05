import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/tile/tile";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {DisabledComboSelectDemo} from "./app.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [DisabledComboSelectDemo],
    bootstrap: [DisabledComboSelectDemo],
    imports: [JigsawComboSelectModule, JigsawTileSelectModule, JigsawButtonModule, CommonModule]
})
export class DisabledComboSelectDemoModule {

}
