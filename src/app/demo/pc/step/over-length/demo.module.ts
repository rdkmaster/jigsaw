import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawStepOverLengthDemoComponent } from "./demo.component";
import { JigsawStepModule, JigsawHeaderModule } from "jigsaw/public_api";

@NgModule({
    imports: [
        JigsawStepModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule
    ],
    declarations: [JigsawStepOverLengthDemoComponent],
    exports: [JigsawStepOverLengthDemoComponent]
})
export class JigsawStepOverLengthDemoModule {}
