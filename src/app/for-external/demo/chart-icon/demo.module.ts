import { NgModule } from "@angular/core";
import { ChartIconDemoComponent } from "./demo.component";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { JigsawChartIconModule, JigsawButtonModule, JigsawCheckBoxModule, JigsawTableModule } from "jigsaw/public_api";
import { ChartIconBasicDemoComponent } from "./basic/demo.component";
import { ChartIconButtonDemoComponent } from "./with-button/demo.component";
import { ChartIconTableDemoComponent } from "./with-table/demo.component";

@NgModule({
    declarations: [ChartIconDemoComponent, ChartIconBasicDemoComponent, ChartIconButtonDemoComponent, ChartIconTableDemoComponent],
    exports: [
        ChartIconButtonDemoComponent,
        ChartIconTableDemoComponent
    ],
    imports: [DemoTemplateModule, JigsawMarkdownModule, JigsawChartIconModule, JigsawButtonModule, JigsawCheckBoxModule,
        JigsawTableModule]
})
export class ChartIconDemoModule {
}
