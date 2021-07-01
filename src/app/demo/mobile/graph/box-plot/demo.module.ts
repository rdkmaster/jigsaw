import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileGraphModule} from "jigsaw/mobile_public_api";
import {BoxPlotGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [BoxPlotGraphComponent],
    exports: [BoxPlotGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule, CommonModule, JigsawHeaderModule]
})
export class BoxPlotGraphModule {

}
