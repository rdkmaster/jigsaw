import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {RangeDateTimeBasicDemoModule} from "./basic/demo.module";
import {RangeDateTimeBasicDemoComponent} from "./basic/demo.component";
import {RangeDateTimeGrItemsComponent} from "./gr-items/demo.component";
import {RangeDateTimeGrModule} from "./gr/demo.module";
import {RangeDateTimeGrItemsModule} from "./gr-items/demo.module";
import {RangeDateTimeGrComponent} from "./gr/demo.component";
import {RangeDateTimeLimitComponent} from "./limit/demo.component";
import {RangeDateTimeLimitModule} from "./limit/demo.module";

export const routerConfig: any = [
    /*
    {
        url: '/pc/time/with-combo-select', desc: 'with-combo-select', path: ''
    },*/
    {
        path: 'basic', component: RangeDateTimeBasicDemoComponent
    },
    {
        path: 'gr', component: RangeDateTimeGrComponent
    },
    {
        path: 'gr-items', component: RangeDateTimeGrItemsComponent
    },
    {
        path: 'limit', component: RangeDateTimeLimitComponent
    },
    /*
    {
        path: 'week-select', component: RangeTimeWeekSelectComponent
    }*/
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        RangeDateTimeBasicDemoModule,
        RangeDateTimeGrModule,
        RangeDateTimeGrItemsModule,
        RangeDateTimeLimitModule,
        /*
       RangeTimeWeekSelectDemoModule,*/
    ]
})
export class RangeDateTimeDemoModule {
}
