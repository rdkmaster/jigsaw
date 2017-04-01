/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { RdkTabsDemoComponent } from './basic/basic';
import {RdkTabsModule} from "../../../../component/tabs/index";
import {RouterModule} from "@angular/router";
import {RdkInputModule} from "../../../../component/input/input";
import {RdkTabsWithInputComponent} from "./withInput/withInput";
import {RdkTabsWithNgForComponent} from "./ngFor/ngFor";
import {CommonModule} from "@angular/common";

const routes=[
    {
        path:'basic', component: RdkTabsDemoComponent
    },
    {
        path:'withInput', component: RdkTabsWithInputComponent
    },
    {
        path:'withNgFor', component: RdkTabsWithNgForComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkTabsModule,RdkInputModule,
        CommonModule
    ],
    exports: [RdkTabsDemoComponent],
    declarations: [RdkTabsDemoComponent,RdkTabsWithInputComponent,RdkTabsWithNgForComponent],
    providers: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TabsDemoModule { }
