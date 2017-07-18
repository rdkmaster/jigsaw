import {NgModule} from "@angular/core";
import {RangeTimeGrComponent} from "./app.component";
import {JigsawRangeTimeModule} from "../../../../jigsaw/component/range-time/index";
import {CommonModule} from "@angular/common";
import {JigsawTileSelectModule} from "../../../../jigsaw/component/tile-select/tile-select";
@NgModule({
    declarations: [RangeTimeGrComponent],
    imports: [JigsawRangeTimeModule,JigsawTileSelectModule,CommonModule]
})
export class RangeTimeGrModule{

}
