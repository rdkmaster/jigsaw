/**
 * Created by 10177553 on 2017/3/28.
 */

import { NgModule } from '@angular/core';
import {RdkGraphModule} from "../../../../component/graph/index";
import {BasicGraphComponent} from "./basic/basicGraph";
import {RouterModule} from "@angular/router";
import {PieDemoComponent} from "./pie/pieGraph";

const graphRoutes = [
    {
        path: 'basic', component:BasicGraphComponent
    },
    {
        path: 'pie', component: PieDemoComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(graphRoutes),
        RdkGraphModule
    ],
    exports: [
        BasicGraphComponent, PieDemoComponent
    ],
    declarations: [BasicGraphComponent,PieDemoComponent],
    providers: [],
})
export class GraphDemoModule { }
