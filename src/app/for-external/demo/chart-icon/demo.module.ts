import { NgModule } from "@angular/core";
import { ChartIconDemoComponent } from "./demo.component";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawChartIconModule, JigsawButtonModule, JigsawCheckBoxModule, JigsawTableModule } from "jigsaw/public_api";
import { ChartIconBasicDemoComponent } from "./basic/demo.component";
import { ChartIconButtonDemoComponent } from "./with-button/demo.component";
import { ChartIconTableDemoComponent } from "./with-table/demo.component";

@NgModule({
    declarations: [
        ChartIconDemoComponent,
        ChartIconBasicDemoComponent,
        ChartIconButtonDemoComponent,
        ChartIconTableDemoComponent
    ],
    exports: [
        ChartIconButtonDemoComponent,
        ChartIconTableDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawChartIconModule,
        JigsawButtonModule,
        JigsawCheckBoxModule,
        JigsawTableModule
    ]
})
export class ChartIconDemoModule {
}
