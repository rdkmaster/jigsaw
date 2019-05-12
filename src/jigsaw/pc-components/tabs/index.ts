/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";

import {JigsawTab} from './tab';
import {JigsawTabPane} from "./tab-pane";
import {JigsawTabContent, JigsawTabLabel} from "./tab-item";
import {JigsawListModule} from "../list-and-tile/list";
import {JigsawEditableTabTitleRenderer} from "./tab-renderer";
import {JigsawInputModule} from "../input/input";

@NgModule({
    imports: [CommonModule, PerfectScrollbarModule, JigsawListModule, JigsawInputModule],
    exports: [JigsawTab, JigsawTabPane, JigsawEditableTabTitleRenderer],
    declarations: [JigsawTab, JigsawTabPane, JigsawTabLabel, JigsawTabContent, JigsawEditableTabTitleRenderer],
    providers: [],
    entryComponents: [JigsawTabPane]
})
export class JigsawTabsModule { }

export * from './tab';
export * from './tab-pane';
export * from './tab-renderer';
