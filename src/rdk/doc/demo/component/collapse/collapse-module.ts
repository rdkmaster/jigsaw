/**
 * Created by 10177553 on 2017/4/26.
 */
import { NgModule } from '@angular/core';

import { CollapseBasicDemoComponent } from './basic/basic';
import {RdkCollapseModule} from "../../../../component/collapse/collapse";
import {RouterModule} from "@angular/router";
import {RdkInputModule} from "../../../../component/input/input";

const routes = [
    {
        path: 'basic', component:CollapseBasicDemoComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkCollapseModule,
        RdkInputModule
    ],
    exports: [CollapseBasicDemoComponent],
    declarations: [CollapseBasicDemoComponent],
    providers: [],
})
export class CollapseDemoModule { }
