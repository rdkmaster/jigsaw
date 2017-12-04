import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeGrItemsComponent} from "./app.component";

@NgModule({
    declarations: [RangeTimeGrItemsComponent],
    exports: [RangeTimeGrItemsComponent],
    imports: [JigsawRangeTimeModule, JigsawDemoDescriptionModule]
})
export class RangeTimeGrItemsModule {

}
