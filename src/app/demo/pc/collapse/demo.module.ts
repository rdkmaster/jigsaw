import {NgModule} from "@angular/core";
import {CollapseDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {CollapseBasicDemoComponent} from "./basic/demo.component";
import {JigsawButtonBarModule} from "../../../../jigsaw/pc-components/list-and-tile/button-bar";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {JigsawCollapseModule} from "../../../../jigsaw/pc-components/collapse/collapse";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";
import {CollapseRightArrowDemoComponent} from "./right-arrow/demo.component";
import {CollapseAccordionDemoComponent} from "./accordion/demo.component";
import {CommonModule} from "@angular/common";
import {CollapseAdvancedDemoComponent} from "./advanced/demo.component";
import {JigsawTableModule} from "../../../../jigsaw/pc-components/table/table";
import {JigsawGraphModule} from "../../../../jigsaw/pc-components/graph";

@NgModule({
    declarations: [CollapseDemoComponent, CollapseBasicDemoComponent, CollapseRightArrowDemoComponent, CollapseAccordionDemoComponent,
     CollapseAdvancedDemoComponent],
    imports: [DemoTemplateModule, JigsawMarkdownModule, JigsawButtonBarModule, JigsawButtonModule, JigsawCollapseModule, JigsawInputModule,
        CommonModule, JigsawTableModule, JigsawGraphModule]
})
export class CollapseDemoModule {
}
