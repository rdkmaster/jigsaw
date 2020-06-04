import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeGrItemsComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeGrItemsComponent],
    exports: [RangeTimeGrItemsComponent],
    imports: [JigsawRangeTimeModule, JigsawDemoDescriptionModule]
})
export class RangeTimeGrItemsModule {

}
