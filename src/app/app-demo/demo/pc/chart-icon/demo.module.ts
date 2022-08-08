import { NgModule } from "@angular/core";
import { ChartIconDemoComponent } from "./demo.component";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { JigsawMarkdownModule } from "../../../markdown/markdown";
import { JigsawChartIconModule, JigsawButtonModule, JigsawCheckBoxModule, JigsawHeaderModule, JigsawTableModule } from "jigsaw/public_api";
import { ChartIconBasicDemoComponent } from "./basic/demo.component";
import { ChartIconButtonDemoComponent } from "./with-button/demo.component";
import { ChartIconTableDemoComponent } from "./with-table/demo.component";

@NgModule({
    declarations: [ChartIconDemoComponent, ChartIconBasicDemoComponent, ChartIconButtonDemoComponent, ChartIconTableDemoComponent],
    exports: [
        ChartIconButtonDemoComponent,
        ChartIconTableDemoComponent
    ],
    imports: [DemoTemplateModule, JigsawMarkdownModule, JigsawChartIconModule, JigsawButtonModule, JigsawCheckBoxModule, JigsawHeaderModule,
        JigsawTableModule]
})
export class ChartIconDemoModule {
}
