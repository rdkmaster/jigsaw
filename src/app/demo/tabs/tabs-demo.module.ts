/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from "@angular/router";

import {JigsawTabsDemoComponent} from './basic/app.component';
import {TabsBasicDemoModule} from './basic/app.module';

import {JigsawDestoryTabComponent} from "./destoryTab/app.component";
import {TabsDestroyDemoModule} from "./destoryTab/app.module";

import {JigsawHideTabComponent} from "./hideTab/app.component";
import {TabsHideTabDemoModule} from "./hideTab/app.module";

import {JigsawTabsWithNgForComponent} from "./ngFor/app.component";
import {TabsWithNgForDemoModule} from "./ngFor/app.module";

import {JigsawShowTabComponent} from "./showTab/app.component";
import {TabsShowTabDemoModule} from "./showTab/app.module";

import {DynamicTabDemoComponent} from "./tabApi/app.component";
import {DynamicTabDemoModule} from "./tabApi/app.module";

import {JigsawTabsWithInputComponent} from "./withInput/app.component";
import {TabsWithInputDemoModule} from "./withInput/app.module";

const routes = [
    {
        path: 'basic', component: JigsawTabsDemoComponent
    },
    {
        path: 'withInputAndTable', component: JigsawTabsWithInputComponent
    },
    {
        path: 'withNgFor', component: JigsawTabsWithNgForComponent
    },
    {
        path: 'hideTab', component: JigsawHideTabComponent
    },
    {
        path: 'showTab', component: JigsawShowTabComponent
    },
    {
        path: 'removeTab', component: JigsawDestoryTabComponent
    },
    {
        path: 'dynamicTab',
        component: DynamicTabDemoComponent,
        children: [{
            path: 'tabPage',
            loadChildren: './tabApi/tabContent/tab-content.module#TabContentModule'
        }]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        TabsBasicDemoModule, TabsDestroyDemoModule, TabsHideTabDemoModule, TabsShowTabDemoModule,
        DynamicTabDemoModule, TabsWithInputDemoModule, TabsWithNgForDemoModule

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsDemoModule {
}
