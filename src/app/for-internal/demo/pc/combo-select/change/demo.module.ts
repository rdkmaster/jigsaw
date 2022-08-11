import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {ComboSelectChangeDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectChangeDemo],
    exports: [ComboSelectChangeDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule
    ]
})
export class ComboSelectChangeDemoModule {

}
