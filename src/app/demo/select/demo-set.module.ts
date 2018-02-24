import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelectBasicDemoModule} from "./basic/demo.module";
import {SelectScrollDemoModule} from "./scroll/demo.module";
import {SelectFullModule} from "./full/demo.module";

import {SelectBasicDemoComponent} from "./basic/demo.component";
import {SelectScrollDemoComponent} from "./scroll/demo.component";
import {SelectFullComponent} from "./full/demo.component";

export const routerConfig = [
    {
        path: 'full', component: SelectFullComponent
    },
    {
        path: 'basic', component: SelectBasicDemoComponent
    },
    {
        path: 'scroll', component: SelectScrollDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        SelectBasicDemoModule,
        SelectScrollDemoModule,
        SelectFullModule
    ]
})
export class SelectDemoModule {
}
