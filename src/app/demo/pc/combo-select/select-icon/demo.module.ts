import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawTileSelectModule, JigsawComboSelectModule, JigsawInputModule, JigsawHeaderModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { ComboSelectSelectIconDemo } from "./demo.component";

@NgModule({
    declarations: [ComboSelectSelectIconDemo],
    exports: [ComboSelectSelectIconDemo],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule, JigsawInputModule, JigsawHeaderModule, JigsawSwitchModule
    ]
})
export class ComboSelectSelectIconDemoModule {

}
