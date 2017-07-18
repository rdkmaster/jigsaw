import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {RangeTimeRefreshIntervalComponent} from "./app.component";
@NgModule({
    declarations: [RangeTimeRefreshIntervalComponent],
    imports: [JigsawRangeTimeModule]
})
export class RangeTimeRefreshIntervalModule{

}
