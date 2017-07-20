import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {DisabledComboSelectDemo} from "./app.component";

@NgModule({
    declarations: [DisabledComboSelectDemo],
    bootstrap: [DisabledComboSelectDemo],
    imports: [JigsawComboSelectModule, JigsawTileSelectModule, JigsawButtonModule]
})
export class DisabledComboSelectDemoModule {

}
