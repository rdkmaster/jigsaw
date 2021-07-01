import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRateModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RateFullComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RateFullComponent],
    exports: [RateFullComponent],
    imports: [JigsawMobileRateModule, JigsawDemoDescriptionModule, CommonModule, JigsawHeaderModule]
})
export class RateFullModule {

}
