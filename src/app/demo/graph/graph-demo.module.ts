/**
 * Created by 10177553 on 2017/3/28.
 */

import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BasicGraphModule} from "./basic/app.module";
import {BasicLineGraphModule} from "./line-bar-graph-basic/app.module";
import {PieGraphDemoModule} from "./pie/app.module";
import {GraphResizeModule} from "./resize/app.module";
import {GraphWithNoDataModule} from "./no-data/app.module";
import {GraphSetSizeModule} from "./set-size/app.module";
import {AjaxLineGraphModule} from "./line-bar-graph-ajax/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('graph');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        BasicGraphModule,
        BasicLineGraphModule,
        AjaxLineGraphModule,
        PieGraphDemoModule,
        GraphResizeModule,
        GraphWithNoDataModule,
        GraphSetSizeModule
    ]
})
export class GraphDemoModule {
}
