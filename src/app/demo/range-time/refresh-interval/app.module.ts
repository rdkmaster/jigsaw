import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeRefreshIntervalComponent} from "./app.component";

@NgModule({
    declarations: [RangeTimeRefreshIntervalComponent],
    bootstrap: [RangeTimeRefreshIntervalComponent],
    imports: [JigsawRangeTimeModule, JigsawDemoDescriptionModule]
})
export class RangeTimeRefreshIntervalModule {

}
