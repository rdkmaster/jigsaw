import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeRecommendedComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeRecommendedComponent],
    exports: [RangeTimeRecommendedComponent],
    imports: [JigsawRangeTimeModule, JigsawDemoDescriptionModule]
})
export class RangeTimeRecommendedModule {

}
