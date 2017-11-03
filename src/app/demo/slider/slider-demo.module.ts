/**
 * Created by 10177553 on 2017/4/13.
 */
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {SliderVerticalDemoModule} from "./vertical/app.module";
import {SliderBasicDemoModule} from "./basic/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('slider');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        SliderBasicDemoModule, SliderVerticalDemoModule
    ]
})
export class SliderDemoModule { }
