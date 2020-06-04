import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BasicGraphModule} from "./basic/demo.module";
import {LineGraphModule} from "./line/demo.module";
import {PieGraphMobileDemoModule} from "./pie/demo.module";
import {GraphResizeModule} from "./resize/demo.module";
import {GraphWithNoDataModule} from "./no-data/demo.module";
import {GraphSetSizeModule} from "./set-size/demo.module";
import {BasicGraphComponent} from "./basic/demo.component";
import {GraphResizeComponent} from "./resize/demo.component";
import {LineGraphComponent} from "./line/demo.component";
import {PieGraphDemoComponent} from "./pie/demo.component";
import {GraphWithNoDataComponent} from "./no-data/demo.component";
import {MapGraphComponent} from "./map/demo.component";
import {MapGraphModule} from "./map/demo.module";
import {ProvinceMapGraphComponent} from "./province-map/demo.component";
import {ProvinceMapGraphModule} from "./province-map/demo.module";
import {GraphFormatterComponent} from "./formatter/demo.component";
import {GraphFormatterModule} from "./formatter/demo.module";
import {DoughnutGraphComponent} from "./doughnut/demo.component";
import {DoughnutGraphModule} from "./doughnut/demo.module";
import {StripGraphComponent} from "./strip/demo.component";
import {StripGraphModule} from "./strip/demo.module";
import {StackAreaGraphComponent} from "./stack-area/demo.component";
import {StackAreaGraphModule} from "./stack-area/demo.module";
import {ScatterGraphComponent} from "./scatter/demo.component";
import {ScatterGraphModule} from "./scatter/demo.module";
import {RadarGraphComponent} from "./radar/demo.component";
import {RadarGraphModule} from "./radar/demo.module";
import {KLineGraphComponent} from "./k-line/demo.component";
import {KlineGraphModule} from "./k-line/demo.module";
import {BoxPlotGraphComponent} from "./box-plot/demo.component";
import {BoxPlotGraphModule} from "./box-plot/demo.module";
import {HeatGraphComponent} from "./heat/demo.component";
import {HeatGraphModule} from "./heat/demo.module";
import {RelationalGraphModule} from "./relational/demo.module";
import {FunnelPlotGraphComponent} from "./funnel-plot/demo.component";
import {FunnelPlotGraphModule} from "./funnel-plot/demo.module";
import {GaugeGraphComponent} from "./gauge/demo.component";
import {GaugeGraphModule} from "./gauge/demo.module";
import {BarGraphComponent} from "app/demo/mobile/graph/bar/demo.component";
import {BarGraphModule} from "./bar/demo.module";

export const routerConfig = [
    {
        path: 'resize', component: GraphResizeComponent
    },
    {
        path: 'basic', component: BasicGraphComponent
    },
    {
        path: 'line', component: LineGraphComponent
    },
    {
        path: 'pie', component: PieGraphDemoComponent
    },
    {
        path: 'no-data', component: GraphWithNoDataComponent
    },
    {
        path: 'map', component: MapGraphComponent
    },
    {
        path: 'province-map', component: ProvinceMapGraphComponent
    },
    {
        path: 'formatter', component: GraphFormatterComponent
    },
    {
        path: 'doughnut', component: DoughnutGraphComponent
    },
    {
        path: 'strip', component: StripGraphComponent
    },
    {
        path: 'stack-area', component: StackAreaGraphComponent
    },
    {
        path: 'scatter', component: ScatterGraphComponent
    },
    {
        path: 'radar', component: RadarGraphComponent
    },
    {
        path: 'k-line', component: KLineGraphComponent
    },
    {
        path: 'box-plot', component: BoxPlotGraphComponent
    },
    {
        path: 'heat', component: HeatGraphComponent
    },
    /*{
        path: 'relational', component: RelationalGraphComponent
    },*/
    {
        path: 'funnel-plot', component: FunnelPlotGraphComponent
    },
    {
        path: 'gauge', component: GaugeGraphComponent
    },
    {
        path: 'bar', component: BarGraphComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        BasicGraphModule,
        LineGraphModule,
        PieGraphMobileDemoModule,
        GraphResizeModule,
        GraphWithNoDataModule,
        GraphSetSizeModule,
        MapGraphModule,
        ProvinceMapGraphModule,
        GraphFormatterModule,
        DoughnutGraphModule,
        StripGraphModule,
        StackAreaGraphModule,
        ScatterGraphModule,
        RadarGraphModule,
        KlineGraphModule,
        BoxPlotGraphModule,
        HeatGraphModule,
        RelationalGraphModule,
        FunnelPlotGraphModule,
        GaugeGraphModule,
        BarGraphModule,
    ]
})
export class GraphMobileDemoModule {
}
