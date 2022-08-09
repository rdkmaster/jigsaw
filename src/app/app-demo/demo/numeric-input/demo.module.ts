import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../../demo-template/demo-template';
import {JigsawMarkdownModule} from '../../../markdown/markdown';
import {JigsawInputModule, JigsawNumericInputModule} from "jigsaw/public_api";
import {NumericInputBasicDemoComponent} from "./basic/demo.component";
import {NumericInputAllComponent} from "./demo.component";
import {NumericInputPrefixSuffixDemoComponent} from "./prefix-suffix/demo.component";
import {NumericInputShowOptionDemoComponent} from "./show-option/demo.component";
import {NumericInputStepDemoComponent} from "./step/demo.component";


@NgModule({
    declarations: [
        NumericInputAllComponent,
        NumericInputBasicDemoComponent,
        NumericInputPrefixSuffixDemoComponent,
        NumericInputShowOptionDemoComponent,
        NumericInputStepDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        JigsawMarkdownModule,
        JigsawInputModule,
        JigsawNumericInputModule

    ]
})
export class NumericInputDemoModule {
}
