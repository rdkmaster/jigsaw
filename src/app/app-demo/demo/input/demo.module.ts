import {NgModule} from "@angular/core";
import {DemoTemplateModule} from '../../../demo-template/demo-template';
import {JigsawMarkdownModule} from '../../../markdown/markdown';
import {InputAllComponent} from "./demo.component";
import {JigsawInputModule} from "jigsaw/public_api";
import {InputBasicComponent} from "./basic/demo.component";
import {InputClearableDemoComponent} from "./clearable/demo.component";
import {InputIconDemoComponent} from "./icons/demo.component";
import {InputPasswordComponent} from "./password/demo.component";
import {InputPrefixSuffixDemoComponent} from "./prefix-suffix/demo.component";

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
        JigsawMarkdownModule,
        JigsawInputModule

    ]
})
export class InputDemoModule {
}
