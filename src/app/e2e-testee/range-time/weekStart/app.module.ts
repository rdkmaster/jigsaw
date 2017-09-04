import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawTileSelectModule} from "jigsaw/component/tile-select/tile-select";
import {RangeTimeWeekStartComponent} from "./app.component";
import {CommonModule} from "@angular/common";
@NgModule({
    declarations: [RangeTimeWeekStartComponent],
    bootstrap: [RangeTimeWeekStartComponent],
    imports: [JigsawRangeTimeModule, JigsawTileSelectModule,CommonModule]
})
export class RangeTimeWeekStartModule{

}
