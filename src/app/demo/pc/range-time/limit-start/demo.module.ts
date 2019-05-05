import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {JigsawTileSelectModule} from "jigsaw/pc-components/list-and-tile/tile";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeLimitStartComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeLimitStartComponent],
    exports: [RangeTimeLimitStartComponent],
    imports: [JigsawRangeTimeModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RangeTimeLimitStartModule {

}
