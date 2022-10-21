import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { InputAllComponent } from "./demo.component";
import { JigsawInputModule } from "jigsaw/public_api";
import { InputBasicComponent } from "./basic/demo.component";
import { InputClearableDemoComponent } from "./clearable/demo.component";
import { InputIconDemoComponent } from "./icons/demo.component";
import { InputPasswordComponent } from "./password/demo.component";
import { InputPrefixSuffixDemoComponent } from "./prefix-suffix/demo.component";

@NgModule({
    declarations: [
        InputAllComponent,
        InputBasicComponent,
        InputClearableDemoComponent,
        InputIconDemoComponent,
        InputPasswordComponent,
        InputPrefixSuffixDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        JigsawMarkdownModule,
        JigsawInputModule
    ]
})
export class InputDemoModule {
}
