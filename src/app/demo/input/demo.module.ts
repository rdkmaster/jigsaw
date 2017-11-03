import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {InputBasicDemoModule} from "./basic/app.module";
import {InputValueChangeDemoModule} from "./value-change/app.module";
import {InputClearableDemoModule} from "./clearable/app.module";
import {InputFocusDemoModule} from "./focus/app.module";
import {InputPrefixIconDemoModule} from "./prefix-icon/app.module";
import {InputFullModule} from "./full/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('input');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        InputBasicDemoModule,
        InputValueChangeDemoModule,
        InputClearableDemoModule,
        InputFocusDemoModule,
        InputPrefixIconDemoModule,
        InputFullModule
    ]
})
export class InputDemoModule {
}
