/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {JigsawTabsDemoComponent} from './basic/basic';
import {RouterModule} from "@angular/router";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawTableModule} from "jigsaw/component/table/table";
import {JigsawTabsModule} from "jigsaw/component/tabs/index";
import {JigsawTabsWithInputComponent} from "./withInput/withInput";
import {JigsawTabsWithNgForComponent} from "./ngFor/ngFor";
import {CommonModule} from "@angular/common";
import {JigsawHideTabComponent} from "./hideTab/hideTab";
import {JigsawShowTabComponent} from "./showTab/showTab";
import {JigsawDestoryTabComponent} from "./destoryTab/destoryTab";
import {JigsawTabsComponent} from "./tabs/Tabs";
import {DynamicTabDemoComponent} from "./tabApi/dynamicTab";
import {TabContentDefine} from "./tabApi/tabContent/tabContent";

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
        CommonModule,
        JigsawTabsModule,
        JigsawInputModule,
        JigsawButtonModule,
        JigsawTableModule
    ],
    exports: [JigsawTabsDemoComponent],
    declarations: [
        JigsawTabsDemoComponent,
        JigsawTabsWithInputComponent,
        JigsawTabsWithNgForComponent,
        JigsawHideTabComponent,
        JigsawShowTabComponent,
        JigsawDestoryTabComponent,
        JigsawTabsComponent,
        DynamicTabDemoComponent,
        TabContentDefine
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [TabContentDefine]
})
export class TabsDemoModule {
}
