/**
 * Created by 10177553 on 2017/3/28.
 */

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BasicGraphModule} from "./basic/demo.module";
import {BasicLineGraphModule} from "./line-bar-graph-basic/demo.module";
import {PieGraphDemoModule} from "./pie/demo.module";
import {GraphResizeModule} from "./resize/demo.module";
import {GraphWithNoDataModule} from "./no-data/demo.module";
import {GraphSetSizeModule} from "./set-size/demo.module";
import {AjaxLineGraphModule} from "./line-bar-graph-ajax/demo.module";

import {BasicGraphComponent} from "./basic/demo.component";
import {GraphResizeComponent} from "./resize/demo.component";
import {BasicLineGraphComponent} from "./line-bar-graph-basic/demo.component";
import {AjaxLineGraphComponent} from "./line-bar-graph-ajax/demo.component";
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

export const routerConfig = [
    {
        path: 'resize', component: GraphResizeComponent
    },
    {
        path: 'basic', component: BasicGraphComponent
    },
    {
        path: 'line-bar-graph-basic', component: BasicLineGraphComponent
    },
    {
        path: 'line-bar-graph-ajax', component: AjaxLineGraphComponent
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
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        BasicGraphModule,
        BasicLineGraphModule,
        AjaxLineGraphModule,
        PieGraphDemoModule,
        GraphResizeModule,
        GraphWithNoDataModule,
        GraphSetSizeModule,
        MapGraphModule,
        ProvinceMapGraphModule,
        GraphFormatterModule,
        DoughnutGraphModule
    ]
})
export class GraphDemoModule {
}
