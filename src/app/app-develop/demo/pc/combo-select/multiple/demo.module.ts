import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule, JigsawButtonModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {ComboSelectMultipleDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectMultipleDemo],
    exports: [ComboSelectMultipleDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, JigsawButtonModule, CommonModule,
        JigsawDemoDescriptionModule
    ]
})
export class ComboSelectMultipleDemoModule {

}
