import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {SelectBasicDemoComponent} from "./basic/app.component";
import {SelectBasicDemoModule} from "./basic/app.module";

import {SelectCheckboxDemoComponent} from "./checkbox/app.component";
import {SelectCheckboxDemoModule} from "./checkbox/app.module";

import {SelectScrollDemoComponent} from "./scroll/app.component";
import {SelectScrollDemoModule} from "./scroll/app.module";
import {SelectFullComponent} from "../../live-demo/select/select-full/app.component";
import {SelectFullModule} from "../../live-demo/select/select-full/app.module";

const selectDemoRoutes = [
    {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full'
    },
    {
        path: 'basic', component: SelectBasicDemoComponent
    },
    {
        path: 'scroll', component: SelectScrollDemoComponent
    },
    {
        path: 'checkbox', component: SelectCheckboxDemoComponent
    },
    {
        path: 'select-full', component: SelectFullComponent
    },
    {
        path: '**', //fallback router must in the last
        component: SelectBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(selectDemoRoutes),
        SelectBasicDemoModule,
        SelectCheckboxDemoModule,
        SelectScrollDemoModule,
        SelectFullModule
    ]
})
export class SelectDemoModule {
}
