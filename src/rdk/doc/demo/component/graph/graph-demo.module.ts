/**
 * Created by 10177553 on 2017/3/28.
 */

import {NgModule} from "@angular/core";
import {RdkGraphModule} from "../../../../component/graph/index";
import {BasicGraphComponent} from "./basic/demo";
import {RouterModule} from "@angular/router";
import {BasicLineGraphComponent} from "./line-bar-graph/basic/demo";
import {AjaxLineGraphComponent} from "./line-bar-graph/from-axjx/demo";
import {PieGraphDemoComponent} from "./pie/demo";
import {GraphResizeComponent} from "./resize/demo";
import {RdkInputModule} from "../../../../component/input/input";
import {RdkSwitchModule} from "../../../../component/switch/index";
import {GraphWithNoDataComponent} from "./nodata/nodata";
import {GraphSetSizeComponent} from "./setSize/setSize";

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
        RdkGraphModule, RdkInputModule, RdkSwitchModule
    ],
    declarations: [
        BasicGraphComponent, BasicLineGraphComponent, AjaxLineGraphComponent, PieGraphDemoComponent, GraphResizeComponent,
        GraphWithNoDataComponent, GraphSetSizeComponent
    ],
})
export class GraphDemoModule {
}
