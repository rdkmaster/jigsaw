import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRateModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/for-internal/description/demo-description";
import {RateFullComponent} from "./demo.component";

import {JigsawMobileHeaderModule} from "jigsaw/mobile_public_api";

@NgModule({
    declarations: [RateFullComponent],
    exports: [RateFullComponent],
    imports: [JigsawMobileRateModule, JigsawDemoDescriptionModule, CommonModule, JigsawMobileHeaderModule]
})
export class RateFullModule {

}
