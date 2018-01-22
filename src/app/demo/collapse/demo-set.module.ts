/**
 * Created by 10177553 on 2017/4/26.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ngForDemoModule} from "./with-ngfor/demo.module";
import {CollapseBasicDemoModule} from "./basic/demo.module";
import {CollapseFullModule} from "./full/demo.module";

import {CollapseBasicDemoComponent} from "./basic/demo.component";
import {CollapseWithNGForDemoComponent} from "./with-ngfor/demo.component";
import {CollapseFullComponent} from "./full/demo.component";

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
