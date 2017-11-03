import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FishBoneFullModule} from "./full/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('fish-bone');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        FishBoneFullModule
    ],
})
export class FishBoneDemoModule{

}
