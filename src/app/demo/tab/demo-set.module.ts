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
import {TabsWithInputDemoModule} from "./with-input/demo.module";

import {JigsawTabsDemoComponent} from "./basic/demo.component";
import {JigsawTabsWithInputComponent} from "./with-input/demo.component";
import {JigsawTabsWithNgForComponent} from "./with-ngfor/demo.component";
import {JigsawHideTabComponent} from "./hide-tab/demo.component";
import {JigsawShowTabComponent} from "./show-tab/demo.component";
import {JigsawDestoryTabComponent} from "./destroy-tab/demo.component";
import {DynamicTabDemoComponent} from "./api/demo.component";
import {TabsUpdateTitleDemoComponent} from "./update-title/demo.component";
import {TabsUpdateTitleDemoModule} from "./update-title/demo.module";

export const routerConfig = [
    {
        path: 'api', component: DynamicTabDemoComponent,
        children: [
            {
                path: 'tab-page', loadChildren: './api/tabContent/tab-content.module#TabContentModule'
            }
        ]
    },
    {
        path: 'basic', component: JigsawTabsDemoComponent
    },
    {
        path: 'with-input', component: JigsawTabsWithInputComponent
    },
    {
        path: 'with-ngfor', component: JigsawTabsWithNgForComponent
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
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TabsBasicDemoModule, TabsDestroyDemoModule, TabsHideTabDemoModule, TabsShowTabDemoModule,
        DynamicTabDemoModule, TabsWithInputDemoModule, TabsWithNgForDemoModule, TabsUpdateTitleDemoModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsDemoModule {
}
