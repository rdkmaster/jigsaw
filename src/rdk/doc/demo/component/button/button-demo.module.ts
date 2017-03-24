

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBasicDemoComponent} from "./basic/basic";
import {ButtonDisableDemoComponent} from "./disabled/disabled";
import {RdkCheckBoxModule} from "../../../../component/checkbox/index";
import {RdkButton, RdkButtonModule} from "../../../../component/button/button";

const buttonDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: ButtonBasicDemoComponent
    },
    {
        path:'disable', component: ButtonDisableDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: ButtonBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        ButtonBasicDemoComponent, ButtonDisableDemoComponent
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes), RdkCheckBoxModule, RdkButtonModule
    ],
    exports: [
        ButtonBasicDemoComponent, ButtonDisableDemoComponent
    ],
    providers: []
})
export class ButtonDemoModule { }
