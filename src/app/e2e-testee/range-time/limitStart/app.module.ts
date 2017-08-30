import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {RangeTimeLimitStartComponent} from "./app.component";
@NgModule({
    declarations: [RangeTimeLimitStartComponent],
    bootstrap: [RangeTimeLimitStartComponent],
    imports: [JigsawRangeTimeModule,JigsawTileSelectModule]
})
export class RangeTimeLimitStartModule{

}
