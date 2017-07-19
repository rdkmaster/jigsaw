import {NgModule} from "@angular/core";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {PopupService} from "jigsaw/service/popup.service";
import {DisabledComboSelectDemo} from "./app.component";

@NgModule({
    declarations: [DisabledComboSelectDemo],
    bootstrap: [DisabledComboSelectDemo],
    imports: [JigsawComboSelectModule, JigsawTileSelectModule, JigsawButtonModule],
    providers: [PopupService]
})
export class DisabledComboSelectDemoModule {

}
