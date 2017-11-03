import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ServerSidePagingDemoModule} from "./with-table-data/app.module";
import {PaginationBasicDemoModule} from "./basic/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('pagination');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        PaginationBasicDemoModule,
        ServerSidePagingDemoModule
    ]
})
export class PaginationDemoModule { }
