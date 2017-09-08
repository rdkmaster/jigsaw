import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {RadioBasicDemoComponent} from "./basic/app.component";
import {RadioBasicDemoModule} from "./basic/app.module";
import {RadioFullComponent} from "../../live-demo/radio/radio-full/app.component";
import {RadioFullModule} from "../../live-demo/radio/radio-full/app.module";
import {RadioTrackItemByDemoComponent} from "./trackItemBy/app.component";
import {RadioTrackItemByDemoModule} from "./trackItemBy/app.module";

const inputDemoRoutes=[
    {
        path:'radio-full', component:RadioFullComponent
    },
    {
        path:'basic', component: RadioBasicDemoComponent
    },
    {
        path:'trackItemBy', component:RadioTrackItemByDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: RadioFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(inputDemoRoutes),
        RadioBasicDemoModule,
        RadioFullModule,
        RadioTrackItemByDemoModule
    ]
})
export class RadioDemoModule { }
