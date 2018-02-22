/**
 * Created by 10177553 on 2017/4/10.
 */

import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ComboSelectAutoWidthDemoModule} from "./auto-width/demo.module";
import {ComboSelectChangeTriggerDemoModule} from "./change-trigger/demo.module";
import {ComboSelectChangeDemoModule} from "./change/demo.module";
import {ComboDropDownStatusDemoModule} from "./drop-down-status/demo.module";
import {DisabledComboSelectDemoModule} from "./disable/demo.module";
import {ComboSelectLabelFieldDemoModule} from "./label-field/demo.module";
import {ComboSelectMultipleDemoModule} from "./multiple/demo.module";
import {OpenComboSelectDemoModule} from "./open/demo.module";
import {ComboSelectSetWidthDemoModule} from "./set-width/demo.module";
import {ComboSelectAutoCompleteDemoModule} from "./searchable/demo.module";
import {ComboSelectFullModule} from "./full/demo.module";

import {ComboSelectChangeTriggerDemo} from "./change-trigger/demo.component";
import {ComboSelectMultipleDemo} from "./multiple/demo.component";
import {ComboSelectAutoWidthDemo} from "./auto-width/demo.component";
import {ComboSelectLabelFieldDemo} from "./label-field/demo.component";
import {ComboSelectChangeDemo} from "./change/demo.component";
import {OpenComboSelectDemo} from "./open/demo.component";
import {DisabledComboSelectDemo} from "./disable/demo.component";
import {ComboSelectAutoCompleteDemo} from "./searchable/demo.component";
import {ComboDropDownStatusDemoComponent} from "./drop-down-status/demo.component";
import {ComboSelectSetWidthDemo} from "./set-width/demo.component";
import {ComboSelectFullComponent} from "./full/demo.component";

export const routerConfig = [
    {
        path: 'searchable', component: ComboSelectAutoCompleteDemo
    },
    {
        path: 'change-trigger', component: ComboSelectChangeTriggerDemo
    },
    {
        path: 'multiple', component: ComboSelectMultipleDemo
    },
    {
        path: 'auto-width', component: ComboSelectAutoWidthDemo
    },
    {
        path: 'label-field', component: ComboSelectLabelFieldDemo
    },
    {
        path: 'change', component: ComboSelectChangeDemo
    },
    {
        path: 'open', component: OpenComboSelectDemo
    },
    {
        path: 'disable', component: DisabledComboSelectDemo
    },
    {
        path: 'drop-down-status', component: ComboDropDownStatusDemoComponent
    },
    {
        path: 'set-width', component: ComboSelectSetWidthDemo
    },
    {
        path: 'full', component: ComboSelectFullComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        ComboSelectAutoWidthDemoModule,
        ComboSelectChangeTriggerDemoModule,
        ComboSelectChangeDemoModule,
        ComboDropDownStatusDemoModule,
        DisabledComboSelectDemoModule,
        ComboSelectAutoCompleteDemoModule,
        ComboSelectLabelFieldDemoModule,
        ComboSelectMultipleDemoModule,
        OpenComboSelectDemoModule,
        ComboSelectSetWidthDemoModule,
        ComboSelectFullModule
    ]
})
export class ComboSelectDemoModule {
}
