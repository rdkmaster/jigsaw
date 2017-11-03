import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CheckBoxBasicDemoModule} from "./basic/app.module";
import {CheckBoxDisableDemoModule} from "./disabled/app.module";
import {CheckBoxFullModule} from "./full/app.module";

import {CheckBoxFullComponent} from "./full/app.component";
import {CheckBoxBasicDemoComponent} from "./basic/app.component";
import {CheckBoxDisableDemoComponent} from "./disabled/app.component";

export const routerConfig = [
    {
        path: 'full', component: CheckBoxFullComponent, recommended: true
    },
    {
        path: 'basic', component: CheckBoxBasicDemoComponent
    },
    {
        path: 'disabled', component: CheckBoxDisableDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        CheckBoxBasicDemoModule,
        CheckBoxDisableDemoModule,
        CheckBoxFullModule
    ]
})
export class CheckBoxDemoModule {
}
