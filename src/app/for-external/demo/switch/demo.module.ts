import { NgModule } from "@angular/core";
import { SwitchDemoComponent } from "./demo.component";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { SwitchBasicComponent } from "./basic/demo.component";
import { JigsawSwitchModule, JigsawHeaderModule } from "jigsaw/public_api";
import { JigsawMarkdownModule } from "../../../libs/markdown/markdown";
import { SwitchWithTextDemoComponent } from "./with-text/demo.component";

@NgModule({
    declarations: [SwitchDemoComponent, SwitchBasicComponent, SwitchWithTextDemoComponent],
    imports: [DemoTemplateModule, JigsawSwitchModule,
        JigsawHeaderModule, JigsawMarkdownModule]
})
export class SwitchDemoModule {
}
