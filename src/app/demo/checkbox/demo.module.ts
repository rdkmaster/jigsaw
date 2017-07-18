import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {JigsawCheckBoxModule} from "jigsaw/component/checkbox/index";
import {JigsawSwitchModule} from "jigsaw/component/switch/index";
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
        RouterModule.forChild(checkboxDemoRoutes), JigsawCheckBoxModule, JigsawSwitchModule
    ],
    exports: [
        CheckBoxBasicDemoComponent, CheckBoxDisableDemoComponent
    ],
    providers: []
})
export class CheckBoxDemoModule {
}
