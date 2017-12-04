import {NgModule} from "@angular/core";
import {JigsawRangeTimeModule} from "jigsaw/component/range-time/index";
import {JigsawTileSelectModule} from "jigsaw/component/list-and-tile/tile";
import {RangeTimeWeekStartComponent} from "./app.component";
import {CommonModule} from "@angular/common";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";

@NgModule({
    declarations: [RangeTimeWeekStartComponent],
    exports: [RangeTimeWeekStartComponent],
    imports: [JigsawRangeTimeModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RangeTimeWeekStartModule {

}
