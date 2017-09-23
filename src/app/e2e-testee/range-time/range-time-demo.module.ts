import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {RangeTimeBasicDemoComponent} from "./basic/app.component";
import {RangeTimeGrComponent} from "./gr/app.component";
import {RangeTimeGrItemsComponent} from "./grItems/app.component";
import {RangeTimeLimitEndComponent} from "./limitEnd/app.component";
import {RangeTimeLimitStartComponent} from "./limitStart/app.component";
import {RangeTimeRecommendedComponent} from "./recommended/app.component";
import {RangeTimeRefreshIntervalComponent} from "./refreshInterval/app.component";
import {RangeTimeWeekStartComponent} from "./weekStart/app.component";
import {RangeTimeBasicDemoModule} from "./basic/app.module";
import {RangeTimeGrModule} from "app/e2e-testee/range-time/gr/app.module";
import {RangeTimeLimitEndModule} from "./limitEnd/app.module";
import {RangeTimeRecommendedModule} from "./recommended/app.module";
import {RangeTimeRefreshIntervalModule} from "./refreshInterval/app.module";
import {RangeTimeWeekStartModule} from "./weekStart/app.module";
import {RangeTimeLimitStartModule} from "./limitStart/app.module";
import {RangeTimeGrItemsModule} from "./grItems/app.module";
import {RangeTimeFullComponent} from "../../live-demo/range-time/range-time-full/app.component";
import {RangeTimeFullModule} from "../../live-demo/range-time/range-time-full/app.module";


const rangeTimeDemoRoutes = [
    {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full'
    },
    {
        path: 'basic', component: RangeTimeBasicDemoComponent
    },
    {
        path: 'gr', component: RangeTimeGrComponent
    },
    {
        path: 'grItems', component: RangeTimeGrItemsComponent
    },
    {
        path: 'limitEnd', component: RangeTimeLimitEndComponent
    },
    {
        path: 'limitStart', component: RangeTimeLimitStartComponent
    },
    {
        path: 'recommended', component: RangeTimeRecommendedComponent
    },
    {
        path: 'refreshInterval', component: RangeTimeRefreshIntervalComponent
    },
    {
        path: 'weekStart', component: RangeTimeWeekStartComponent
    },
    {
        path: 'range-time-full', component: RangeTimeFullComponent
    },
    {
        path: '**', //fallback router must in the last
        component: RangeTimeBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(rangeTimeDemoRoutes),
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
