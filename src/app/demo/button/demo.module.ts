import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ButtonBasicDemoModule} from "./basic/app.module";
import {ButtonDisableDemoModule} from "./disabled/app.module";
import {ButtonPresetDemoModule} from "app/demo/button/preset/app.module";
import {ButtonWidthHeightDemoModule} from "app/demo/button/width-height/app.module";
import {ButtonWithLoadingModule} from "app/demo/button/with-loading/app.module";
import {ButtonFullModule} from "./full/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('button');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        ButtonBasicDemoModule,
        ButtonDisableDemoModule,
        ButtonPresetDemoModule,
        ButtonWidthHeightDemoModule,
        ButtonWithLoadingModule,
        ButtonFullModule
    ]
})
export class ButtonDemoModule {
}
