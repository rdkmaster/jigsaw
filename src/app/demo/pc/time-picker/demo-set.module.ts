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
import {TimePickerFloatPositionDemoComponent} from "./pop-up-down/demo.component";
import {TimePickerFloatPositionDemoModule} from "./pop-up-down/demo.module";
import {TimePickerLimitDemoComponent} from "./limit/demo.component";
import {TimePickerLimitDemoModule} from "./limit/demo.module";
import {TimePickerAllComponent} from "./all/demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";

export const routerConfig = [
    {
        path: 'all', component: TimePickerAllComponent
    },
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
        path: 'pop-up-down', component: TimePickerFloatPositionDemoComponent
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
        JigsawMarkdownModule
    ],
    declarations: [TimePickerAllComponent]
})
export class TimePickerDemoModule {
}
