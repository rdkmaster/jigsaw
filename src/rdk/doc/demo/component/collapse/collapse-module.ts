/**
 * Created by 10177553 on 2017/4/26.
 */
import { NgModule } from '@angular/core';

import { CollapseBasicDemoComponent } from './basic/basic';
import {RdkCollapseModule} from "../../../../component/collapse/collapse";
import {RouterModule} from "@angular/router";
import {RdkInputModule} from "../../../../component/input/input";
import {ngForDemoComponent} from "rdk/doc/demo/component/collapse/ngFor/ngFor";
import {CommonModule} from "@angular/common";
import {RdkButtonModule} from "../../../../component/button/button";

const routes = [
    {
        path: 'basic', component:CollapseBasicDemoComponent
    },{
        path: 'ngFor', component:ngForDemoComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkCollapseModule,
        RdkInputModule,CommonModule,RdkButtonModule
    ],
    exports: [CollapseBasicDemoComponent],
    declarations: [CollapseBasicDemoComponent,ngForDemoComponent],
    providers: [],
})
export class CollapseDemoModule { }
