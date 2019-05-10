import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawMobileRateModule} from "jigsaw/mobile-components/rate/index";
import {RateFullComponent} from "./demo.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [RateFullComponent],
    exports: [RateFullComponent],
    imports: [JigsawMobileRateModule, JigsawDemoDescriptionModule, CommonModule]
})
export class RateFullModule {

}
