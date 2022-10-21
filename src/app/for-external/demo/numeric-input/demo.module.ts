import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawInputModule, JigsawNumericInputModule } from "jigsaw/public_api";
import { NumericInputBasicDemoComponent } from "./basic/demo.component";
import { NumericInputAllComponent } from "./demo.component";
import { NumericInputPrefixSuffixDemoComponent } from "./prefix-suffix/demo.component";
import { NumericInputShowOptionDemoComponent } from "./show-option/demo.component";
import { NumericInputStepDemoComponent } from "./step/demo.component";


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
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawMarkdownModule,
        JigsawInputModule,
        JigsawNumericInputModule
    ]
})
export class NumericInputDemoModule {
}
