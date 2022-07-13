import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { JigsawStepBasicDemoComponent } from "./demo.component";
import {
    JigsawStepsModule,
    JigsawHeaderModule,
    JigsawButtonModule
} from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";

@NgModule({
    imports: [
        JigsawStepsModule,
        CommonModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule,
        JigsawButtonModule,
        DemoTemplateModule
    ],
    declarations: [JigsawStepBasicDemoComponent],
    exports: [JigsawStepBasicDemoComponent]
})
export class JigsawStepBasicDemoModule {}
