import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {SelectBasicDemoComponent} from "./basic/app.component";
import {SelectBasicDemoModule} from "./basic/app.module";

import {SelectCheckboxDemoComponent} from "./checkbox/app.component";
import {SelectCheckboxDemoModule} from "./checkbox/app.module";

import {SelectScrollDemoComponent} from "./scroll/app.component";
import {SelectScrollDemoModule} from "./scroll/app.module";
import {SelectLiveDemoComponent} from "../../live-demo/select/app.component";
import {SelectLiveDemoModule} from "../../live-demo/select/app.module";

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
        path: 'live-demo', component: SelectLiveDemoComponent
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
        SelectLiveDemoModule
    ]
})
export class SelectDemoModule {
}
