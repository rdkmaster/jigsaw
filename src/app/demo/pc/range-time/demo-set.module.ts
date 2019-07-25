import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RangeTimeBasicDemoModule} from "./basic/demo.module";
import {RangeTimeGrModule} from "app/demo/pc/range-time/gr/demo.module";
import {RangeTimeLimitEndModule} from "./limit-end/demo.module";
import {RangeTimeRecommendedModule} from "./recommended/demo.module";
import {RangeTimeRefreshIntervalModule} from "./refresh-interval/demo.module";
import {RangeTimeWeekStartModule} from "./week-start/demo.module";
import {RangeTimeLimitStartModule} from "./limit-start/demo.module";
import {RangeTimeGrItemsModule} from "./gr-items/demo.module";
import {RangeTimeFullModule} from "./full/demo.module";

import {RangeTimeBasicDemoComponent} from "./basic/demo.component";
import {RangeTimeGrComponent} from "./gr/demo.component";
import {RangeTimeGrItemsComponent} from "./gr-items/demo.component";
import {RangeTimeLimitEndComponent} from "./limit-end/demo.component";
import {RangeTimeLimitStartComponent} from "./limit-start/demo.component";
import {RangeTimeRecommendedComponent} from "./recommended/demo.component";
import {RangeTimeRefreshIntervalComponent} from "./refresh-interval/demo.component";
import {RangeTimeWeekStartComponent} from "./week-start/demo.component";
import {RangeTimeFullComponent} from "./full/demo.component";

export const routerConfig:any = [
    {
        path: 'full', component: RangeTimeFullComponent
    },
    {
        url: '/pc/table/calendar', desc: 'calendar', path: ''
    },
    {
        url: '/pc/time/with-combo-select', desc: 'with-combo-select', path: ''
    },
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
