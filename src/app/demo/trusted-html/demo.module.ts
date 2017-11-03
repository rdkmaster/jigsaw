import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TrustedHtmlFullModule} from "./full/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('trusted-html');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        TrustedHtmlFullModule,
    ],
    exports: [
    ],
    providers: []
})
export class TrustedHtmlDemoModule { }
