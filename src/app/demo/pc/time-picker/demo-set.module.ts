import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TimePickerBasicDemoComponent} from "./basic/demo.component";
import {TimePickerBasicDemoModule} from "./basic/demo.module";
import {TimePickerStepDemoComponent} from "./step/demo.component";
import {TimePickerStepDemoModule} from "./step/demo.module";
import {TimePickerGrDemoComponent} from "./gr/demo.component";
import {TimePickerGrDemoModule} from "./gr/demo.module";
import {TimePickerSizeDemoComponent} from "./size/demo.component";
import {TimePickerSizeDemoModule} from "./size/demo.module";
import {TimePickerFloatPositionDemoComponent} from "./floatPosition/demo.component";
import {TimePickerFloatPositionDemoModule} from "./floatPosition/demo.module";
import {TimePickerLimitDemoComponent} from "./limit/demo.component";
import {TimePickerLimitDemoModule} from "./limit/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TimePickerBasicDemoComponent
    },
    {
        path: 'step', component: TimePickerStepDemoComponent
    },
    {
        path: 'gr', component: TimePickerGrDemoComponent
    },
    {
        path: 'size', component: TimePickerSizeDemoComponent
    },
    {
        path: 'floatPosition', component: TimePickerFloatPositionDemoComponent
    },
    {
        path: 'limit', component: TimePickerLimitDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TimePickerBasicDemoModule,
        TimePickerStepDemoModule,
        TimePickerGrDemoModule,
        TimePickerSizeDemoModule,
        TimePickerFloatPositionDemoModule,
        TimePickerLimitDemoModule,
    ]
})
export class TimePickerDemoModule {
}
