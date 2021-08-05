import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SliderVerticalDemoModule} from "./vertical/demo.module";
import {SliderBasicDemoModule} from "./basic/demo.module";
import {SliderBasicDemoComponent} from "./basic/demo.component";
import {SliderVerticalDemoComponent} from "./vertical/demo.component";
import {SliderUpdateDemoComponent} from "./update/demo.component";
import {SliderUpdateDemoModule} from "./update/demo.module";
import {SliderMultiValueComponent} from "./handling-multi-value/demo.component";
import {SliderMultiValueDemoModule} from "./handling-multi-value/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: SliderBasicDemoComponent
    },
    {
        path: 'vertical', component: SliderVerticalDemoComponent
    },
    {
        path: 'update', component: SliderUpdateDemoComponent
    },
    {
        path: 'handling-multi-value', component: SliderMultiValueComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SliderBasicDemoModule, SliderVerticalDemoModule, SliderUpdateDemoModule, SliderMultiValueDemoModule
    ]
})
export class SliderDemoModule { }
