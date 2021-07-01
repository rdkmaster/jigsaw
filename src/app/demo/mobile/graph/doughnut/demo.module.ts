import {NgModule} from "@angular/core";
import {JigsawMobileGraphModule} from "jigsaw/mobile_public_api";
import {DoughnutGraphComponent} from "./demo.component";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [DoughnutGraphComponent],
    exports: [DoughnutGraphComponent],
    imports: [JigsawMobileGraphModule, JigsawDemoDescriptionModule, JigsawHeaderModule]
})
export class DoughnutGraphModule {

}
