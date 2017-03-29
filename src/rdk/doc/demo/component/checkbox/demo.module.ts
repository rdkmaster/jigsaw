import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RdkCheckBoxModule} from "../../../../component/checkbox/index";
import {RdkSwitchModule} from "../../../../component/switch/index";
import {CheckBoxDisableDemoComponent} from "./disabled/disabled";
import {CheckBoxBasicDemoComponent} from "./basic/basic";

const checkboxDemoRoutes = [
    {
        path: '', redirectTo: 'basic', pathMatch: 'full'
    },
    {
        path: 'basic', component: CheckBoxBasicDemoComponent
    },
    {
        path: 'disable', component: CheckBoxDisableDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: CheckBoxBasicDemoComponent
    }
];

@NgModule({
    declarations: [
        CheckBoxBasicDemoComponent, CheckBoxDisableDemoComponent
    ],
    imports: [
        RouterModule.forChild(checkboxDemoRoutes), RdkCheckBoxModule, RdkSwitchModule
    ],
    exports: [
        CheckBoxBasicDemoComponent, CheckBoxDisableDemoComponent
    ],
    providers: []
})
export class CheckBoxDemoModule {
}
