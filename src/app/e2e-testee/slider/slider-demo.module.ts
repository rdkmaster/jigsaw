/**
 * Created by 10177553 on 2017/4/13.
 */
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";

import {SliderVerticalDemo} from "./vertical/app.component";
import {SliderVerticalDemoModule} from "./vertical/app.module";

import {JigsawSliderDemoBasic} from "./basic/app.component";
import {JigsawSliderDemoModule} from "./basic/app.module";

const routes = [
    {
        path: 'basic', component:JigsawSliderDemoBasic
    },
    {
        path: 'vertical', component:SliderVerticalDemo
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes), JigsawSliderDemoModule, SliderVerticalDemoModule
    ]
})
export class SliderDemoModule { }
