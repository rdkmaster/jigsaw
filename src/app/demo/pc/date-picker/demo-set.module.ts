import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DatePickerBasicDemoComponent} from "./basic/demo.component";
import {DatePickerBasicDemoModule} from "./basic/demo.module";
import {DatePickerGrComponent} from "./gr/demo.component";
import {DatePickerGrDemoModule} from "./gr/demo.module";
import {DatePickerLimitComponent} from "./limit/demo.component";
import {DatePickerLimitDemoModule} from "./limit/demo.module";

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
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DatePickerBasicDemoModule,
        DatePickerGrDemoModule,
        DatePickerLimitDemoModule,
    ]
})
export class DatePickerDemoModule {
}
