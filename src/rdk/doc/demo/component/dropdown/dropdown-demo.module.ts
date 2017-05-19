/**
 * Created by 10177553 on 2017/4/10.
 */

import {NgModule} from '@angular/core';

import {DropDownBasicDemo} from "./basic/basic";
import {RouterModule} from "@angular/router";
import {RdkDropDownModule} from "../../../../component/dropdown/index";
import {DropDownMultipleDemo} from "./multiple/multiple";
import {RdkTileSelect, RdkTileSelectModule, RdkTileOption} from "../../../../component/tile-select/tile-select";
import {RdkButtonModule} from "../../../../component/button/button";
import {RdkInputModule} from "../../../../component/input/input";
import {DropDownAutoWidthDemo} from "./autoWidth/autoWidth";
import {DropDownLabelFieldDemo} from "./labelField/labelField";
import {DropDownWidthDemo} from "./dropdownWidth/dropDownWidth";
import {DropDownChangeDemo} from "./change/change";
import {PopupService} from "rdk/service/popup.service";
import {OpenDropDownDemo} from "./open/open";
import {DisabledDropDownDemo} from "./disable/disable";
const routes = [
    {
        path: 'basic', component: DropDownBasicDemo
    },
    {
        path: 'multiple', component: DropDownMultipleDemo
    },
    {
        path: 'autoWidth', component: DropDownAutoWidthDemo
    },
    {
        path: 'labelField', component: DropDownLabelFieldDemo
    },
    {
        path: 'dropDownWidth', component: DropDownWidthDemo
    },
    {
        path: 'change', component: DropDownChangeDemo
    },
    {
        path: 'open', component: OpenDropDownDemo
    },
    {
        path: 'disable', component: DisabledDropDownDemo
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RdkDropDownModule,
        RdkTileSelectModule,
        RdkButtonModule,
        RdkInputModule
    ],
    exports: [DropDownBasicDemo, DropDownMultipleDemo],
    declarations: [
        DropDownBasicDemo,
        DropDownMultipleDemo,
        DropDownAutoWidthDemo,
        DropDownLabelFieldDemo,
        DropDownWidthDemo,
        DropDownChangeDemo,
        OpenDropDownDemo,
        DisabledDropDownDemo
    ],
    providers: [PopupService]
})
export class DropDownDemoModule {
}
