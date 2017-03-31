/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule} from '@angular/core';

import {RdkTabs} from './tabs';
import {TabPane} from "./tab-pane";
import {CommonModule} from "@angular/common";
import {TabLabel} from "./tab-label";
import {TabContent} from "./tab-content";

@NgModule({
    imports: [CommonModule],
    exports: [RdkTabs, TabPane],
    declarations: [RdkTabs, TabPane, TabLabel, TabContent],
    providers: [],
})
export class RdkTabsModule { }
