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
import {JigsawMobileEditableTabTitleRenderer} from "./tab-renderer";
import {JigsawMobileInputModule} from "../input/input";

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule, JigsawMobileListModule, JigsawMobileInputModule],
    exports: [JigsawMobileTab, JigsawMobileTabPane, JigsawMobileEditableTabTitleRenderer],
    declarations: [JigsawMobileTab, JigsawMobileTabPane, JigsawMobileTabLabel,
        JigsawMobileTabContent, JigsawMobileEditableTabTitleRenderer],
    providers: [],
    entryComponents: [JigsawMobileTabPane, JigsawMobileEditableTabTitleRenderer]
})
export class JigsawMobileTabsModule {
}

export * from './tab';
export * from './tab-pane';
export * from './tab-renderer';
