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
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('combo-select');

@NgModule({
    imports: [
        RouterModule.forChild(config),
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
