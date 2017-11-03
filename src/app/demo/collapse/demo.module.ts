/**
 * Created by 10177553 on 2017/4/26.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ngForDemoModule} from "./with-ngfor/app.module";
import {CollapseBasicDemoModule} from "./basic/app.module";
import {CollapseFullModule} from "./full/app.module";

import {CollapseBasicDemoComponent} from "./basic/app.component";
import {CollapseWithNGForDemoComponent} from "./with-ngfor/app.component";
import {CollapseFullComponent} from "./full/app.component";

export const routerConfig = [
    {
        path: 'basic', component: CollapseBasicDemoComponent
    }, {
        path: 'with-ngfor', component: CollapseWithNGForDemoComponent
    },
    {
        path: 'full', component: CollapseFullComponent, recommended: true
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        CollapseBasicDemoModule,
        ngForDemoModule,
        CollapseFullModule
    ]
})
export class CollapseDemoModule { }
