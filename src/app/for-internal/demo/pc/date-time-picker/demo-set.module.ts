import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DateTimePickerBasicDemoComponent} from "./basic/demo.component";
import {DateTimePickerBasicDemoModule} from "./basic/demo.module";
import {DateTimePickerGrComponent} from "./gr/demo.component";
import {DateTimePickerGrDemoModule} from "./gr/demo.module";
import {DateTimePickerGrItemDemoComponent} from "./gr-items/demo.component";
import {DateTimePickerGrItemDemoModule} from "./gr-items/demo.module";
import {DateTimePickerLimitDemoModule} from "./limit/demo.module";
import {DateTimePickerMarkDemoModule} from "./mark/demo.module";
import {DateTimePickerMarkDemoComponent} from "./mark/demo.component";
import {DateTimePickerLimitComponent} from "./limit/demo.component";
import {DateTimePickerStepDemoComponent} from "./step/demo.component";
import {DateTimePickerStepDemoModule} from "./step/demo.module";
import {DateTimePickerValidDemoComponent} from "./valid/demo.component";
import {DateTimePickerValidDemoModule} from "./valid/demo.module";
import {WithFloatDemoComponent} from "./with-float/demo.component";
import {WithFloatDemoModule} from "./with-float/demo.module";
import {DateTimePickerDisabledDemoComponent} from "./disabled/demo.component";
import {DateTimePickerDisabledDemoModule} from "./disabled/demo.module";
import {DateTimeSelectDemoComponent} from "./date-time-select/demo.component";
import {DateTimeSelectDemoModule} from "./date-time-select/demo.module";
import {DateTimePickerWeekStartComponent} from "./week-start/demo.component";
import {DateTimePickerWeekStartDemoModule} from "./week-start/demo.module";
import {DateTimePickerConfirmButtonDemoComponent} from "./confirm-button/demo.component";
import {DateTimePickerConfirmButtonDemoModule} from "./confirm-button/demo.module";
import { DateTimePickerOptionsDemoModule } from "./options/demo.module";
import { DatePickerTimeOptionsDemoComponent } from "./options/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: DateTimePickerBasicDemoComponent
    },
    {
        path: 'gr', component: DateTimePickerGrComponent
    },
    {
        path: 'limit', component: DateTimePickerLimitComponent
    },
    {
        path: 'gr-items', component: DateTimePickerGrItemDemoComponent
    },
    {
        path: 'mark', component: DateTimePickerMarkDemoComponent
    },
    {
        path: 'step', component: DateTimePickerStepDemoComponent
    },
    {
        path: 'valid', component: DateTimePickerValidDemoComponent
    },
    {
        path: 'with-float', component: WithFloatDemoComponent
    },
    {
        path: 'disabled', component: DateTimePickerDisabledDemoComponent
    },
    {
        path: 'date-time-select', component: DateTimeSelectDemoComponent
    },
    {
        path: 'week-start', component: DateTimePickerWeekStartComponent
    },
    {
        path: 'confirm-button', component: DateTimePickerConfirmButtonDemoComponent
    },
    {
        path: 'options', component: DatePickerTimeOptionsDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DateTimePickerBasicDemoModule,
        DateTimePickerGrDemoModule,
        DateTimePickerGrItemDemoModule,
        DateTimePickerLimitDemoModule,
        DateTimePickerMarkDemoModule,
        DateTimePickerStepDemoModule,
        DateTimePickerValidDemoModule,
        WithFloatDemoModule,
        DateTimePickerDisabledDemoModule,
        DateTimeSelectDemoModule,
        DateTimePickerWeekStartDemoModule,
        DateTimePickerConfirmButtonDemoModule,
        DateTimePickerOptionsDemoModule
    ]
})
export class DateTimePickerDemoModule {
}
