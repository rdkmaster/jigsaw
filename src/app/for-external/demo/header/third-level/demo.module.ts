import { NgModule } from "@angular/core";
import { JigsawHeaderModule } from "jigsaw/public_api";
import {DemoTemplateModule} from "../../demo-template/demo-template";
import {HeaderThirdLevelComponent} from "./demo.component";

@NgModule({
    imports: [JigsawHeaderModule, DemoTemplateModule],
    declarations: [
        HeaderThirdLevelComponent,
    ],
    exports: [HeaderThirdLevelComponent]
})
export class HeaderThirdLevelDemoModule {}
