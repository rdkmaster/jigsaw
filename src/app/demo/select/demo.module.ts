import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelectBasicDemoModule} from "./basic/app.module";
import {SelectScrollDemoModule} from "./scroll/app.module";
import {SelectFullModule} from "./full/app.module";

import {SelectBasicDemoComponent} from "./basic/app.component";
import {SelectScrollDemoComponent} from "./scroll/app.component";
import {SelectFullComponent} from "./full/app.component";

export const routerConfig = [
    {
        path: 'basic', component: SelectBasicDemoComponent
    },
    {
        path: 'scroll', component: SelectScrollDemoComponent
    },
    {
        path: 'full', component: SelectFullComponent, recommended: true
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
