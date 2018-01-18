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

export const routerConfig = [
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
        path: 'pie', component: PieGraphDemoComponent
    },
    {
        path: 'no-data', component: GraphWithNoDataComponent
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
        GraphSetSizeModule
    ]
})
export class GraphDemoModule {
}
