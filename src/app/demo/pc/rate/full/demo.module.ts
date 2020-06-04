import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRateModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RateFullComponent} from "./demo.component";

@NgModule({
    declarations: [RateFullComponent],
    exports: [RateFullComponent],
    imports: [JigsawRateModule, JigsawDemoDescriptionModule,CommonModule]
})
export class RateFullModule {

}
