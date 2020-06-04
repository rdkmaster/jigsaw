import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule, JigsawComboSelectModule, JigsawInputModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ComboSelectAutoCompleteDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectAutoCompleteDemo],
    exports: [ComboSelectAutoCompleteDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule
    ],
})
export class ComboSelectAutoCompleteDemoModule {

}
