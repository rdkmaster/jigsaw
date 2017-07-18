/**
 * Created by 10177553 on 2017/4/10.
 */

import {NgModule} from '@angular/core';

import {ComboSelectBasicDemo} from "./basic/basic";
import {RouterModule} from "@angular/router";
import {JigsawComboSelectModule} from "jigsaw/component/combo-select/index";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawInputModule} from "jigsaw/component/input/input";
import {PopupService} from "jigsaw/service/popup.service";
import {JigsawCollapseModule} from "jigsaw/component/collapse/collapse";

import {ComboSelectMultipleDemo} from "./multiple/multiple";
import {ComboSelectAutoWidthDemo} from "./autoWidth/autoWidth";
import {ComboSelectLabelFieldDemo} from "./labelField/labelField";
import {ComboSelectWidthDemo} from "./dropdownWidth/dropDownWidth";
import {ComboSelectChangeDemo} from "./change/change";
import {OpenComboSelectDemo} from "./open/open";
import {DisabledComboSelectDemo} from "./disable/disable";
import {ComboSelectEditableDemo} from "./editable/editable";
import {CollapseBasicDemo} from "./collapse/collapse";
import {ComboSelectSetWidthDemo} from "./setWidth/setWidth";
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
    },
    {
        path : 'collapse', component: CollapseBasicDemo
    },
    {
        path : 'setWidth', component: ComboSelectSetWidthDemo
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        JigsawComboSelectModule,
        JigsawTileSelectModule,
        JigsawButtonModule,
        JigsawInputModule,
        JigsawCollapseModule
    ],
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
        CollapseBasicDemo,
        ComboSelectSetWidthDemo
    ],
    providers: [PopupService]
})
export class ComboSelectDemoModule {
}
