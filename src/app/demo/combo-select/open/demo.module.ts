import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {OpenComboSelectDemo} from "./demo.component";

@NgModule({
    declarations: [OpenComboSelectDemo],
    exports: [OpenComboSelectDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, JigsawButtonModule, CommonModule,
        JigsawDemoDescriptionModule
    ]
})
export class OpenComboSelectDemoModule {

}
