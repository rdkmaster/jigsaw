/**
 * Created by 10177553 on 2017/3/28.
 */

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {JigsawGraphModule} from "jigsaw/component/graph/index";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {BasicGraphComponent} from "./basic/demo";
import {BasicLineGraphComponent} from "./line-bar-graph/basic/demo";
import {AjaxLineGraphComponent} from "./line-bar-graph/from-axjx/demo";
import {PieGraphDemoComponent} from "./pie/demo";
import {GraphResizeComponent} from "./resize/demo";
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
        JigsawGraphModule, JigsawInputModule, JigsawSwitchModule
    ],
    declarations: [
        BasicGraphComponent, BasicLineGraphComponent, AjaxLineGraphComponent, PieGraphDemoComponent, GraphResizeComponent,
        GraphWithNoDataComponent, GraphSetSizeComponent
    ],
})
export class GraphDemoModule {
}
