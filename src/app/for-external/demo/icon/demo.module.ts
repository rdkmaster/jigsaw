import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../demo-template/demo-template';
import { DocTemplateModule } from '../../doc-template/doc-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { IconAllComponent } from "./demo.component";
import { JigsawIconModule } from "jigsaw/public_api";
import { CommonModule } from "@angular/common";
import { IconBasicDemoComponent } from "./basic/demo.component";
import { IconIconTextDemoComponent } from "./icon-text/demo.component";
import { IconSimilarHyperlinkComponent } from "./similar-hyperlink/demo.component";
import { IconPositionDemoComponent } from "./position/demo.component";
import { IconStatusDemoComponent } from "./status/demo.component";
import { IconCustomizeStatusDemoComponent } from "./customize-status/demo.component";

@NgModule({
    declarations: [
        IconAllComponent,
        IconBasicDemoComponent,
        IconIconTextDemoComponent,
        IconSimilarHyperlinkComponent,
        IconPositionDemoComponent,
        IconStatusDemoComponent,
        IconCustomizeStatusDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawMarkdownModule,
        JigsawIconModule,
        CommonModule
    ]
})
export class IconDemoModule {
}
