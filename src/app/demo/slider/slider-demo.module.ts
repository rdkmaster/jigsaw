/**
 * Created by 10177553 on 2017/4/13.
 */
import { NgModule } from '@angular/core';

import {RdkSliderDemoBasic} from "./basic/basic";
import {RouterModule} from "@angular/router";
import {RdkSliderModule} from "../../../rdk/component/slider/index";
import {RdkSwitchModule} from "../../../rdk/component/switch/index";
import {SliderVerticalDemo} from "./vertical/vertical";

const routes = [
    {
        path: 'basic', component:RdkSliderDemoBasic
    },
    {
        path: 'vertical', component:SliderVerticalDemo
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkSliderModule,
        RdkSwitchModule
    ],
    exports: [RdkSliderDemoBasic, SliderVerticalDemo],
    declarations: [RdkSliderDemoBasic, SliderVerticalDemo],
    providers: [],
})
export class SliderDemoModule { }
