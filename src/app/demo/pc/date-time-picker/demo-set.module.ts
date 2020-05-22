import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DatePickerBasicDemoComponent} from "./basic/demo.component";
import {DatePickerBasicDemoModule} from "./basic/demo.module";
import {DatePickerGrComponent} from "./gr/demo.component";
import {DatePickerGrDemoModule} from "./gr/demo.module";
import {DatePickerLimitComponent} from "./limit/demo.component";
import {DatePickerLimitDemoModule} from "./limit/demo.module";
import {DatePickerGrItemDemoComponent} from "./gr-item/demo.component";
import {DatePickerGrItemDemoModule} from "./gr-item/demo.module";
import {DatePickerMarkDemoComponent} from "./mark/demo.component";
import {DatePickerMarkDemoModule} from "./mark/demo.module";

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
        path: 'gr-item', component: DatePickerGrItemDemoComponent
    },
    {
        path: 'mark', component: DatePickerMarkDemoComponent
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
    ]
})
export class DatePickerDemoModule {
}
