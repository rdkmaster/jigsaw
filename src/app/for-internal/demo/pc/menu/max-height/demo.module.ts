import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawButtonModule, JigsawFloatModule, JigsawHeaderModule, JigsawMenuModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/for-internal/description/demo-description";
import { MenuMaxHeightDemo } from "./demo.component";

@NgModule({
    imports: [
        CommonModule, JigsawDemoDescriptionModule, JigsawMenuModule,
        JigsawButtonModule, JigsawFloatModule, JigsawHeaderModule
    ],
    declarations: [MenuMaxHeightDemo],
    exports: [MenuMaxHeightDemo]
})
export class MenuMaxHeightDemoModule {
}
