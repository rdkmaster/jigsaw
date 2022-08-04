import {NgModule} from "@angular/core";
import {ToastDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawToastModule} from "../../../../jigsaw/pc-components/toast/toast";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {ToastBasicDemoComponent} from "./basic/demo.component";
import {ToastFunctionalDemoComponent} from "./functional/demo.component";
import {ToastLongTextDemoComponent} from "./long-text/demo.component";

@NgModule({
    declarations: [ToastDemoComponent, ToastBasicDemoComponent, ToastFunctionalDemoComponent, ToastLongTextDemoComponent],
    imports: [JigsawMarkdownModule,  JigsawToastModule, JigsawButtonModule,
        DemoTemplateModule]
})
export class ToastDemoModule {
}