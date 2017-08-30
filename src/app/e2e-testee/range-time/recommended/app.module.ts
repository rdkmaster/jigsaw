
import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {RangeTimeRecommendedComponent} from "./app.component";
@NgModule({
    declarations: [RangeTimeRecommendedComponent],
    bootstrap: [RangeTimeRecommendedComponent],
    imports: [JigsawRangeTimeModule]
})
export class RangeTimeRecommendedModule{

}
