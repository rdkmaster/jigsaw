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
import { NumericInputShowOptionDemoModule } from './show-option/demo.module';
import { NumericInputShowOptionDemoComponent } from './show-option/demo.component';
import { NumericInputShowBorderDemoComponent } from "./show-border/demo.component";
import { NumericInputShowBorderDemoModule } from "./show-border/demo.module";
import { NumericInputAllowEmptyValueDemoModule } from "./allow-empty-value/demo.module";
import { NumericInputAllowEmptyValueDemoComponent } from "./allow-empty-value/demo.component";

export const routerConfig = [
    {
        path: 'basic', component: NumericInputBasicDemoComponent
    },
    {
        path: 'show-border', component: NumericInputShowBorderDemoComponent
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
        path: 'show-option', component: NumericInputShowOptionDemoComponent
    },
    {
        path: 'all-empty-value', component: NumericInputAllowEmptyValueDemoComponent
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
        NumericInputShowOptionDemoModule,
        NumericInputShowBorderDemoModule,
        NumericInputAllowEmptyValueDemoModule
    ]
})
export class NumericInputDemoModule {
}
