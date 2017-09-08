import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CheckBoxDisableDemoComponent} from "./disabled/app.component";
import {CheckBoxBasicDemoComponent} from "./basic/app.component";
import {CheckBoxBasicDemoModule} from "./basic/app.module";
import {CheckBoxDisableDemoModule} from "./disabled/app.module";
import {CheckBoxFullComponent} from "../../live-demo/checkbox/checkbox-full/app.component";
import {CheckBoxFullModule} from "../../live-demo/checkbox/checkbox-full/app.module";

const checkboxDemoRoutes = [
    {
        path: 'checkbox-full', component: CheckBoxFullComponent
    },
    {
        path: 'basic', component: CheckBoxBasicDemoComponent
    },
    {
        path: 'disabled', component: CheckBoxDisableDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: CheckBoxFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(checkboxDemoRoutes),
        CheckBoxBasicDemoModule,
        CheckBoxDisableDemoModule,
        CheckBoxFullModule
    ]
})
export class CheckBoxDemoModule {
}
