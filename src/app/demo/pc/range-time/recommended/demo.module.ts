import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeRecommendedComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeRecommendedComponent],
    exports: [RangeTimeRecommendedComponent],
    imports: [JigsawRangeTimeModule, JigsawDemoDescriptionModule]
})
export class RangeTimeRecommendedModule {

}
