import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawTileSelectModule, JigsawComboSelectModule, JigsawHeaderModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/app-develop/demo-description/demo-description";
import { ComboSelectValidDemoComponent } from "./demo.component";

@NgModule({
    declarations: [ComboSelectValidDemoComponent],
    exports: [ComboSelectValidDemoComponent],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule,
        JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule
    ]
})
export class ComboSelectValidDemoModule {

}
