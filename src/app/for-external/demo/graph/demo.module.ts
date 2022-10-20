import { NgModule } from "@angular/core";
import { GraphDemoComponent } from "./demo.component";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { JigsawGraphModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { GraphBoxPlotDemoComponent } from "./box-plot/demo.component";
import { GraphDoughnutDemoComponent } from "./doughnut/demo.component";
import { GraphBasicDemoComponent } from "./basic/demo.component";
import { GraphBarChartDemoComponent } from "./bar/demo.component";
import { GraphFunnelPlotDemoComponent } from "./funnel-plot/demo.component";
import { GraphGaugeDemoComponent } from "./gauge/demo.component";
import { GraphHeatDemoComponent } from "./heat/demo.component";
import { GraphKLineDemoComponent } from "./k-line/demo.component";
import { GraphLineDemoComponent } from "./line/demo.component";
import { GraphMapDemoComponent } from "./map/demo.component";
import { GraphWithNoDataDemoComponent } from "./no-data/demo.component";
import { GraphPieDemoComponent } from "./pie/demo.component";
import { GraphProvinceMapDemoComponent } from "./province-map/demo.component";
import { GraphRadarDemoComponent } from "./radar/demo.component";
import { GraphScatterDemoComponent } from "./scatter/demo.component";
import { GraphStackAreaDemoComponent } from "./stack-area/demo.component";
import { GraphStripDemoComponent } from "./strip/demo.component";

@NgModule({
    declarations: [GraphDemoComponent,
        GraphBasicDemoComponent,
        GraphBarChartDemoComponent,
        GraphBoxPlotDemoComponent,
        GraphDoughnutDemoComponent,
        GraphFunnelPlotDemoComponent,
        GraphGaugeDemoComponent,
        GraphHeatDemoComponent,
        GraphKLineDemoComponent,
        GraphLineDemoComponent,
        GraphMapDemoComponent,
        GraphWithNoDataDemoComponent,
        GraphPieDemoComponent,
        GraphProvinceMapDemoComponent,
        GraphRadarDemoComponent,
        GraphScatterDemoComponent,
        GraphStackAreaDemoComponent,
        GraphStripDemoComponent],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        JigsawGraphModule,
        JigsawMarkdownModule,
        JigsawHeaderModule
    ]
})
export class GraphDemoModule {
}
