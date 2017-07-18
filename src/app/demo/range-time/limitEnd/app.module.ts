import {NgModule} from "@angular/core";
import {RangeTimeLimitEndComponent} from "./app.component";
import {JigsawRangeTimeModule} from "../../../../jigsaw/component/range-time/index";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/tile-select/tile-select";
@NgModule({
    declarations: [RangeTimeLimitEndComponent],
    imports: [JigsawRangeTimeModule,JigsawTileSelectModule]
})
export class RangeTimeLimitEndModule{

}
