import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DialogButtonsDemoModule} from "./buttons/app.module";
import {DialogInDomDemoModule} from "./in-dom/app.module";
import {DialogMiscDemoModule} from "./misc/app.module";
import {DialogPopOptionDemoModule} from "./popup-option/app.module";
import {DialogTitleDemoModule} from "./title/app.module";
import {DialogTopDemoModule} from "./top/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('dialog');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        DialogButtonsDemoModule,
        DialogInDomDemoModule,
        DialogMiscDemoModule,
        DialogPopOptionDemoModule,
        DialogTitleDemoModule,
        DialogTopDemoModule
    ]
})
export class DialogDemoModule {
}
