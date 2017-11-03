import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BallLoadingDemoModule} from "./ball/app.module";
import {DefinedLoadingDemoModule} from "./user-defined/app.module";
import {DomInnerDemoModule} from "./dom-inner/app.module";
import {ColorfulLoadingDemoModule} from "./color/app.module";
import {LoadingFullDemoModule} from "./full/app.module";
import {BubbleLoadingDemoModule} from "./bubble/app.module";
import {FontLoadingDemoModule} from "./font-icon/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('loading');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        LoadingFullDemoModule,
        BallLoadingDemoModule,
        BubbleLoadingDemoModule,
        FontLoadingDemoModule,
        DefinedLoadingDemoModule,
        DomInnerDemoModule,
        ColorfulLoadingDemoModule,
    ]
})
export class LoadingDemoModule {
}
