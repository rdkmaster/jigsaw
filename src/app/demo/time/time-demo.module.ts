import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TimeBasicDemoModule} from "./basic/app.module";
import {TimeComboDemoModule} from "./with-combo-select/app.module";
import {TimeGrDemoModule} from "./gr/app.module";
import {TimeGrItemsDemoModule} from "./gr-items/app.module";
import {TimeLimitEndDemoModule} from "./limit-end/app.module";
import {TimeLimitStartDemoModule} from "./limit-start/app.module";
import {TimeRecommendedDemoModule} from "./recommended/app.module";
import {TimeRrefreshIntervalDemoModule} from "./refresh-interval/app.module";
import {TimeWeekStartDemoModule} from "./week-start/app.module";
import {TimeFullModule} from "./full/app.module";
import {routes} from "../../demo-urls";

// 模块懒加载导致需要在编译阶段运行下面代码，请勿随意修改这行代码
const config = routes.childRoutes('time');

@NgModule({
    imports: [
        RouterModule.forChild(config),
        TimeBasicDemoModule, TimeComboDemoModule, TimeGrDemoModule, TimeGrItemsDemoModule, TimeLimitEndDemoModule,
        TimeLimitStartDemoModule, TimeRecommendedDemoModule, TimeRrefreshIntervalDemoModule, TimeWeekStartDemoModule,
        TimeFullModule
    ],
    providers: []
})
export class TimeDemoModule {
}
