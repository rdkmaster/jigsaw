import { NgModule } from "@angular/core";
import { TooltipDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawButtonModule, JigsawTooltipModule, JigsawInputModule, JigsawRadioModule } from "jigsaw/public_api";
import { TooltipBasicDemoComponent } from "./basic/demo.component";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { TooltipHtmlDemoComponent } from "./html-renderer/demo.component";
import { TooltipScenesDemoComponent } from "./scenes/demo.component";
import { TooltipTriggerDemoComponent } from "./trigger/demo.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        TooltipDemoComponent,
        TooltipBasicDemoComponent,
        TooltipHtmlDemoComponent,
        TooltipScenesDemoComponent,
        TooltipTriggerDemoComponent
    ],
    imports: [
        JigsawMarkdownModule,
        JigsawInputModule,
        JigsawTooltipModule,
        JigsawButtonModule,
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawRadioModule,
        CommonModule
    ]
})
export class TooltipDemoModule {
}
