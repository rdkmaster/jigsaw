import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {RangeTimeWeekStartComponent} from "./app.component";
@NgModule({
    declarations: [RangeTimeWeekStartComponent],
    imports: [JigsawRangeTimeModule, JigsawTileSelectModule]
})
export class RangeTimeWeekStartModule{

}
