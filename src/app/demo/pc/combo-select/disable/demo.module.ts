import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule, JigsawButtonModule, JigsawComboSelectModule} from "jigsaw/public_api";
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
