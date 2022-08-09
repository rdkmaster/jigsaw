import { NgModule } from "@angular/core";
import { ProcessStatusDemoComponent } from "./demo.component";
import { CommonModule } from "@angular/common";
import { JigsawMarkdownModule } from "../../markdown/markdown";
import { ProcessStatusBasicComponent } from "./basic/demo.component";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { ProcessStatusCustomIconsComponent } from "./custom-icons/demo.component";
import { ProcessStatusInteractiveComponent } from "./status-interactive/demo.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ProcessStatusMultilineComponent } from "./status-multiline/demo.component";
import { JigsawButtonModule, JigsawProcessStatusModule, JigsawTrustedHtmlModule } from "jigsaw/public_api";
import { ProcessStatusVerticalFullComponent } from "./vertical/demo.component";

@NgModule({
    declarations: [ProcessStatusDemoComponent, ProcessStatusBasicComponent, ProcessStatusCustomIconsComponent, ProcessStatusInteractiveComponent,
        ProcessStatusMultilineComponent, ProcessStatusVerticalFullComponent],
    imports: [CommonModule, JigsawProcessStatusModule, JigsawMarkdownModule, DemoTemplateModule,
        JigsawTrustedHtmlModule, PerfectScrollbarModule, JigsawButtonModule]
})
export class ProcessStatusDemoModule {
}
