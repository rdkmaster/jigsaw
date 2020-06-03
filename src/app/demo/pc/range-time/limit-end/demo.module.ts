import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule, JigsawTileSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeLimitEndComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeLimitEndComponent],
    exports: [RangeTimeLimitEndComponent],
    imports: [JigsawRangeTimeModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RangeTimeLimitEndModule {

}
