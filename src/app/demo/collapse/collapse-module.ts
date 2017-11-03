/**
 * Created by 10177553 on 2017/4/26.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ngForDemoModule} from "./with-ngfor/app.module";
import {CollapseBasicDemoModule} from "./basic/app.module";
import {CollapseFullModule} from "./full/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('collapse');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        CollapseBasicDemoModule,
        ngForDemoModule,
        CollapseFullModule
    ]
})
export class CollapseDemoModule { }
