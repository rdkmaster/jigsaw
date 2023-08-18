import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawTileSelectModule, JigsawComboSelectModule, JigsawHeaderModule, JigsawSwitchModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { ComboSelectShowBorderDemoComponent } from "./demo.component";

@NgModule({
    declarations: [ComboSelectShowBorderDemoComponent],
    exports: [ComboSelectShowBorderDemoComponent],
    imports: [
        JigsawComboSelectModule, JigsawTileSelectModule, CommonModule,
        JigsawDemoDescriptionModule, JigsawHeaderModule, JigsawSwitchModule
    ]
})
export class ComboSelectShowBorderDemoModule {

}
