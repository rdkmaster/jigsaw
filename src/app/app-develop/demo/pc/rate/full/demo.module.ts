import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRateModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/app-develop/demo-description/demo-description";
import {RateFullComponent} from "./demo.component";

import {JigsawHeaderModule} from "jigsaw/public_api";

@NgModule({
    declarations: [RateFullComponent],
    exports: [RateFullComponent],
    imports: [JigsawRateModule, JigsawDemoDescriptionModule,CommonModule, JigsawHeaderModule]
})
export class RateFullModule {

}
