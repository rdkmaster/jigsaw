/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { RdkTabsDemoComponent } from './basic/basic';
import {RdkTabsModule} from "../../../../component/tabs/index";
import {RouterModule} from "@angular/router";
import {RdkInputModule} from "../../../../component/input/input";
import {RdkButtonModule} from "../../../../component/button/button";
import {RdkTabsWithInputComponent} from "./withInput/withInput";
import {RdkTabsWithNgForComponent} from "./ngFor/ngFor";
import {CommonModule} from "@angular/common";
import {RdkHideTabComponent} from "./hideTab/hideTab";
import {RdkShowTabComponent} from "./showTab/showTab";
import {RdkDestoryTabComponent} from "./destoryTab/destoryTab";
import {RdkTabsComponent} from "./tabs/Tabs";
import {dynamicTabDemoComponent} from "./tabApi/dynamicTab";
import {RdkTabPane} from "../../../../component/tabs/tab-pane";
import {TabContentDefine} from "./tabApi/tabContent/tabContent";

const routes=[
    {
        path:'basic', component: RdkTabsDemoComponent
    },
    {
        path:'withInput', component: RdkTabsWithInputComponent
    },
    {
        path:'withNgFor', component: RdkTabsWithNgForComponent
    },
    {
        path:'hideTab', component: RdkHideTabComponent
    },
    {
        path:'showTab', component: RdkShowTabComponent
    },
    {
        path:'removeTab', component: RdkDestoryTabComponent
    },
    {
        path:'dynamicTab',
        component: dynamicTabDemoComponent,
        children: [{
            path: 'tabPage',
            loadChildren: './tabApi/tabContent/tab-content.module#TabContentModule'
        }]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkTabsModule,
        RdkInputModule,
        RdkButtonModule,
        CommonModule,
    ],
    exports: [RdkTabsDemoComponent],
    declarations: [
        RdkTabsDemoComponent,
        RdkTabsWithInputComponent,
        RdkTabsWithNgForComponent,
        RdkHideTabComponent,
        RdkShowTabComponent,
        RdkDestoryTabComponent,
        RdkTabsComponent,
        dynamicTabDemoComponent,
        TabContentDefine
    ],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    entryComponents: [RdkTabPane, TabContentDefine]
})
export class TabsDemoModule { }
