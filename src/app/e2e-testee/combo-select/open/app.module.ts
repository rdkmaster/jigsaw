import {NgModule} from "@angular/core";
import {OpenComboSelectDemo} from "./app.component";
import {JigsawTileSelectModule} from "jigsaw/component/tile/tile";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [OpenComboSelectDemo],
    bootstrap: [ OpenComboSelectDemo ],
    imports: [JigsawComboSelectModule,JigsawTileSelectModule,JigsawButtonModule,CommonModule]
})
export class OpenComboSelectDemoModule{

}
