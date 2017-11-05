import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RateDemoComponent} from './rate/rate-full-demo.component';
import {RouterModule} from "@angular/router";
import {RateFullModule} from "../../live-demo/rate/rate/rate-full.module";

const rateDemoRoutes = [
    {path: 'rate-full', component: RateDemoComponent}
];

@NgModule({
    imports: [
        CommonModule,
        RateFullModule,
        RouterModule.forChild(rateDemoRoutes),
    ],
    declarations: []
})
export class RateDemoModule {
}
