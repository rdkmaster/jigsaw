/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule} from '@angular/core';

import {JigsawMobileTab} from './tab';
import {JigsawMobileTabPane} from "./tab-pane";
import {CommonModule} from "@angular/common";
import {JigsawMobileTabContent, JigsawMobileTabLabel} from "./tab-item";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {JigsawMobileListModule} from "../list-and-tile/list";

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule, JigsawMobileListModule],
    exports: [JigsawMobileTab, JigsawMobileTabPane],
    declarations: [JigsawMobileTab, JigsawMobileTabPane, JigsawMobileTabLabel, JigsawMobileTabContent],
    providers: [],
    entryComponents: [JigsawMobileTabPane]
})
export class JigsawMobileTabsModule { }

export * from './tab';
export * from './tab-pane';
export * from './tab-renderer';
