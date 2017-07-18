import {NgModule} from "@angular/core";
import {RangeTimeWeekStartComponent} from "./app.component";
import {JigsawRangeTimeModule} from "../../../../jigsaw/component/range-time/index";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/tile-select/tile-select";
@NgModule({
    declarations: [RangeTimeWeekStartComponent],
    imports: [JigsawRangeTimeModule, JigsawTileSelectModule]
})
export class RangeTimeWeekStartModule{

}
