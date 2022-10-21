import { NgModule } from "@angular/core";
import { SwitchDemoComponent } from "./demo.component";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { SwitchBasicComponent } from "./basic/demo.component";
import { JigsawSwitchModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { SwitchWithTextDemoComponent } from "./with-text/demo.component";

@NgModule({
    declarations: [
        SwitchDemoComponent,
        SwitchBasicComponent,
        SwitchWithTextDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawSwitchModule,
        JigsawHeaderModule,
        JigsawMarkdownModule
    ]
})
export class SwitchDemoModule {
}
