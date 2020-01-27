import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TimeBasicDemoModule} from "./basic/demo.module";
import {TimeComboDemoModule} from "./with-combo-select/demo.module";
import {TimeGrDemoModule} from "./gr/demo.module";
import {TimeGrItemsDemoModule} from "./gr-items/demo.module";
import {TimeLimitEndDemoModule} from "./limit-end/demo.module";
import {TimeLimitStartDemoModule} from "./limit-start/demo.module";
import {TimeRecommendedDemoModule} from "./recommended/demo.module";
import {TimeRrefreshIntervalDemoModule} from "./refresh-interval/demo.module";
import {TimeFullModule} from "./full/demo.module";

import {TimeBasicDemoComponent} from "./basic/demo.component";
import {TimeLimitEndComponent} from "./limit-end/demo.component";
import {TimeLimitStartComponent} from "./limit-start/demo.component";
import {TimeGrComponent} from "./gr/demo.component";
import {TimeRecommendedComponent} from "./recommended/demo.component";
import {TimeGrItemsComponent} from "./gr-items/demo.component";
import {TimeRefreshIntervalComponent} from "./refresh-interval/demo.component";
import {ComboSelectDemoComponent} from "./with-combo-select/demo.component";
import {TimeFullComponent} from "./full/demo.component";
import {TimeWeekSelectComponent} from "./week-select/demo.component";
import {TimeWeekSelectDemoModule} from "./week-select/demo.module";

export const routerConfig:any = [
    {
        path: 'full', component: TimeFullComponent
    },
    {
        url: '/pc/table/calendar', desc: 'calendar', path: ''
    },
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
        path: 'week-select', component: TimeWeekSelectComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TimeBasicDemoModule, TimeComboDemoModule, TimeGrDemoModule, TimeGrItemsDemoModule, TimeLimitEndDemoModule,
        TimeLimitStartDemoModule, TimeRecommendedDemoModule, TimeRrefreshIntervalDemoModule,
        TimeFullModule, TimeWeekSelectDemoModule
    ],
    providers: []
})
export class TimeDemoModule {
}
