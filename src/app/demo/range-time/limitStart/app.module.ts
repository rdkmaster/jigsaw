import {NgModule} from "@angular/core";
import {RangeTimeLimitStartComponent} from "./app.component";
import {JigsawRangeTimeModule} from "../../../../jigsaw/component/range-time/index";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/tile-select/tile-select";
@NgModule({
    declarations: [RangeTimeLimitStartComponent],
    imports: [JigsawRangeTimeModule,JigsawTileSelectModule]
})
export class RangeTimeLimitStartModule{

}
