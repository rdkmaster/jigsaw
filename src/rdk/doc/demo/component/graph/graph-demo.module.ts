/**
 * Created by 10177553 on 2017/3/28.
 */

import {NgModule} from "@angular/core";
import {RdkGraphModule} from "../../../../component/graph/index";
import {BasicGraphComponent} from "./basic/demo";
import {RouterModule} from "@angular/router";
import {BasicLineGraphComponent} from "./line-bar-graph/basic/demo";
import {AjaxLineGraphComponent} from "./line-bar-graph/from-axjx/demo";

const graphRoutes = [
    {
        path: 'basic', component: BasicGraphComponent
    },
    {
        path: 'line-bar-graph-basic', component: BasicLineGraphComponent
    },
    {
        path: 'line-bar-graph-ajax', component: AjaxLineGraphComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(graphRoutes),
        RdkGraphModule
    ],
    exports: [
        BasicGraphComponent, BasicLineGraphComponent, AjaxLineGraphComponent
    ],
    declarations: [
        BasicGraphComponent, BasicLineGraphComponent, AjaxLineGraphComponent
    ],
    providers: [],
})
export class GraphDemoModule {
}
