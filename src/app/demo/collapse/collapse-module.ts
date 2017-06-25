/**
 * Created by 10177553 on 2017/4/26.
 */
import { NgModule } from '@angular/core';

import { CollapseBasicDemoComponent } from './basic/basic';
import {RdkCollapseModule} from "../../../rdk/component/collapse/collapse";
import {RouterModule} from "@angular/router";
import {RdkInputModule} from "../../../rdk/component/input/input";
import {ngForDemoComponent} from "app/demo/collapse/ngFor/ngFor";
import {CommonModule} from "@angular/common";
import {RdkButtonModule} from "../../../rdk/component/button/button";

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
