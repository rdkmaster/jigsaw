import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule, JigsawTileSelectModule} from "jigsaw/public_api";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeTimeLimitStartComponent} from "./demo.component";

@NgModule({
    declarations: [RangeTimeLimitStartComponent],
    exports: [RangeTimeLimitStartComponent],
    imports: [JigsawRangeTimeModule, JigsawTileSelectModule, CommonModule, JigsawDemoDescriptionModule]
})
export class RangeTimeLimitStartModule {

}
