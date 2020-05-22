import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {DateTimePickerBasicDemoComponent} from "./basic/demo.component";
import {DateTimePickerBasicDemoModule} from "./basic/demo.module";
import {DateTimePickerGrComponent} from "./gr/demo.component";
import {DateTimePickerGrDemoModule} from "./gr/demo.module";
import {DateTimePickerGrItemDemoComponent} from "./gr-item/demo.component";
import {DateTimePickerGrItemDemoModule} from "./gr-item/demo.module";
import {DateTimePickerLimitDemoModule} from "./limit/demo.module";
import {DateTimePickerMarkDemoModule} from "./mark/demo.module";
import {DateTimePickerMarkDemoComponent} from "./mark/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: DateTimePickerBasicDemoComponent
    },
    {
        path: 'gr', component: DateTimePickerGrComponent
    },
    {
        path: 'limit', component: DateTimePickerLimitDemoModule
    },
    {
        path: 'gr-item', component: DateTimePickerGrItemDemoComponent
    },
    {
        path: 'mark', component: DateTimePickerMarkDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        DateTimePickerBasicDemoModule,
        DateTimePickerGrDemoModule,
        DateTimePickerGrItemDemoModule,
        DateTimePickerLimitDemoModule,
        DateTimePickerMarkDemoModule
    ]
})
export class DateTimePickerDemoModule {
}
