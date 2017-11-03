import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TreeBasicDemoModule} from "./basic/app.module";
import {TreeAsyncDemoModule} from "./async/app.module";
import {TreeAjaxDataDemoModule} from "./data-from-ajax/app.module";
import {TreeEditableDemoModule} from "./editable/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('tree');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        TreeAsyncDemoModule, TreeBasicDemoModule, TreeAjaxDataDemoModule, TreeEditableDemoModule
    ],
    exports: [
    ],
    providers: []
})
export class ZtreeDemoModule { }
