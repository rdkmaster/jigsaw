import { NgModule } from "@angular/core";
import { JigsawHeaderModule } from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {HeaderFirstLevelComponent} from "./demo.component";

@NgModule({
    imports: [JigsawHeaderModule, DemoTemplateModule],
    declarations: [
        HeaderFirstLevelComponent,
    ],
    exports: [HeaderFirstLevelComponent]
})
export class HeaderFirstLevelDemoModule {}
