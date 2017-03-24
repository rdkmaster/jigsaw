import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CheckBoxBasicDemoComponent} from "./basic/basic";
import {RdkCheckBoxModule} from "../../../../component/checkbox/index";

const buttonDemoRoutes=[
    {
        path:'',
        redirectTo:'basic',
        pathMatch:'full'
    },
    {
        path:'basic', component: CheckBoxBasicDemoComponent
    },
    {
        path:'**', //fallback router must in the last
        component: CheckBoxBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        CheckBoxBasicDemoComponent
    ],
    imports: [
        RouterModule.forChild(buttonDemoRoutes), RdkCheckBoxModule
    ],
    exports: [
        CheckBoxBasicDemoComponent
    ],
    providers: []
})
export class CheckBoxDemoModule { }
