import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeGrItemsComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeGrItemsComponent],
    exports: [RangeTimeGrItemsComponent],
    imports: [JigsawRangeTimeModule, JigsawDemoDescriptionModule]
})
export class RangeTimeGrItemsModule {

}
