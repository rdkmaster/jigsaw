import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {DisabledComboSelectDemo} from "./app.component";

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
