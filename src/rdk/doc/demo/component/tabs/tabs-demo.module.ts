/**
 * Created by 10177553 on 2017/3/29.
 */

import { NgModule } from '@angular/core';

import { RdkTabsDemoComponent } from './basic/basic';
import {RdkTabsModule} from "../../../../component/tabs/index";
import {RouterModule} from "@angular/router";

const routes=[
    {
        path:'basic', component: RdkTabsDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkTabsModule
    ],
    exports: [RdkTabsDemoComponent],
    declarations: [RdkTabsDemoComponent],
    providers: [],
})
export class TabsDemoModule { }
