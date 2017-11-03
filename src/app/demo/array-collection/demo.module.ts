import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ArrayCollectionAjaxDemoModule} from "./ajax/app.module";
import {ArrayCollectionBasicDemoModule} from "./basic/app.module";
import {ServerSidePaginationDemoModule} from "./server-side-pagination/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('array-collection');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        ArrayCollectionAjaxDemoModule,
        ArrayCollectionBasicDemoModule,
        ServerSidePaginationDemoModule
    ]
})
export class ArrayCollectionDemoModule {
}
