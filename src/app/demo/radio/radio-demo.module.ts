import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {RadioBasicDemoComponent} from "./basic/app.component";
import {RadioLabelFieldDemoComponent} from "./labelField/app.component";
import {RadioTrackItemByDemoComponent} from "./trackItemBy/app.component";
import {RadioBasicDemoModule} from "./basic/app.module";
import {RadioLabelFieldDemoModule} from "./labelField/app.module";
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
        path:'labelField', component:RadioLabelFieldDemoComponent
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
        RadioLabelFieldDemoModule,
        RadioTrackItemByDemoModule
    ]
})
export class RadioDemoModule { }
