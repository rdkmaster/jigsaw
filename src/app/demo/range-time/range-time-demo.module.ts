import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RangeTimeBasicDemoModule} from "./basic/app.module";
import {RangeTimeGrModule} from "app/demo/range-time/gr/app.module";
import {RangeTimeLimitEndModule} from "./limit-end/app.module";
import {RangeTimeRecommendedModule} from "./recommended/app.module";
import {RangeTimeRefreshIntervalModule} from "./refresh-interval/app.module";
import {RangeTimeWeekStartModule} from "./week-start/app.module";
import {RangeTimeLimitStartModule} from "./limit-start/app.module";
import {RangeTimeGrItemsModule} from "./gr-items/app.module";
import {RangeTimeFullModule} from "./full/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('range-time');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        RangeTimeBasicDemoModule,
        RangeTimeGrModule,
        RangeTimeGrItemsModule,
        RangeTimeLimitEndModule,
        RangeTimeLimitStartModule,
        RangeTimeRecommendedModule,
        RangeTimeRefreshIntervalModule,
        RangeTimeWeekStartModule,
        RangeTimeFullModule
    ]
})
export class RangeTimeDemoModule {
}
