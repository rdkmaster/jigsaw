import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TimePickerBasicDemoComponent} from "./basic/demo.component";
import {TimePickerBasicDemoModule} from "./basic/demo.module";
import {TimePickerStepDemoComponent} from "./step/demo.component";
import {TimePickerStepDemoModule} from "./step/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: TimePickerBasicDemoComponent
    },
    {
        path: 'step', component: TimePickerStepDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TimePickerBasicDemoModule,
        TimePickerStepDemoModule,
    ]
})
export class TimePickerDemoModule {
}
