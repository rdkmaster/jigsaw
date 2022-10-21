import { NgModule } from "@angular/core";
import { HeaderFirstLevelComponent } from "./first-level/demo.component";
import { HeaderSecondLevelComponent } from "./second-level/demo.component";
import { HeaderThirdLevelComponent } from "./third-level/demo.component";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { JigsawHeaderModule } from "jigsaw/public_api";
import { HeaderDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
@NgModule({
    declarations: [
        HeaderFirstLevelComponent,
        HeaderSecondLevelComponent,
        HeaderThirdLevelComponent,
        HeaderDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawHeaderModule,
        JigsawMarkdownModule
    ],
})
export class HeaderDemoModule {
}
