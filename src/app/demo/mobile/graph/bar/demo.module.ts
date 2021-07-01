import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {BarGraphComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [BarGraphComponent],
    exports: [BarGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class BarGraphModule {

}
