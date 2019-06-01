/**
 * Created by 10177553 on 2017/3/29.
 */

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {TabsBasicDemoModule} from './basic/demo.module';
import {TabsDestroyDemoModule} from "./destroy-tab/demo.module";
import {TabsHideTabDemoModule} from "./hide-tab/demo.module";
import {TabsWithNgForDemoModule} from "./with-ngfor/demo.module";
import {TabsShowTabDemoModule} from "./show-tab/demo.module";
import {DynamicTabDemoModule} from "./api/demo.module";

import {JigsawMobileTabsDemoComponent} from "./basic/demo.component";
import {JigsawMobileTabsWithNgForComponent} from "./with-ngfor/demo.component";
import {JigsawHideTabComponent} from "./hide-tab/demo.component";
import {JigsawShowTabComponent} from "./show-tab/demo.component";
import {JigsawDestoryTabComponent} from "./destroy-tab/demo.component";
import {DynamicTabDemoComponent} from "./api/demo.component";
import {TabsUpdateTitleDemoComponent} from "./update-title/demo.component";
import {TabsUpdateTitleDemoModule} from "./update-title/demo.module";
import {TabsEditableDemoComponent} from "./editable/demo.component";
import {TabsEditableDemoModule} from "./editable/demo.module";
import {TabHeadlessDemoComponent} from "./headless/demo.component";
import {TabHeadlessDemoModule} from "./headless/demo.module";
import {ListMobileDemoModule} from "../list/demo-set.module";

export const routerConfig = [
    {
        path: 'api', component: DynamicTabDemoComponent,
        children: [
            {
                path: 'tab-page', loadChildren: () => import('./api/tabContent/tab-content.module').then(m => m.TabMobileContentModule)
            }
        ]
    },
    {
        path: 'basic', component: JigsawMobileTabsDemoComponent
    },
    {
        path: 'with-ngfor', component: JigsawMobileTabsWithNgForComponent
    },
    {
        path: 'hide-tab', component: JigsawHideTabComponent
    },
    {
        path: 'show-tab', component: JigsawShowTabComponent
    },
    {
        path: 'destroy-tab', component: JigsawDestoryTabComponent
    },
    {
        path: 'update-title', component: TabsUpdateTitleDemoComponent
    },
    {
        path: 'editable', component: TabsEditableDemoComponent
    },
    {
        path: 'headless', component: TabHeadlessDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TabsBasicDemoModule, TabsDestroyDemoModule, TabsHideTabDemoModule, TabsShowTabDemoModule,
        DynamicTabDemoModule, TabsWithNgForDemoModule, TabsUpdateTitleDemoModule,
        TabsEditableDemoModule, TabHeadlessDemoModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsMobileDemoModule {
}
