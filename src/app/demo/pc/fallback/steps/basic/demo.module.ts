import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawStepsFallbackModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { StepsHorizontalBasicComponent } from "./demo.component";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawStepsFallbackModule],
    declarations: [StepsHorizontalBasicComponent],
    exports: [StepsHorizontalBasicComponent]
})
export class StepsHorizontalBasicModule {}
