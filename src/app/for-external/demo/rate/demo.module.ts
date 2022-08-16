import { NgModule } from "@angular/core";
import { RateDemoComponent } from "./demo.component";
import { RateBasicDemoComponent } from "./basic/demo.component";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { JigsawRateModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { RateHalfDemoComponent } from "./half/demo.component";

@NgModule({
    declarations: [RateDemoComponent, RateBasicDemoComponent, RateHalfDemoComponent],
    imports: [DemoTemplateModule, JigsawRateModule, JigsawMarkdownModule, JigsawHeaderModule]
})
export class RateDemoModule {
}
