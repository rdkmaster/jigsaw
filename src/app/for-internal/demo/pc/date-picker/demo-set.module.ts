import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DatePickerBasicDemoComponent} from "./basic/demo.component";
import {DatePickerBasicDemoModule} from "./basic/demo.module";
import {DatePickerGrComponent} from "./gr/demo.component";
import {DatePickerGrDemoModule} from "./gr/demo.module";
import {DatePickerLimitComponent} from "./limit/demo.component";
import {DatePickerLimitDemoModule} from "./limit/demo.module";
import {DatePickerGrItemDemoComponent} from "./gr-items/demo.component";
import {DatePickerGrItemDemoModule} from "./gr-items/demo.module";
import {DatePickerMarkDemoComponent} from "./mark/demo.component";
import {DatePickerMarkDemoModule} from "./mark/demo.module";
import {DatePickerWeekStartComponent} from "./week-start/demo.component";
import {DatePickerWeekStartDemoModule} from "./week-start/demo.module";
import { DatePickerOptionsDemoModule } from "./options/demo.module";
import { DatePickerOptionsDemoComponent } from "./options/demo.component";
import { DatePickerKeyboardDemoModule } from "./keyboard/demo.module";
import { DatePickerKeyboardDemoComponent } from "./keyboard/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: DatePickerBasicDemoComponent
    },
    {
        path: 'gr', component: DatePickerGrComponent
    },
    {
        path: 'limit', component: DatePickerLimitComponent
    },
    {
        path: 'gr-items', component: DatePickerGrItemDemoComponent
    },
    {
        path: 'mark', component: DatePickerMarkDemoComponent
    },
    {
        path: 'week-start', component: DatePickerWeekStartComponent
    },
    {
        path: 'options', component: DatePickerOptionsDemoComponent
    },
    {
        path: 'keyboard', component: DatePickerKeyboardDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DatePickerBasicDemoModule,
        DatePickerGrDemoModule,
        DatePickerLimitDemoModule,
        DatePickerGrItemDemoModule,
        DatePickerMarkDemoModule,
        DatePickerWeekStartDemoModule,
        DatePickerOptionsDemoModule,
        DatePickerKeyboardDemoModule
    ]
})
export class DatePickerDemoModule {
}
