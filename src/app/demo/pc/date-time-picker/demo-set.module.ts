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
import {DateTimePickerLimitComponent} from "./limit/demo.component";
import {WithComboSelectDemoComponent} from "./with-combo-select/demo.component";
import {WithComboSelectDemoModule} from "./with-combo-select/demo.module";

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
        path: 'gr-item', component: DateTimePickerGrItemDemoComponent
    },
    {
        path: 'mark', component: DateTimePickerMarkDemoComponent
    },
    {
        path: 'with-combo-select', component: WithComboSelectDemoComponent
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
        WithComboSelectDemoModule
    ]
})
export class DateTimePickerDemoModule {
}
