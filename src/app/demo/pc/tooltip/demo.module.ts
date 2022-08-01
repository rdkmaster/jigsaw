import {NgModule} from "@angular/core";
import {TooltipDemoComponent} from "./demo.component";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {JigsawInputModule} from "../../../../jigsaw/pc-components/input/input";
import {JigsawTooltipModule} from "../../../../jigsaw/common/directive/tooltip/tooltip";
import {JigsawButtonModule} from "../../../../jigsaw/pc-components/button/button";
import {TooltipBasicDemoComponent} from "./basic/demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {TooltipHtmlDemoComponent} from "./html-renderer/demo.component";
import {TooltipScenesDemoComponent} from "./scenes/demo.component";
import {TooltipTriggerDemoComponent} from "./trigger/demo.component";
import {JigsawRadioModule} from "../../../../jigsaw/pc-components/radio/radios";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [TooltipDemoComponent, TooltipBasicDemoComponent, TooltipHtmlDemoComponent, TooltipScenesDemoComponent,
        TooltipTriggerDemoComponent],
    imports: [JigsawMarkdownModule, JigsawInputModule, JigsawTooltipModule, JigsawButtonModule, DemoTemplateModule, JigsawRadioModule, CommonModule]
})
export class TooltipDemoModule {
}
