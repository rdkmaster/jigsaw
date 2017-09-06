import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {RadioBasicDemoComponent} from "./basic/app.component";
import {RadioLiveDemoComponent} from "../../live-demo/radio/app.component";
import {RadioTrackItemByDemoComponent} from "./trackItemBy/app.component";
import {RadioBasicDemoModule} from "./basic/app.module";
import {RadioLiveDemoModule} from "../../live-demo/radio/app.module";
import {RadioTrackItemByDemoModule} from "./trackItemBy/app.module";

const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: RadioBasicDemoComponent
    },
    {
        path:'live-demo', component:RadioLiveDemoComponent
    },
    {
        path:'trackItemBy', component:RadioTrackItemByDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: RadioBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(inputDemoRoutes),
        RadioBasicDemoModule,
        RadioLiveDemoModule,
        RadioTrackItemByDemoModule
    ]
})
export class RadioDemoModule { }
