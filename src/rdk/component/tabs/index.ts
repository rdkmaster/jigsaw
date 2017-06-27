/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule} from '@angular/core';

import {RdkTab} from './tab';
import {RdkTabPane} from "./tab-pane";
import {CommonModule} from "@angular/common";
import {RdkTabContent, RdkTabLabel} from "./tab-item";

@NgModule({
    imports: [CommonModule],
    exports: [RdkTab, RdkTabPane],
    declarations: [RdkTab, RdkTabPane, RdkTabLabel, RdkTabContent],
    providers: [],
    entryComponents: [RdkTabPane]
})
export class RdkTabsModule { }

export * from './tab';
export * from './tab-pane';
