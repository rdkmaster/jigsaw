/**
 * Created by 10177553 on 2017/4/10.
 */

import {NgModule} from '@angular/core';

import {ComboSelectBasicDemo} from "./basic/basic";
import {RouterModule} from "@angular/router";
import {RdkComboSelectModule} from "../../../../component/combo-select/index";
import {ComboSelectMultipleDemo} from "./multiple/multiple";
import {RdkTileSelect, RdkTileSelectModule, RdkTileOption} from "../../../../component/tile-select/tile-select";
import {RdkButtonModule} from "../../../../component/button/button";
import {RdkInputModule} from "../../../../component/input/input";
import {ComboSelectAutoWidthDemo} from "./autoWidth/autoWidth";
import {ComboSelectLabelFieldDemo} from "./labelField/labelField";
import {ComboSelectWidthDemo} from "./dropdownWidth/dropDownWidth";
import {ComboSelectChangeDemo} from "./change/change";
import {PopupService} from "rdk/service/popup.service";
import {OpenComboSelectDemo} from "./open/open";
import {DisabledComboSelectDemo} from "./disable/disable";
import {ComboSelectEditableDemo} from "./editable/editable";
import {CollapseBasicDemo} from "./collapse/collapse";
import {RdkCollapseModule} from "../../../../component/collapse/collapse";
const routes = [
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
        path: 'editable', component: ComboSelectEditableDemo
    },{
        path : 'collapse', component: CollapseBasicDemo
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkComboSelectModule,
        RdkTileSelectModule,
        RdkButtonModule,
        RdkInputModule,
        RdkCollapseModule
    ],
    exports: [ComboSelectBasicDemo, ComboSelectMultipleDemo],
    declarations: [
        ComboSelectBasicDemo,
        ComboSelectMultipleDemo,
        ComboSelectAutoWidthDemo,
        ComboSelectLabelFieldDemo,
        ComboSelectWidthDemo,
        ComboSelectChangeDemo,
        OpenComboSelectDemo,
        DisabledComboSelectDemo,
        ComboSelectEditableDemo,
        CollapseBasicDemo
    ],
    providers: [PopupService]
})
export class ComboSelectDemoModule {
}
