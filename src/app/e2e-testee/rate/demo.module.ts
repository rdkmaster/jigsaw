import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";

import {RateFullModule} from "../../live-demo/rate/rate/app.module";
import {RateFullComponent} from "../../live-demo/rate/rate/app.component";
import {RateFullDemoModule} from "./rate/app.module";

const rateDemoRoutes = [
    {   path: 'rate-full',
        component: RateFullComponent
    },
    {
        path: '**', // fallback router must in the last
        component: RateFullComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RateFullModule,
        RateFullDemoModule,
        RouterModule.forChild(rateDemoRoutes),
    ],
    declarations: []
})
export class RateDemoModule {
}
