import { NgModule } from "@angular/core";
import { RateDemoComponent } from "./demo.component";
import { RateBasicDemoComponent } from "./basic/demo.component";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { JigsawRateModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { RateHalfDemoComponent } from "./half/demo.component";

@NgModule({
    declarations: [
        RateDemoComponent,
        RateBasicDemoComponent,
        RateHalfDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawRateModule,
        JigsawMarkdownModule,
        JigsawHeaderModule
    ]
})
export class RateDemoModule {
}
