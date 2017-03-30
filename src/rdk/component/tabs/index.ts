/**
 * Created by 10177553 on 2017/3/29.
 */

import { NgModule } from '@angular/core';

import {RdkTabs} from './tabs';
import {TabPane} from "./tab-pane";
import {CommonModule} from "@angular/common";
import {RdkLabel} from "./tab-label";
import {RdkTabContent} from "./tab-content";

@NgModule({
    imports: [CommonModule],
    exports: [RdkTabs, TabPane],
    declarations: [RdkTabs, TabPane, RdkLabel, RdkTabContent],
    providers: [],
})
export class RdkTabsModule { }
