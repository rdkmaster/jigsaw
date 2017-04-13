/**
 * Created by 10177553 on 2017/3/28.
 */

import { NgModule } from '@angular/core';
import {RdkGraphModule} from "../../../../component/graph/index";
import {BasicGraphComponent} from "./basic/basic-graph";
import {RouterModule} from "@angular/router";
import {PieDemoComponent} from "./pie/pieGraph";
import { LineBarGraphArrayDemoComponent } from "./line-bar-graph/fromArray/linebargraphArray";
import { LineBarGraphAxjxDemoComponent } from "./line-bar-graph/fromAxjx/linebargraphAxjx";
import {GraphSetSizeComponent} from "./setSize/setSize";

const graphRoutes = [
    {
        path: 'basic', component:BasicGraphComponent
    },
    {
        path: 'pie', component: PieDemoComponent
    },
    {
        path: 'line-bar-graph-array', component: LineBarGraphArrayDemoComponent
    },
    {
        path: 'line-bar-graph-axjx', component: LineBarGraphAxjxDemoComponent
    },
    {
        path: 'setSize', component: GraphSetSizeComponent
    }


]

@NgModule({
    imports: [
        RouterModule.forChild(graphRoutes),
        RdkGraphModule
    ],
    exports: [
        BasicGraphComponent, PieDemoComponent,LineBarGraphAxjxDemoComponent,LineBarGraphArrayDemoComponent
    ],
    declarations: [BasicGraphComponent,PieDemoComponent,
        GraphSetSizeComponent,LineBarGraphAxjxDemoComponent,LineBarGraphArrayDemoComponent],
    providers: [],
})
export class GraphDemoModule { }
