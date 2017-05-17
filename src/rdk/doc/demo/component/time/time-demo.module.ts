import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TimeBasicDemoComponent} from "./basic/basic";
import {RdkTimeModule} from "../../../../component/time/index";



const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: TimeBasicDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: TimeBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        TimeBasicDemoComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), RdkTimeModule
    ],
    exports: [
        TimeBasicDemoComponent
    ],
    providers: []
})
export class TimeDemoModule { }
