/**
 * Created by 10177553 on 2017/3/29.
 */

import {NgModule} from '@angular/core';

import {JigsawTab} from './tab';
import {JigsawTabPane} from "./tab-pane";
import {CommonModule} from "@angular/common";
import {JigsawTabContent, JigsawTabLabel} from "./tab-item";

@NgModule({
    imports: [CommonModule],
    exports: [JigsawTab, JigsawTabPane],
    declarations: [JigsawTab, JigsawTabPane, JigsawTabLabel, JigsawTabContent],
    providers: [],
    entryComponents: [JigsawTabPane]
})
export class JigsawTabsModule { }

export * from './tab';
export * from './tab-pane';
