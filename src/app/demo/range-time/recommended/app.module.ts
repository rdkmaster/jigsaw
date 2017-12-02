import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeRecommendedComponent} from "./app.component";

@NgModule({
    declarations: [RangeTimeRecommendedComponent],
    exports: [RangeTimeRecommendedComponent],
    imports: [JigsawRangeTimeModule, JigsawDemoDescriptionModule]
})
export class RangeTimeRecommendedModule {

}
