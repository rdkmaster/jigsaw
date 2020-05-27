import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {JigsawRangeTimeModule} from "jigsaw/pc-components/range-time/index";
import {JigsawDemoDescriptionModule} from "app/demo-description/demo-description";
import {RangeDateTimeGrItemsComponent} from "./demo.component";
import {JigsawRangeDateTimePickerModule} from "jigsaw/pc-components/date-and-time/range-date-time-picker";

@NgModule({
    declarations: [RangeDateTimeGrItemsComponent],
    exports: [RangeDateTimeGrItemsComponent],
    imports: [JigsawRangeTimeModule, JigsawDemoDescriptionModule, JigsawRangeDateTimePickerModule, CommonModule]
})
export class RangeDateTimeGrItemsModule {

}
