import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SwitchBasicDemoModule} from "./basic/demo.module";

import {SwitchBasicDemoComponent} from "./basic/demo.component";
import {ListMobileDemoModule} from "../list/demo-set.module";

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
export class SwitchMobileDemoModule { }
