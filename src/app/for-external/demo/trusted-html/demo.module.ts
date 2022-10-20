import { NgModule } from "@angular/core";
import { TrustedHtmlDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { JigsawTrustedHtmlModule, JigsawHeaderModule, JigsawTextareaModule } from "jigsaw/public_api";
import { TrustedHtmlBasicComponent } from "./basic/demo.component";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';

@NgModule({
    declarations: [
        TrustedHtmlDemoComponent,
        TrustedHtmlBasicComponent
    ],
    imports: [
        JigsawMarkdownModule,
        CommonModule,
        FormsModule,
        JigsawTrustedHtmlModule,
        JigsawHeaderModule,
        JigsawTextareaModule,
        DemoTemplateModule,
        DocTemplateModule
    ]
})
export class TrustedHtmlDemoModule {
}
