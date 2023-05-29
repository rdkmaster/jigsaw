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
import {RangeDateTimeStepDemoComponent} from "./step/demo.component";
import {RangeDateTimeStepDemoModule} from "./step/demo.module";
import {RangeDateTimeSelectComponent} from "./range-date-time-select/demo.component";
import {RangeDateTimeSelectModule} from "./range-date-time-select/demo.module";
import {RangeDateTimeWeekStartComponent} from "./week-start/demo.component";
import {RangeDateTimeWeekStartModule} from "./week-start/demo.module";
import { RangeDateTimePickerOptionsDemoModule } from "./options/demo.module";
import { RangeDatePickerTimeOptionsDemoComponent } from "./options/demo.component";

export const routerConfig: any = [
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
    {
        path: 'step', component: RangeDateTimeStepDemoComponent
    },
    {
        path: 'range-date-time-select', component: RangeDateTimeSelectComponent
    },
    {
        path: 'week-start', component: RangeDateTimeWeekStartComponent
    },
    {
        path: 'options', component: RangeDatePickerTimeOptionsDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        RangeDateTimeBasicDemoModule,
        RangeDateTimeGrModule,
        RangeDateTimeGrItemsModule,
        RangeDateTimeLimitModule,
        RangeDateTimeStepDemoModule,
        RangeDateTimeSelectModule,
        RangeDateTimeWeekStartModule,
        RangeDateTimePickerOptionsDemoModule
    ]
})
export class RangeDateTimeDemoModule {
}
