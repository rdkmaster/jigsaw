import { NgModule } from "@angular/core";
import { JigsawHeaderModule } from "jigsaw/public_api";
import {DemoTemplateModule} from "../../../demo-template/demo-template";
import {HeaderSecondLevelComponent} from "./demo.component";

@NgModule({
    imports: [JigsawHeaderModule, DemoTemplateModule],
    declarations: [
        HeaderSecondLevelComponent,
    ],
    exports: [HeaderSecondLevelComponent]
})
export class HeaderSecondLevelDemoModule {}
