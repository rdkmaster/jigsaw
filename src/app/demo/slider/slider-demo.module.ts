/**
 * Created by 10177553 on 2017/4/13.
 */
import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {JigsawSliderModule} from "jigsaw/component/slider/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
import {SliderVerticalDemo} from "./vertical/vertical";
import {JigsawSliderDemoBasic} from "./basic/basic";

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
        RouterModule.forChild(routes),
        JigsawSliderModule,
        JigsawSwitchModule
    ],
    exports: [JigsawSliderDemoBasic, SliderVerticalDemo],
    declarations: [JigsawSliderDemoBasic, SliderVerticalDemo],
    providers: [],
})
export class SliderDemoModule { }
