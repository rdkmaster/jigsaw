/**
 * Created by 10177553 on 2017/4/10.
 */

import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ComboSelectAutoWidthDemoModule} from "./auto-width/app.module";
import {ComboSelectBasicDemoModule} from "./basic/app.module";
import {ComboSelectChangeDemoModule} from "./change/app.module";
import {CollapseBasicDemoModule} from "./collapse/app.module";
import {DisabledComboSelectDemoModule} from "./disable/app.module";
import {ComboSelectWidthDemoModule} from "./dropdown-width/app.module";
import {ComboSelectLabelFieldDemoModule} from "./labelField/app.module";
import {ComboSelectMultipleDemoModule} from "./multiple/app.module";
import {OpenComboSelectDemoModule} from "./open/app.module";
import {ComboSelectSetWidthDemoModule} from "./set-width/app.module";
import {ComboSelectAutoCompleteDemoModule} from "./searchable/app.module";
import {ComboSelectFullModule} from "./full/app.module";

import {ComboSelectBasicDemo} from "./basic/app.component";
import {ComboSelectMultipleDemo} from "./multiple/app.component";
import {ComboSelectAutoWidthDemo} from "./auto-width/app.component";
import {ComboSelectLabelFieldDemo} from "./labelField/app.component";
import {ComboSelectWidthDemo} from "./dropdown-width/app.component";
import {ComboSelectChangeDemo} from "./change/app.component";
import {OpenComboSelectDemo} from "./open/app.component";
import {DisabledComboSelectDemo} from "./disable/app.component";
import {ComboSelectAutoCompleteDemo} from "./searchable/app.component";
import {CollapseBasicDemo} from "./collapse/app.component";
import {ComboSelectSetWidthDemo} from "./set-width/app.component";
import {ComboSelectFullComponent} from "./full/app.component";

export const routerConfig = [
    {
        path: 'basic', component: ComboSelectBasicDemo
    },
    {
        path: 'multiple', component: ComboSelectMultipleDemo
    },
    {
        path: 'autoWidth', component: ComboSelectAutoWidthDemo
    },
    {
        path: 'labelField', component: ComboSelectLabelFieldDemo
    },
    {
        path: 'dropDownWidth', component: ComboSelectWidthDemo
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
        path: 'collapse', component: CollapseBasicDemo
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
        ComboSelectBasicDemoModule,
        ComboSelectChangeDemoModule,
        CollapseBasicDemoModule,
        DisabledComboSelectDemoModule,
        ComboSelectWidthDemoModule,
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
