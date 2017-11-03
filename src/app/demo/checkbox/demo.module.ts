import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CheckBoxBasicDemoModule} from "./basic/app.module";
import {CheckBoxDisableDemoModule} from "./disabled/app.module";
import {CheckBoxFullModule} from "./full/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('checkbox');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        CheckBoxBasicDemoModule,
        CheckBoxDisableDemoModule,
        CheckBoxFullModule
    ]
})
export class CheckBoxDemoModule {
}
