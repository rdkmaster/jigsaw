import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RadioBasicDemoModule} from "./basic/app.module";
import {RadioFullModule} from "./full/app.module";
import {RadioTrackItemByDemoModule} from "./track-item-by/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('radio');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        RadioBasicDemoModule,
        RadioFullModule,
        RadioTrackItemByDemoModule
    ]
})
export class RadioDemoModule { }
