/**
 * Created by 10177553 on 2017/4/13.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SliderVerticalDemoModule} from "./vertical/app.module";
import {SliderBasicDemoModule} from "./basic/app.module";

import {SliderBasicDemoComponent} from "./basic/app.component";
import {SliderVerticalDemoComponent} from "./vertical/app.component";

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
