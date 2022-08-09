import { NgModule } from "@angular/core";
import { DemoTemplateModule } from '../../../demo-template/demo-template';
import { JigsawMarkdownModule } from '../../../markdown/markdown';
import {JigsawAutoCompleteInputModule, JigsawSwitchModule, JigsawInputModule} from "jigsaw/public_api";
import {AutoCompleteInputDemoComponent} from "./demo.component";
import {AutoCompleteInputBasicDemoComponent} from "./basic/demo.component";
import {AutoCompleteInputDefaultDemoComponent} from "./default/demo.component";
import {AutoCompleteInputGroupDemoComponent} from "./with-group/demo.component";
import {AutoCompleteInputPrefixSuffixDemoComponent} from "./prefix-suffix/demo.component";

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
        JigsawMarkdownModule,
        JigsawAutoCompleteInputModule,
        JigsawSwitchModule,
        JigsawInputModule
    ]
})
export class AutoCompleteInputDemoModule {
}
