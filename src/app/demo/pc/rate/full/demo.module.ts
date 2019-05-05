import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRateModule} from "jigsaw/pc-components/rate/index";
import {RateFullComponent} from "./demo.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [RateFullComponent],
    exports: [RateFullComponent],
    imports: [JigsawRateModule, JigsawDemoDescriptionModule,CommonModule]
})
export class RateFullModule {

}
