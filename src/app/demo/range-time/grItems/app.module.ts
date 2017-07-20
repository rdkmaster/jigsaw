import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {RangeTimeGrItemsComponent} from "./app.component";
@NgModule({
    declarations: [RangeTimeGrItemsComponent],
    bootstrap: [RangeTimeGrItemsComponent],
    imports: [JigsawRangeTimeModule]
})
export class RangeTimeGrItemsModule{

}
