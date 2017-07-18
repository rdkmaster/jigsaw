import {NgModule} from "@angular/core";
import {DisabledComboSelectDemo} from "./app.component";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/tile-select/tile-select";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {JigsawComboSelectModule} from "../../../../jigsaw/component/combo-select/index";
@NgModule({
    declarations: [DisabledComboSelectDemo],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule, JigsawButtonModule]
})
export class DisabledComboSelectDemoModule{

}
