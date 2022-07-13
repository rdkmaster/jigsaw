import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawStepOverLengthDemoComponent } from "./demo.component";
import { JigsawStepsModule, JigsawHeaderModule } from "jigsaw/public_api";
import { DemoTemplateModule } from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawStepsModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        DemoTemplateModule
    ],
    declarations: [JigsawStepOverLengthDemoComponent],
    exports: [JigsawStepOverLengthDemoComponent]
})
export class JigsawStepOverLengthDemoModule {}
