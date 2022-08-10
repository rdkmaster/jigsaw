import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawTileSelectModule, JigsawComboSelectModule, JigsawHeaderModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { ComboSelectTextTagDemoComponent } from "./demo.component";

@NgModule({
    declarations: [ComboSelectTextTagDemoComponent],
    exports: [ComboSelectTextTagDemoComponent],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule,
        JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule
    ]
})
export class ComboSelectTextTagDemoModule {

}
