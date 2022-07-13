import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SliderAllModule} from "./demo.module";
import {SliderAllComponent} from "./demo.component";

export const routerConfig = [
    {
        path: 'all', component: SliderAllComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig), SliderAllModule
    ]
})
export class SliderDemoModule { }
