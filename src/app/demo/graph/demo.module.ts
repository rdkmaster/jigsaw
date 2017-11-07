/**
 * Created by 10177553 on 2017/3/28.
 */

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BasicGraphModule} from "./basic/app.module";
import {BasicLineGraphModule} from "./line-bar-graph-basic/app.module";
import {PieGraphDemoModule} from "./pie/app.module";
import {GraphResizeModule} from "./resize/app.module";
import {GraphWithNoDataModule} from "./no-data/app.module";
import {GraphSetSizeModule} from "./set-size/app.module";
import {AjaxLineGraphModule} from "./line-bar-graph-ajax/app.module";

import {BasicGraphComponent} from "./basic/app.component";
import {GraphResizeComponent} from "./resize/app.component";
import {BasicLineGraphComponent} from "./line-bar-graph-basic/app.component";
import {AjaxLineGraphComponent} from "./line-bar-graph-ajax/app.component";
import {PieGraphDemoComponent} from "./pie/app.component";
import {GraphWithNoDataComponent} from "./no-data/app.component";

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
