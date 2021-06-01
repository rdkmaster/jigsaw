import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawStepVerticalDemoComponent } from "./demo.component";
import {
    JigsawStepsModule,
    JigsawHeaderModule,
    JigsawButtonModule
} from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawStepsModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawButtonModule
    ],
    declarations: [JigsawStepVerticalDemoComponent],
    exports: [JigsawStepVerticalDemoComponent]
})
export class JigsawStepVerticalDemoModule {}
