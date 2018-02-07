/**
 * Created by 10177553 on 2017/4/13.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SliderVerticalDemoModule} from "./vertical/demo.module";
import {SliderBasicDemoModule} from "./basic/demo.module";

import {SliderBasicDemoComponent} from "./basic/demo.component";
import {SliderVerticalDemoComponent} from "./vertical/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: SliderBasicDemoComponent
    },
    {
        path: 'vertical', component: SliderVerticalDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SliderBasicDemoModule, SliderVerticalDemoModule
    ]
})
export class SliderDemoModule { }
