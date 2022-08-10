import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRateModule, JigsawCheckBoxModule, JigsawHeaderModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {RateDisabledComponent} from "./demo.component";

@NgModule({
    declarations: [RateDisabledComponent],
    exports: [RateDisabledComponent],
    imports: [JigsawRateModule, JigsawDemoDescriptionModule, CommonModule,
        JigsawCheckBoxModule, JigsawHeaderModule]
})
export class RateDisabledModule {

}
