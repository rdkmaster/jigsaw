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
import {NumericInputPrefixSuffixDemoComponent} from "./prefix-suffix/demo.component";
import {NumericInputPrefixSuffixDemoModule} from "./prefix-suffix/demo.module";
import { NumericInputShowOptionDemoModule } from './showOption/demo.module';
import { NumericInputShowOptionDemoComponent } from './showOption/demo.component';

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
    {
        path: 'prefix-suffix', component: NumericInputPrefixSuffixDemoComponent
    },
    {
        path: 'showOption', component: NumericInputShowOptionDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        NumericInputBasicDemoModule,
        NumericInputDisabledDemoModule,
        NumericInputSizeDemoModule,
        NumericInputStepDemoModule,
        NumericInputPrefixSuffixDemoModule,
        NumericInputShowOptionDemoModule
    ]
})
export class NumericInputDemoModule {
}
