import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ngForDemoModule} from "./with-ngfor/demo.module";
import {CollapseBasicDemoModule} from "./basic/demo.module";
import {CollapseFullModule} from "./full/demo.module";

import {CollapseBasicDemoComponent} from "./basic/demo.component";
import {CollapseWithNGForDemoComponent} from "./with-ngfor/demo.component";
import {CollapseFullComponent} from "./full/demo.component";
import {CollapseAllComponent} from "./all/demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";

export const routerConfig = [
    {
        path: 'all', component: CollapseAllComponent
    },
    {
        path: 'basic', component: CollapseBasicDemoComponent
    },
    {
        path: 'with-ngfor', component: CollapseWithNGForDemoComponent
    },
    {
        path: 'full', component: CollapseFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        CollapseBasicDemoModule,
        ngForDemoModule,
        CollapseFullModule,
        JigsawMarkdownModule
    ],
    declarations: [CollapseAllComponent]
})
export class CollapseDemoModule { }
