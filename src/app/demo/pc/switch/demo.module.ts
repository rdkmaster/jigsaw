import {NgModule} from "@angular/core";
import {SwitchDemoComponent} from "./demo.component";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {SwitchBasicComponent} from "./basic/demo.component";
import {JigsawSwitchModule} from "../../../../jigsaw/pc-components/switch/switch";
import {JigsawDemoDescriptionModule} from "../../../demo-description/demo-description";
import {JigsawHeaderModule} from "../../../../jigsaw/pc-components/header/header";
import {JigsawMarkdownModule} from "../../../markdown/markdown";
import {SwitchWithTextDemoComponent} from "./with-text/demo.component";

@NgModule({
    declarations: [SwitchDemoComponent, SwitchBasicComponent, SwitchWithTextDemoComponent],
    imports: [DemoTemplateModule, JigsawSwitchModule,
        JigsawDemoDescriptionModule,
        JigsawHeaderModule, JigsawMarkdownModule]
})
export class SwitchDemoModule {
}
