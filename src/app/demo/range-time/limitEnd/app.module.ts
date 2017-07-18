import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {RangeTimeLimitEndComponent} from "./app.component";
@NgModule({
    declarations: [RangeTimeLimitEndComponent],
    imports: [JigsawRangeTimeModule,JigsawTileSelectModule]
})
export class RangeTimeLimitEndModule{

}
