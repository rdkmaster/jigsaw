import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TemplateDrivenDemoModule} from "./template-driven/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('form');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        TemplateDrivenDemoModule,
    ]
})
export class FormDemoModule {
}
