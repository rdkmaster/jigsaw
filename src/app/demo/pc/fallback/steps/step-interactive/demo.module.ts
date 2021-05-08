import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawTrustedHtmlModule, JigsawStepsFallbackModule } from "jigsaw/public_api";
import { JigsawDemoDescriptionModule } from "app/demo-description/demo-description";
import { StepsClickChangeStatusComponent } from "./demo.component";

@NgModule({
    imports: [CommonModule, JigsawDemoDescriptionModule, JigsawStepsFallbackModule, JigsawTrustedHtmlModule],
    declarations: [StepsClickChangeStatusComponent],
    exports: [StepsClickChangeStatusComponent]
})
export class StepsClickChangeStatusModule {}
