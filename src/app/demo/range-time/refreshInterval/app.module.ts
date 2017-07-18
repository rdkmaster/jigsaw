import {NgModule} from "@angular/core";
import {RangeTimeRefreshIntervalComponent} from "./app.component";
import {JigsawRangeTimeModule} from "../../../../jigsaw/component/range-time/index";
@NgModule({
    declarations: [RangeTimeRefreshIntervalComponent],
    imports: [JigsawRangeTimeModule]
})
export class RangeTimeRefreshIntervalModule{

}
