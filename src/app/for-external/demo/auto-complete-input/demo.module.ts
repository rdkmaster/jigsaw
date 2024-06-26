import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../template/demo-template/demo-template';
import { DocTemplateModule } from '../../template/doc-template/doc-template';
import { DocFooterTemplateModule } from '../../template/doc-footer-template/doc-footer-template';
import { DemoNavigationModule } from '../../template/demo-navigation/demo-navigation';
import { JigsawMarkdownModule } from '../../../libs/markdown/markdown';
import { JigsawAutoCompleteInputModule, JigsawSwitchModule, JigsawInputModule } from "jigsaw/public_api";
import { AutoCompleteInputDemoComponent } from "./demo.component";
import { AutoCompleteInputBasicDemoComponent } from "./basic/demo.component";
import { AutoCompleteInputDefaultDemoComponent } from "./default/demo.component";
import { AutoCompleteInputGroupDemoComponent } from "./with-group/demo.component";
import { AutoCompleteInputPrefixSuffixDemoComponent } from "./prefix-suffix/demo.component";

@NgModule({
    declarations: [
        AutoCompleteInputDemoComponent,
        AutoCompleteInputBasicDemoComponent,
        AutoCompleteInputDefaultDemoComponent,
        AutoCompleteInputGroupDemoComponent,
        AutoCompleteInputPrefixSuffixDemoComponent
    ],
    imports: [
        DemoTemplateModule,
        DocTemplateModule,
        DocFooterTemplateModule,
        DemoNavigationModule,
        JigsawMarkdownModule,
        JigsawAutoCompleteInputModule,
        JigsawSwitchModule,
        JigsawInputModule
    ]
})
export class AutoCompleteInputDemoModule {
}
