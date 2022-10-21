import { NgModule } from "@angular/core";
import { ToastDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawButtonModule, JigsawToastModule } from "jigsaw/public_api";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { ToastBasicDemoComponent } from "./basic/demo.component";
import { ToastFunctionalDemoComponent } from "./functional/demo.component";
import { ToastLongTextDemoComponent } from "./long-text/demo.component";

@NgModule({
    declarations: [
        ToastDemoComponent,
        ToastBasicDemoComponent,
        ToastFunctionalDemoComponent,
        ToastLongTextDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawMarkdownModule,
        JigsawToastModule,
        JigsawButtonModule,
    ]
})
export class ToastDemoModule {
}
