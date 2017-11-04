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

import {RangeTimeBasicDemoComponent} from "./basic/app.component";
import {RangeTimeGrComponent} from "./gr/app.component";
import {RangeTimeGrItemsComponent} from "./gr-items/app.component";
import {RangeTimeLimitEndComponent} from "./limit-end/app.component";
import {RangeTimeLimitStartComponent} from "./limit-start/app.component";
import {RangeTimeRecommendedComponent} from "./recommended/app.component";
import {RangeTimeRefreshIntervalComponent} from "./refresh-interval/app.component";
import {RangeTimeWeekStartComponent} from "./week-start/app.component";
import {RangeTimeFullComponent} from "./full/app.component";

export const routerConfig = [
    {
        path: 'basic', component: RangeTimeBasicDemoComponent
    },
    {
        path: 'gr', component: RangeTimeGrComponent
    },
    {
        path: 'gr-items', component: RangeTimeGrItemsComponent
    },
    {
        path: 'limit-end', component: RangeTimeLimitEndComponent
    },
    {
        path: 'limit-start', component: RangeTimeLimitStartComponent
    },
    {
        path: 'recommended', component: RangeTimeRecommendedComponent
    },
    {
        path: 'refresh-interval', component: RangeTimeRefreshIntervalComponent
    },
    {
        path: 'week-start', component: RangeTimeWeekStartComponent
    },
    {
        path: 'full', component: RangeTimeFullComponent, recommended: true
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
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
