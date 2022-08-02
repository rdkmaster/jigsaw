import {NgModule} from "@angular/core";
import {ProcessStatusDemoComponent} from "./demo.component";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {JigsawProcessStatusModule} from "../../../../jigsaw/pc-components/process-status";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {ProcessStatusBasicComponent} from "./basic/demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {ProcessStatusCustomIconsComponent} from "./custom-icons/demo.component";
import {ProcessStatusInteractiveComponent} from "./status-interactive/demo.component";
import {JigsawTrustedHtmlModule} from "../../../../jigsaw/common/directive/trusted-html/trusted-html";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {ProcessStatusMultilineComponent} from "./status-multiline/demo.component";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {ProcessStatusVerticalFullComponent} from "./vertical/demo.component";

@NgModule({
    declarations: [ProcessStatusDemoComponent, ProcessStatusBasicComponent, ProcessStatusCustomIconsComponent, ProcessStatusInteractiveComponent,
        ProcessStatusMultilineComponent, ProcessStatusVerticalFullComponent],
    imports: [CommonModule, JigsawProcessStatusModule, JigsawMarkdownModule, DemoTemplateModule,
        JigsawTrustedHtmlModule, PerfectScrollbarModule, JigsawButtonModule]
})
export class ProcessStatusDemoModule {
}
