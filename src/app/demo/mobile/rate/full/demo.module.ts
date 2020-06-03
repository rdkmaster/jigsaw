import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawMobileRateModule} from "jigsaw/mobile_public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RateFullComponent} from "./demo.component";

@NgModule({
    declarations: [RateFullComponent],
    exports: [RateFullComponent],
    imports: [JigsawMobileRateModule, JigsawDemoDescriptionModule, CommonModule]
})
export class RateFullModule {

}
