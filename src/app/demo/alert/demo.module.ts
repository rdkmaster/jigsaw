import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AlertPopupDemoModule} from "./popup/app.module";
import {AlertInDomDemoModule} from "./in-dom/app.module";
import {CustomizeAlertDemoModule} from "./customized/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('alert');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        AlertInDomDemoModule,
        AlertPopupDemoModule,
        CustomizeAlertDemoModule
    ]
})
export class AlertDemoModule {
}
