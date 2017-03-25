

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {InputBasicDemoComponent} from "./basic/basic";

import {RdkInputModule} from "../../../../component/input/input";


const inputDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: InputBasicDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: InputBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        InputBasicDemoComponent
    ],
    imports: [
        RouterModule.forChild(inputDemoRoutes), RdkInputModule
    ],
    exports: [
        InputBasicDemoComponent
    ],
    providers: []
})
export class InputDemoModule { }
