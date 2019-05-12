import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {NumericInputBasicDemoComponent} from "./basic/demo.component";
import {NumericInputBasicDemoModule} from "./basic/demo.module";
import {NumericInputDisabledDemoComponent} from "./disabled/demo.component";
import {NumericInputDisabledDemoModule} from "./disabled/demo.module";
import {NumericInputSizeDemoComponent} from "./size/demo.component";
import {NumericInputSizeDemoModule} from "./size/demo.module";
import {NumericInputStepDemoComponent} from "./step/demo.component";
import {NumericInputStepDemoModule} from "./step/demo.module";

export const routerConfig = [
    {
        path: 'basic', component: NumericInputBasicDemoComponent
    },
    {
        path: 'disabled', component: NumericInputDisabledDemoComponent
    },
    {
        path: 'size', component: NumericInputSizeDemoComponent
    },
    {
        path: 'step', component: NumericInputStepDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        NumericInputBasicDemoModule,
        NumericInputDisabledDemoModule,
        NumericInputSizeDemoModule,
        NumericInputStepDemoModule
    ]
})
export class NumericInputDemoModule {
}
