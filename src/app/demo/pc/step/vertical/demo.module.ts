import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawStepVerticalDemoComponent } from "./demo.component";
import {
    JigsawStepModule,
    JigsawHeaderModule,
    JigsawButtonModule
} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawStepModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawButtonModule
    ],
    declarations: [JigsawStepVerticalDemoComponent],
    exports: [JigsawStepVerticalDemoComponent]
})
export class JigsawStepVerticalDemoModule {}
