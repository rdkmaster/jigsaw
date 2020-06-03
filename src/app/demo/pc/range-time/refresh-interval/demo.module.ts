import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeRefreshIntervalComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeRefreshIntervalComponent],
    exports: [RangeTimeRefreshIntervalComponent],
    imports: [JigsawRangeTimeModule, JigsawDemoDescriptionModule]
})
export class RangeTimeRefreshIntervalModule {

}
