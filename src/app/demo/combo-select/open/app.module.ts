import {NgModule} from "@angular/core";
import {OpenComboSelectDemo} from "./app.component";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/tile-select/tile-select";
import {JigsawButtonModule} from "../../../../jigsaw/component/button/button";
import {JigsawComboSelectModule} from "../../../../jigsaw/component/combo-select/index";
@NgModule({
    declarations: [OpenComboSelectDemo],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule,JigsawButtonModule]
})
export class OpenComboSelectDemoModule{

}
