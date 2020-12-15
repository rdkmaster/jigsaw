/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

import {JigsawTab, JigsawTabBar} from './tab';
import {JigsawTabPane} from "./tab-pane";
import {JigsawTabContent, JigsawTabLabel} from "./tab-item";
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawEditableTabTitleRenderer} from "./tab-renderer";
import {JigsawInputModule} from "../input/input";
import {JigsawFloatModule} from "../../common/directive/float/float";
import {JigsawTrustedHtmlModule} from "../../common/directive/trusted-html/trusted-html";

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule, JigsawListModule, JigsawInputModule, JigsawFloatModule, JigsawTrustedHtmlModule],
    exports: [JigsawTab, JigsawTabPane, JigsawEditableTabTitleRenderer, JigsawTabBar],
    declarations: [JigsawTab, JigsawTabPane, JigsawTabLabel, JigsawTabContent, JigsawEditableTabTitleRenderer, JigsawTabBar],
    providers: []
})
export class JigsawTabsModule {
}

export * from './tab';
export * from './tab-pane';
export * from './tab-renderer';
