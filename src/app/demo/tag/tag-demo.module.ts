import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TagBasicDemoModule} from "./basic/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('tag');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        TagBasicDemoModule
    ]
})
export class TagDemoModule {
}
