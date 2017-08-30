import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {TimeBasicDemoComponent} from "./basic/app.component";
import {TimeBasicDemoModule} from "./basic/app.module";

import {ComboSelectDemoComponent} from "./comboSelect/app.component";
import {TimeComboDemoModule} from "./comboSelect/app.module";

import {TimeGrComponent} from "./gr/app.component";
import {TimeGrDemoModule} from "./gr/app.module";

import {TimeGrItemsComponent} from "./grItems/app.component";
import {TimeGrItemsDemoModule} from "./grItems/app.module";

import {TimeLimitEndComponent} from "./limitEnd/app.component";
import {TimeLimitEndDemoModule} from "./limitEnd/app.module";

import {TimeLimitStartComponent} from "./limitStart/app.component";
import {TimeLimitStartDemoModule} from "./limitStart/app.module";

import {TimeRecommendedComponent} from "./recommended/app.component";
import {TimeRecommendedDemoModule} from "./recommended/app.module";

import {TimeRefreshIntervalComponent} from "./refreshInterval/app.component";
import {TimeRrefreshIntervalDemoModule} from "./refreshInterval/app.module";

import {TimeWeekStartComponent} from "./weekStart/app.component";
import {TimeWeekStartDemoModule} from "./weekStart/app.module";

const inputDemoRoutes = [
    {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full'
    },
    {
        path: 'basic', component: TimeBasicDemoComponent
    }, {
        path: 'limitEnd', component: TimeLimitEndComponent
    }, {
        path: 'limitStart', component: TimeLimitStartComponent
    }, {
        path: 'weekStart', component: TimeWeekStartComponent
    }, {
        path: 'gr', component: TimeGrComponent
    }, {
        path: 'recommended', component: TimeRecommendedComponent
    }, {
        path: 'grItems', component: TimeGrItemsComponent
    }, {
        path: 'refreshInterval', component: TimeRefreshIntervalComponent
    }, {
        path: 'comboSelect', component: ComboSelectDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: TimeBasicDemoComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(inputDemoRoutes),
        TimeBasicDemoModule, TimeComboDemoModule, TimeGrDemoModule, TimeGrItemsDemoModule, TimeLimitEndDemoModule,
        TimeLimitStartDemoModule, TimeRecommendedDemoModule, TimeRrefreshIntervalDemoModule, TimeWeekStartDemoModule
    ],
    providers: []
})
export class TimeDemoModule {
}
