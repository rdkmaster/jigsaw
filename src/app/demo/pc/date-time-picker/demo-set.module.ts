import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DateTimePickerBasicDemoComponent} from "./basic/demo.component";
import {DateTimePickerBasicDemoModule} from "./basic/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: DateTimePickerBasicDemoComponent
    },
/*    {
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
    },*/
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DateTimePickerBasicDemoModule,
    ]
})
export class DateTimePickerDemoModule {
}
