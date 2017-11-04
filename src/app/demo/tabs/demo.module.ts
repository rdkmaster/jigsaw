/**
 * Created by 10177553 on 2017/3/29.
 */

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {TabsBasicDemoModule} from './basic/app.module';
import {TabsDestroyDemoModule} from "./destroy-tab/app.module";
import {TabsHideTabDemoModule} from "./hide-tab/app.module";
import {TabsWithNgForDemoModule} from "./with-ngfor/app.module";
import {TabsShowTabDemoModule} from "./show-tab/app.module";
import {DynamicTabDemoModule} from "./api/app.module";
import {TabsWithInputDemoModule} from "./with-input/app.module";

import {JigsawTabsDemoComponent} from "./basic/app.component";
import {JigsawTabsWithInputComponent} from "./with-input/app.component";
import {JigsawTabsWithNgForComponent} from "./with-ngfor/app.component";
import {JigsawHideTabComponent} from "./hide-tab/app.component";
import {JigsawShowTabComponent} from "./show-tab/app.component";
import {JigsawDestoryTabComponent} from "./destroy-tab/app.component";
import {DynamicTabDemoComponent} from "./api/app.component";

export const routerConfig = [
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
        path: 'hideTab', component: JigsawHideTabComponent
    },
    {
        path: 'show-tab', component: JigsawShowTabComponent
    },
    {
        path: 'destroy-tab', component: JigsawDestoryTabComponent
    },
    {
        path: 'api', component: DynamicTabDemoComponent,
        children: [
            {
                path: 'tab-page', loadChildren: './api/tabContent/tab-content.module#TabContentModule'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TabsBasicDemoModule, TabsDestroyDemoModule, TabsHideTabDemoModule, TabsShowTabDemoModule,
        DynamicTabDemoModule, TabsWithInputDemoModule, TabsWithNgForDemoModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsDemoModule {
}
