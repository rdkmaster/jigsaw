import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SliderVerticalDemoModule} from "./vertical/demo.module";
import {SliderBasicDemoModule} from "./basic/demo.module";

import {SliderBasicDemoComponent} from "./basic/demo.component";
import {SliderVerticalDemoComponent} from "./vertical/demo.component";
import {SliderUpdateDemoComponent} from "./update/demo.component";
import {SliderUpdateDemoModule} from "./update/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: SliderBasicDemoComponent
    },
    {
        path: 'vertical', component: SliderVerticalDemoComponent
    },
    {
        path: 'update', component: SliderUpdateDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SliderBasicDemoModule, SliderVerticalDemoModule, SliderUpdateDemoModule
    ]
})
export class SliderDemoModule { }
