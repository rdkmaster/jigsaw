import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {JigsawButtonModule} from "jigsaw/pc-components/button/button";
import {JigsawComboSelectModule} from "jigsaw/pc-components/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DisabledComboSelectDemo} from "./demo.component";

@NgModule({
    declarations: [DisabledComboSelectDemo],
    exports: [DisabledComboSelectDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, JigsawButtonModule, CommonModule,
        JigsawDemoDescriptionModule
    ]
})
export class DisabledComboSelectDemoModule {

}
