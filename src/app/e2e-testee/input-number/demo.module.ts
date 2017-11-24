import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { InputNumberFullModule } from "../../live-demo/input-number/input-number-full/app.module";
import { InputNumberFullComponent } from "../../live-demo/input-number/input-number-full/app.component";
import { InputNumberFullDemoModule } from "./input-number/app.module";

const inputnumberDemoRoutes = [
    {   path: 'input-number-full',
        component: InputNumberFullComponent
    },
    {
        path: '**', // fallback router must in the last
        component: InputNumberFullComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        InputNumberFullModule,
        InputNumberFullDemoModule,
        RouterModule.forChild(inputnumberDemoRoutes),
    ],
    declarations: []
})
export class InputNumberDemoModule {
}
