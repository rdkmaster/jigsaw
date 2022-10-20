import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawButtonBarModule, JigsawButtonModule, JigsawCollapseModule, JigsawInputModule, JigsawTableModule, JigsawGraphModule } from "jigsaw/public_api";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { CollapseDemoComponent } from "./demo.component";
import { CollapseBasicDemoComponent } from "./basic/demo.component";
import { CollapseRightArrowDemoComponent } from "./right-arrow/demo.component";
import { CollapseAccordionDemoComponent } from "./accordion/demo.component";
import { CollapseTitleAndContentDemoComponent } from "./title-and-content/demo.component";

@NgModule({
    declarations: [
        CollapseDemoComponent,
        CollapseBasicDemoComponent,
        CollapseRightArrowDemoComponent,
        CollapseAccordionDemoComponent,
        CollapseTitleAndContentDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawButtonBarModule,
        JigsawButtonModule,
        JigsawCollapseModule,
        JigsawInputModule,
        CommonModule,
        JigsawTableModule,
        JigsawGraphModule
    ]
})
export class CollapseDemoModule {
}
