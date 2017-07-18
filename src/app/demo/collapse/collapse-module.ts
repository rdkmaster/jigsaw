/**
 * Created by 10177553 on 2017/4/26.
 */
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

import { CollapseBasicDemoComponent } from './basic/basic';
import {ngForDemoComponent} from "./ngFor/ngFor";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawButtonModule} from "jigsaw/component/button/button";

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
        JigsawCollapseModule,
        JigsawInputModule,CommonModule,JigsawButtonModule
    ],
    exports: [CollapseBasicDemoComponent],
    declarations: [CollapseBasicDemoComponent,ngForDemoComponent],
    providers: [],
})
export class CollapseDemoModule { }
