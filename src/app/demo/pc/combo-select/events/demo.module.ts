import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule, JigsawButtonModule, JigsawComboSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {ComboSelectChangeTriggerDemo} from "./demo.component";

@NgModule({
    declarations: [ComboSelectChangeTriggerDemo],
    exports: [ComboSelectChangeTriggerDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, JigsawButtonModule, CommonModule,
        JigsawDemoDescriptionModule
    ]
})
export class ComboSelectChangeTriggerDemoModule {

}
