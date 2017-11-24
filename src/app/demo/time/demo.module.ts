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

import {TimeBasicDemoComponent} from "./basic/app.component";
import {TimeLimitEndComponent} from "./limit-end/app.component";
import {TimeLimitStartComponent} from "./limit-start/app.component";
import {TimeWeekStartComponent} from "./week-start/app.component";
import {TimeGrComponent} from "./gr/app.component";
import {TimeRecommendedComponent} from "./recommended/app.component";
import {TimeGrItemsComponent} from "./gr-items/app.component";
import {TimeRefreshIntervalComponent} from "./refresh-interval/app.component";
import {ComboSelectDemoComponent} from "./with-combo-select/app.component";
import {TimeFullComponent} from "./full/app.component";

export const routerConfig:any = [
    {
        path: 'basic', component: TimeBasicDemoComponent
    },
    {
        path: 'limit-end', component: TimeLimitEndComponent
    },
    {
        path: 'limit-start', component: TimeLimitStartComponent
    },
    {
        path: 'week-start', component: TimeWeekStartComponent
    },
    {
        path: 'gr', component: TimeGrComponent
    },
    {
        path: 'recommended', component: TimeRecommendedComponent
    },
    {
        path: 'gr-items', component: TimeGrItemsComponent
    },
    {
        path: 'refresh-interval', component: TimeRefreshIntervalComponent
    },
    {
        path: 'with-combo-select', component: ComboSelectDemoComponent
    },
    {
        path: 'full', component: TimeFullComponent, recommended: true
    },
    {
        url: '/table/date-sheet', desc: 'date-sheet', recommended: true
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TimeBasicDemoModule, TimeComboDemoModule, TimeGrDemoModule, TimeGrItemsDemoModule, TimeLimitEndDemoModule,
        TimeLimitStartDemoModule, TimeRecommendedDemoModule, TimeRrefreshIntervalDemoModule, TimeWeekStartDemoModule,
        TimeFullModule
    ],
    providers: []
})
export class TimeDemoModule {
}
