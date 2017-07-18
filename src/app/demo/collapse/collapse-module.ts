/**
 * Created by 10177553 on 2017/4/26.
 */
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

import { CollapseBasicDemoComponent } from './basic/app.component';
import {ngForDemoComponent} from "./ngFor/app.component";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {ngForDemoModule} from "./ngFor/app.module";
import {CollapseBasicDemoModule} from "./basic/app.module";

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
        CollapseBasicDemoModule,
        ngForDemoModule
    ]
})
export class CollapseDemoModule { }
