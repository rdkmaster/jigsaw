/**
 * Created by 10177553 on 2017/3/28.
 */

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {BasicGraphComponent} from "./basic/app.component";
import {BasicLineGraphComponent} from "./line-bar-graph-basic/app.component";
import {PieGraphDemoComponent} from "./pie/app.component";
import {GraphResizeComponent} from "./resize/app.component";
import {GraphWithNoDataComponent} from "./nodata/app.component";
import {BasicGraphModule} from "./basic/app.module";
import {BasicLineGraphModule} from "./line-bar-graph-basic/app.module";
import {PieGraphDemoModule} from "./pie/app.module";
import {GraphResizeModule} from "./resize/app.module";
import {GraphWithNoDataModule} from "./nodata/app.module";
import {GraphSetSizeModule} from "./setSize/app.module";

import {AjaxLineGraphComponent} from "./line-bar-graph-ajax/app.component";
import {AjaxLineGraphModule} from "./line-bar-graph-ajax/app.module";

const graphRoutes = [
    {
        path: 'basic', component: BasicGraphComponent
    },
    {
        path: 'resize', component: GraphResizeComponent
    },
    {
        path: 'line-bar-graph-basic', component: BasicLineGraphComponent
    },
    {
        path: 'line-bar-graph-ajax', component: AjaxLineGraphComponent
    },
    {
        path: 'pie-graph-basic', component: PieGraphDemoComponent
    },
    {
        path: 'noData', component: GraphWithNoDataComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(graphRoutes),
        BasicGraphModule,
        BasicLineGraphModule,
        AjaxLineGraphModule,
        PieGraphDemoModule,
        GraphResizeModule,
        GraphWithNoDataModule,
        GraphSetSizeModule
    ]
})
export class GraphDemoModule {
}
