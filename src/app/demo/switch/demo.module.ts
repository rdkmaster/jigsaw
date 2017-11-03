import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SwitchBasicDemoModule} from "./basic/app.module";

import {SwitchBasicDemoComponent} from "./basic/app.component";

export const routerConfig = [
    {
        path: 'basic', component: SwitchBasicDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SwitchBasicDemoModule
    ]
})
export class SwitchDemoModule { }
