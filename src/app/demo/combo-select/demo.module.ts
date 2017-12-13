/**
 * Created by 10177553 on 2017/4/10.
 */

import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ComboSelectAutoWidthDemoModule} from "./auto-width/app.module";
import {ComboSelectChangeTriggerDemoModule} from "./change-trigger/app.module";
import {ComboSelectChangeDemoModule} from "./change/app.module";
import {ComboDropDownStatusDemoModule} from "./drop-down-status/app.module";
import {DisabledComboSelectDemoModule} from "./disable/app.module";
import {ComboSelectLabelFieldDemoModule} from "./label-field/app.module";
import {ComboSelectMultipleDemoModule} from "./multiple/app.module";
import {OpenComboSelectDemoModule} from "./open/app.module";
import {ComboSelectSetWidthDemoModule} from "./set-width/app.module";
import {ComboSelectAutoCompleteDemoModule} from "./searchable/app.module";
import {ComboSelectFullModule} from "./full/app.module";

import {ComboSelectChangeTriggerDemo} from "./change-trigger/app.component";
import {ComboSelectMultipleDemo} from "./multiple/app.component";
import {ComboSelectAutoWidthDemo} from "./auto-width/app.component";
import {ComboSelectLabelFieldDemo} from "./label-field/app.component";
import {ComboSelectChangeDemo} from "./change/app.component";
import {OpenComboSelectDemo} from "./open/app.component";
import {DisabledComboSelectDemo} from "./disable/app.component";
import {ComboSelectAutoCompleteDemo} from "./searchable/app.component";
import {ComboDropDownStatusDemoComponent} from "./drop-down-status/app.component";
import {ComboSelectSetWidthDemo} from "./set-width/app.component";
import {ComboSelectFullComponent} from "./full/app.component";

export const routerConfig = [
    {
        path: 'change-trigger', component: ComboSelectChangeTriggerDemo, recommended: true
    },
    {
        path: 'multiple', component: ComboSelectMultipleDemo, recommended: true
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
        path: 'searchable', component: ComboSelectAutoCompleteDemo, recommended: true
    },
    {
        path: 'drop-down-status', component: ComboDropDownStatusDemoComponent, recommended: true
    },
    {
        path: 'set-width', component: ComboSelectSetWidthDemo
    },
    {
        path: 'full', component: ComboSelectFullComponent, recommended: true
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
