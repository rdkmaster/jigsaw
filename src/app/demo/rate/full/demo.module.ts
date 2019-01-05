import {NgModule} from "@angular/core";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {JigsawRateModule} from "jigsaw/component/rate";
import {RateFullComponent} from "./demo.component";

@NgModule({
    declarations: [RateFullComponent],
    exports: [RateFullComponent],
    imports: [JigsawRateModule, JigsawDemoDescriptionModule]
})
export class RateFullModule {

}
