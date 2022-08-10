import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ComboSelectLabelFieldDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectLabelFieldDemo],
    exports: [ComboSelectLabelFieldDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule
    ]
})
export class ComboSelectLabelFieldDemoModule {

}
