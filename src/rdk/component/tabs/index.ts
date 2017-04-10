/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule} from '@angular/core';

import {RdkTab} from './tab';
import {TabPane} from "./tab-pane";
import {CommonModule} from "@angular/common";
import {TabLabel} from "./tab-label";
import {TabContent} from "./tab-content";

@NgModule({
    imports: [CommonModule],
    exports: [RdkTab, TabPane],
    declarations: [RdkTab, TabPane, TabLabel, TabContent],
    providers: [],
})
export class RdkTabsModule { }
