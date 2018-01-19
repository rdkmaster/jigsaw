import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CheckBoxBasicDemoModule} from "./basic/demo.module";
import {CheckBoxDisableDemoModule} from "./disabled/demo.module";
import {CheckBoxFullModule} from "./full/demo.module";

import {CheckBoxFullComponent} from "./full/demo.component";
import {CheckBoxBasicDemoComponent} from "./basic/demo.component";
import {CheckBoxDisableDemoComponent} from "./disabled/demo.component";

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
