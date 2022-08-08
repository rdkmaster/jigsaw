import { NgModule } from "@angular/core";
import { HeaderFirstLevelComponent } from "./first-level/demo.component";
import { HeaderSecondLevelComponent } from "./second-level/demo.component";
import { HeaderThirdLevelComponent } from "./third-level/demo.component";
import { DemoTemplateModule } from "../../demo-template/demo-template";
import { JigsawHeaderModule } from "jigsaw/public_api";
import { HeaderDemoComponent } from "./demo.component";
import { JigsawMarkdownModule } from "../../../markdown/markdown";
@NgModule({
    declarations: [HeaderFirstLevelComponent, HeaderSecondLevelComponent, HeaderThirdLevelComponent, HeaderDemoComponent],
    imports: [
        DemoTemplateModule, JigsawHeaderModule, JigsawMarkdownModule
    ],
})
export class HeaderDemoModule {
}
