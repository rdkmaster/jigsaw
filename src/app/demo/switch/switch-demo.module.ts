import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SwitchBasicDemoComponent} from "./basic/app.component";
import {SwitchBasicDemoModule} from "./basic/app.module";


const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: SwitchBasicDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: SwitchBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(inputDemoRoutes), SwitchBasicDemoComponent
    ]
})
export class SwitchDemoModule { }
