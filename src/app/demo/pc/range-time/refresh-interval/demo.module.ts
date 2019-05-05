import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeRefreshIntervalComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeRefreshIntervalComponent],
    exports: [RangeTimeRefreshIntervalComponent],
    imports: [JigsawRangeTimeModule, JigsawDemoDescriptionModule]
})
export class RangeTimeRefreshIntervalModule {

}
