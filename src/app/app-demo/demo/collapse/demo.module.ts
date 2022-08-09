import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { JigsawButtonBarModule, JigsawButtonModule, JigsawCollapseModule, JigsawInputModule, JigsawTableModule, JigsawGraphModule } from "jigsaw/public_api";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { JigsawMarkdownModule } from "../../../markdown/markdown";
import { CollapseDemoComponent } from "./demo.component";
import { CollapseBasicDemoComponent } from "./basic/demo.component";
import { CollapseRightArrowDemoComponent } from "./right-arrow/demo.component";
import { CollapseAccordionDemoComponent } from "./accordion/demo.component";
import { CollapseAdvancedDemoComponent } from "./advanced/demo.component";

@NgModule({
    declarations: [CollapseDemoComponent, CollapseBasicDemoComponent, CollapseRightArrowDemoComponent, CollapseAccordionDemoComponent,
        CollapseAdvancedDemoComponent],
    imports: [DemoTemplateModule, JigsawMarkdownModule, JigsawButtonBarModule, JigsawButtonModule, JigsawCollapseModule, JigsawInputModule,
        CommonModule, JigsawTableModule, JigsawGraphModule]
})
export class CollapseDemoModule {
}
