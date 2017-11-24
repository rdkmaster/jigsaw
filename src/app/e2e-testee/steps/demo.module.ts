import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { StepsFullModule } from "../../live-demo/steps/steps-full/app.module";
import { StepsFullComponent } from "../../live-demo/steps/steps-full/app.component";
import { StepsFullDemoModule } from "./steps/app.module";

const stepsDemoRoutes = [
    {   path: 'steps-full',
        component: StepsFullComponent
    },
    {
        path: '**', // fallback router must in the last
        component: StepsFullComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        StepsFullModule,
        StepsFullDemoModule,
        RouterModule.forChild(stepsDemoRoutes),
    ],
    declarations: []
})
export class StepsDemoModule {
}
