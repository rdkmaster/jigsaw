/**
 * Created by 10177553 on 2017/3/28.
 */

import { NgModule } from '@angular/core';
import {RdkGraphModule} from "../../../../component/graph/index";
import {BasicGraphComponent} from "./basic/basicGraph";
import {RouterModule} from "@angular/router";
import {PieDemoComponent} from "./pie/pieGraph";
import {LineBarGraphDemoComponent} from "./linebargraph/linebargraph";
import {GraphSetSizeComponent} from "./setSize/setSize";

const graphRoutes = [
    {
        path: 'basic', component:BasicGraphComponent
    },
    {
        path: 'pie', component: PieDemoComponent
    },
    {
        path: 'linebargraph', component: LineBarGraphDemoComponent
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
        BasicGraphComponent, PieDemoComponent,LineBarGraphDemoComponent
    ],
    declarations: [BasicGraphComponent,PieDemoComponent,
        GraphSetSizeComponent,LineBarGraphDemoComponent],
    providers: [],
})
export class GraphDemoModule { }
