import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawStepsFallbackModule } from "jigsaw/public_api";
import { StepsCustomIconsComponent } from "./demo.component";
import { JigsawDemoDescriptionModule } from "../../../../../demo-description/demo-description";

@NgModule({
    imports: [CommonModule, JigsawStepsFallbackModule, JigsawDemoDescriptionModule],
    declarations: [StepsCustomIconsComponent],
    exports: [StepsCustomIconsComponent]
})
export class StepsCustomIconsModule {}
