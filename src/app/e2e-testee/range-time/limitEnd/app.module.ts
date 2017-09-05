import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawTileSelectModule} from "jigsaw/component/tile/tile";
import {RangeTimeLimitEndComponent} from "./app.component";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [RangeTimeLimitEndComponent],
    bootstrap: [RangeTimeLimitEndComponent],
    imports: [JigsawRangeTimeModule,JigsawTileSelectModule, CommonModule]
})
export class RangeTimeLimitEndModule{

}
