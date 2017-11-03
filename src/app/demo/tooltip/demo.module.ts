import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "jigsaw/service/popup.service";
import {TooltipDialogDemoModule} from "./dialog/app.module";
import {TooltipInDomDemoModule} from "./in-dom/app.module";
import {SimpleTooltipDemoModule} from "./inline/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('tooltip');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        TooltipDialogDemoModule, TooltipInDomDemoModule, SimpleTooltipDemoModule
    ],
    providers: [PopupService]
})
export class TooltipDemoModule {
}
