import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {SelectBasicDemoModule} from "./basic/app.module";
import {SelectCheckboxDemoModule} from "./checkbox/app.module";
import {SelectScrollDemoModule} from "./scroll/app.module";
import {SelectFullModule} from "./full/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('select');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        SelectBasicDemoModule,
        SelectCheckboxDemoModule,
        SelectScrollDemoModule,
        SelectFullModule
    ]
})
export class SelectDemoModule {
}
