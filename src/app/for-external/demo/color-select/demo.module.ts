import { NgModule } from "@angular/core";
import { ColorSelectDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { ColorSelectAutoCommitDemoComponent } from "./auto-commit/demo.component";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { JigsawColorSelectModule } from "jigsaw/public_api";
import { ColorSelectManualCommitDemoComponent } from "./manual-commit/demo.component";
import { ColorSelectLimitedDemoComponent } from "./limited/demo.component";
import { ColorSelectRemoveTransparencyDemoComponent } from "./remove-transparency/demo.component";

@NgModule({
    declarations: [
        ColorSelectDemoComponent,
        ColorSelectAutoCommitDemoComponent,
        ColorSelectManualCommitDemoComponent,
        ColorSelectLimitedDemoComponent,
        ColorSelectRemoveTransparencyDemoComponent
    ],
    imports: [
        JigsawMarkdownModule,
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawColorSelectModule
    ]
})
export class ColorSelectDemoModule {
}
