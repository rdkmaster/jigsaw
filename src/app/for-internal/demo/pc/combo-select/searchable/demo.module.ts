import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule, JigsawComboSelectModule, JigsawInputModule, JigsawSwitchModule, JigsawButtonBarModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ComboSelectAutoCompleteDemo} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [ComboSelectAutoCompleteDemo],
    exports: [ComboSelectAutoCompleteDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule
    , JigsawHeaderModule, JigsawSwitchModule, JigsawButtonBarModule],
})
export class ComboSelectAutoCompleteDemoModule {

}
