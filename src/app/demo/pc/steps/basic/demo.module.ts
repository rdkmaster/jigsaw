import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawStepBasicDemoComponent } from "./demo.component";
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
    declarations: [JigsawStepBasicDemoComponent],
    exports: [JigsawStepBasicDemoComponent]
})
export class JigsawStepBasicDemoModule {}
