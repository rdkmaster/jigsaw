import {NgModule} from "@angular/core";
import {RateDemoComponent} from "./demo.component";
import {RateBasicDemoComponent} from "./basic/demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawRateModule} from "../../../../jigsaw/pc-components/rate";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawHeaderModule} from "../../../../jigsaw/pc-components/header/header";
import {RateHalfDemoComponent} from "./half/demo.component";

@NgModule({
    declarations: [RateDemoComponent, RateBasicDemoComponent, RateHalfDemoComponent],
    imports: [DemoTemplateModule, JigsawRateModule, JigsawMarkdownModule, JigsawHeaderModule]
})
export class RateDemoModule {
}
