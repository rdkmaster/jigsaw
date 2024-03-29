import {NgModule} from "@angular/core";
import {JigsawTileSelectModule, JigsawInputModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ComboSelectSetWidthDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectSetWidthDemo],
    exports: [ComboSelectSetWidthDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, JigsawInputModule, JigsawDemoDescriptionModule
    ]
})
export class ComboSelectSetWidthDemoModule {

}
