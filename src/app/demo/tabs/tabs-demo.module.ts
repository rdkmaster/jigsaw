/**
 * Created by 10177553 on 2017/3/29.
 */

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {TabsBasicDemoModule} from './basic/app.module';
import {TabsDestroyDemoModule} from "./destroy-tab/app.module";
import {TabsHideTabDemoModule} from "./hide-tab/app.module";
import {TabsWithNgForDemoModule} from "./with-ngfor/app.module";
import {TabsShowTabDemoModule} from "./show-tab/app.module";
import {DynamicTabDemoModule} from "./api/app.module";
import {TabsWithInputDemoModule} from "./with-input/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('tabs');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        TabsBasicDemoModule, TabsDestroyDemoModule, TabsHideTabDemoModule, TabsShowTabDemoModule,
        DynamicTabDemoModule, TabsWithInputDemoModule, TabsWithNgForDemoModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsDemoModule {
}
