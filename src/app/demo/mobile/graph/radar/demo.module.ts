import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileGraphModule} from "jigsaw/mobile_public_api";
import {RadarGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RadarGraphComponent],
    exports: [RadarGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule, CommonModule, JigsawHeaderModule]
})
export class RadarGraphModule {

}
